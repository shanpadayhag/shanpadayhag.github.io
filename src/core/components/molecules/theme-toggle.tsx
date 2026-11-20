"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/core/components/atoms/button";
import { useTheme } from "@/core/theme/use-theme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="cursor-pointer rounded-full"
      aria-label="Dark theme"
      aria-pressed={isDarkTheme}
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
    >
      {isDarkTheme ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </Button>
  );
}
