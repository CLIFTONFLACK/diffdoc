"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { GoogleButton } from "@/components/signup-prompt";
import { Button } from "@/components/ui/button";

/**
 * Centered auth card. Front-end only this pass: "Continue with Google" is the
 * intended path (wire Supabase `signInWithOAuth` here once the provider is on).
 * The email form is a styled placeholder so the layout is complete.
 */
export function AuthPanel({ mode }: { mode: "sign-in" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  const [note, setNote] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-paper-deep">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <Logo size="sm" />
            <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
              {isSignUp ? "Create your free account" : "Welcome back"}
            </h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              {isSignUp
                ? "5 comparisons every month, free. No card required."
                : "Sign in to your DiffDoc workspace."}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <GoogleButton
              label={isSignUp ? "Sign up with Google" : "Continue with Google"}
              href="#"
            />

            <div className="my-5 flex items-center gap-3 text-xs text-ink-faint">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setNote("Email sign-in is coming soon — please use Google for now.");
              }}
            >
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  placeholder="••••••••"
                  minLength={8}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>

              {note && (
                <p className="rounded-md border border-note/30 bg-note-wash px-3 py-2 text-xs text-note">
                  {note}
                </p>
              )}

              <Button type="submit" className="w-full">
                {isSignUp ? "Create account" : "Sign in"}
              </Button>
            </form>
          </div>

          <p className="mt-5 text-center text-sm text-ink-soft">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-info hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to DiffDoc?{" "}
                <Link href="/signup" className="font-medium text-info hover:underline">
                  Create a free account
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
