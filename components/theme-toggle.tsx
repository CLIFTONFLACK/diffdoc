"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Light/dark toggle. Which icon shows is driven purely by the `.dark` class via
 * CSS, so there's no React state and no hydration mismatch. The pre-paint script
 * in app/layout.tsx applies the saved/system theme before first paint.
 */
export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // ignore storage failures (private mode etc.)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle dark mode"
      // size="icon" is h-9 w-9 (36px); this is an icon-only control with no
      // text to widen its hit area, so it needs the 44px minimum explicitly.
      className="h-11 w-11"
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  );
}
