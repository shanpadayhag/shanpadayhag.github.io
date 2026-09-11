"use client";

import { useTheme } from "../lib/use-theme";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="theme-switch"
      type="button"
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <path d="M16 12a6.7 6.7 0 0 1-8-8 6.7 6.7 0 1 0 8 8Z" />
        ) : (
          <>
            <circle cx="10" cy="10" r="3" />
            <path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.6 3.6 5 5m10 10 1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" />
          </>
        )}
      </svg>
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
