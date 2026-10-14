import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../app/api/keepalive/route";

// The database boundary. vi.hoisted lets the mock factory reference this
// object even though vi.mock is hoisted above the imports.
const supabase = vi.hoisted(() => ({
  getServiceClient: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getServiceClient: supabase.getServiceClient,
}));

const URL_UNDER_TEST = "http://localhost/api/keepalive";

// vi.stubEnv / vi.unstubAllEnvs cannot unset a variable that was undefined
// before the test (they delete from the import.meta.env proxy, not process.env),
// so the route's env var is saved and restored by hand.
const originalCronSecret = process.env.CRON_SECRET;

let limit: ReturnType<typeof vi.fn>;
let select: ReturnType<typeof vi.fn>;
let from: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.CRON_SECRET;

  limit = vi.fn().mockResolvedValue({ error: null });
  select = vi.fn().mockReturnValue({ limit });
  from = vi.fn().mockReturnValue({ select });
  supabase.getServiceClient.mockReturnValue({ from });
});

afterEach(() => {
  if (originalCronSecret === undefined) {
    delete process.env.CRON_SECRET;
  } else {
    process.env.CRON_SECRET = originalCronSecret;
  }
});

describe("GET /api/keepalive", () => {
  describe("when CRON_SECRET is unset", () => {
    it("refuses a bare 'Bearer ' header with 401", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer " } }),
      );

      expect(response.status).toBe(401);
    });

    it("refuses a 'Bearer undefined' header with 401", async () => {
      // Without the unset guard, `Bearer ${undefined}` equals this header.
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer undefined" } }),
      );

      expect(response.status).toBe(401);
    });

    it("refuses a bare 'Bearer ' header when CRON_SECRET is empty", async () => {
      // Not a guard test: fetch trims the header to "Bearer", which never equals
      // "Bearer " built from an empty secret, so this holds without the guard.
      process.env.CRON_SECRET = "";

      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer " } }),
      );

      expect(response.status).toBe(401);
    });
  });

  describe("when CRON_SECRET is set", () => {
    beforeEach(() => {
      process.env.CRON_SECRET = "s3cret-value";
    });

    it("refuses a request with no authorization header with 401", async () => {
      const response = await GET(new Request(URL_UNDER_TEST));

      expect(response.status).toBe(401);
    });

    it("refuses a wrong secret with 401", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer not-the-secret" } }),
      );

      expect(response.status).toBe(401);
    });

    it("refuses the secret sent without the Bearer scheme with 401", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "s3cret-value" } }),
      );

      expect(response.status).toBe(401);
    });

    it("refuses a token that only starts with the secret with 401", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value-extra" } }),
      );

      expect(response.status).toBe(401);
    });

    it("returns the Unauthorized JSON body on refusal", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer wrong" } }),
      );

      expect(await response.json()).toEqual({ error: "Unauthorized" });
    });
  });

  describe("refused requests never reach the database", () => {
    it("does not build a client when CRON_SECRET is unset", async () => {
      await GET(new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer undefined" } }));

      expect(supabase.getServiceClient).not.toHaveBeenCalled();
      expect(from).not.toHaveBeenCalled();
    });

    it("does not build a client when the secret is wrong", async () => {
      process.env.CRON_SECRET = "s3cret-value";

      await GET(new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer wrong" } }));

      expect(supabase.getServiceClient).not.toHaveBeenCalled();
      expect(from).not.toHaveBeenCalled();
    });

    it("does not build a client when the header is missing", async () => {
      process.env.CRON_SECRET = "s3cret-value";

      await GET(new Request(URL_UNDER_TEST));

      expect(supabase.getServiceClient).not.toHaveBeenCalled();
      expect(from).not.toHaveBeenCalled();
    });
  });

  describe("when the request is authorised", () => {
    beforeEach(() => {
      process.env.CRON_SECRET = "s3cret-value";
    });

    it("returns 200 with ok:true when the query succeeds", async () => {
      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } }),
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ ok: true });
    });

    it("queries the comparisons table", async () => {
      await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } }),
      );

      expect(from).toHaveBeenCalledWith("comparisons");
    });

    it("runs a plain (non-HEAD) id select limited to one row", async () => {
      await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } }),
      );

      // Exact args: a `{ head: true }` option would fail this.
      expect(select).toHaveBeenCalledWith("id");
      expect(limit).toHaveBeenCalledWith(1);
    });

    it("returns 503 when the Supabase query returns an error", async () => {
      limit.mockResolvedValue({ error: { message: "connection refused" } });

      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } }),
      );

      expect(response.status).toBe(503);
    });

    it("returns ok:false with the Supabase error message when the query fails", async () => {
      limit.mockResolvedValue({ error: { message: "connection refused" } });

      const response = await GET(
        new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } }),
      );

      expect(await response.json()).toEqual({ ok: false, error: "connection refused" });
    });

    it("lets an exception from the service client propagate rather than reporting ok", async () => {
      // The route has no try/catch, so a construction failure rejects GET.
      supabase.getServiceClient.mockImplementation(() => {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
      });

      await expect(
        GET(new Request(URL_UNDER_TEST, { headers: { authorization: "Bearer s3cret-value" } })),
      ).rejects.toThrow("NEXT_PUBLIC_SUPABASE_URL is not set");
    });
  });
});
