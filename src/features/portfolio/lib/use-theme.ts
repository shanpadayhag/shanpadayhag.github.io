"use client";

import { useSyncExternalStore } from "react";
import { resolveTheme, type PortfolioTheme } from "./theme";

const preferenceKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";

function readPreference() {
  try {
    return localStorage.getItem(preferenceKey);
  } catch {
    return null;
  }
}
function applyTheme(theme: PortfolioTheme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(themeEvent));
}
function subscribeTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  function syncPreference() {
    applyTheme(resolveTheme(readPreference(), media.matches));
  }
  function handleStorage(event: StorageEvent) {
    if (event.key === preferenceKey || event.key === null) syncPreference();
  }
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", handleStorage);
  media.addEventListener("change", syncPreference);
  syncPreference();
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", handleStorage);
    media.removeEventListener("change", syncPreference);
  };
}
function readTheme() {
  return resolveTheme(
    document.documentElement.dataset.theme,
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
}
function readServerTheme(): PortfolioTheme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    readServerTheme,
  );
  function setTheme(next: PortfolioTheme) {
    try {
      localStorage.setItem(preferenceKey, next);
    } catch {
      applyTheme(next);
      return;
    }
    applyTheme(next);
  }
  return { theme, setTheme };
}
