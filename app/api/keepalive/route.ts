import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/keepalive — called daily by the Vercel Cron in vercel.json.
 *
 * Supabase pauses free-tier projects after 7 days without API traffic, and a
 * paused project's host stops resolving, so every DB call on the live site
 * fails until someone restores it by hand. One cheap read a day counts as
 * activity and keeps the project awake however long the app sits unused.
 *
 * Vercel sends `Authorization: Bearer $CRON_SECRET` on cron invocations when
 * that env var is set; anything else is refused so the route can't be used to
 * hammer the database.
 */
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await getServiceClient()
    .from("comparisons")
    // A real one-row GET rather than a HEAD, so there's no doubt it registers
    // as traffic with Supabase's inactivity check.
    .select("id")
    .limit(1);
  if (error) {
    // Non-2xx so the failure shows up in Vercel's cron logs.
    return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
