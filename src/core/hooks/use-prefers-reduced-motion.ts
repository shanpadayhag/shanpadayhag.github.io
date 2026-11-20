import { useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onReducedMotionChange: () => void) {
  const mediaQueryList = window.matchMedia(reducedMotionQuery);
  mediaQueryList.addEventListener("change", onReducedMotionChange);
  return () =>
    mediaQueryList.removeEventListener("change", onReducedMotionChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}
