"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/core/hooks/use-prefers-reduced-motion";
import {
  calculateRevealProgress,
  calculateWordOpacity,
  revealMinimumOpacity,
} from "@/features/portfolio/entities/scroll-motion";

type WordRevealTextProps = {
  text: string;
  className?: string;
};

function subscribeToNothing() {
  return () => {};
}

export default function WordRevealText({
  text,
  className,
}: WordRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const isReducedMotion = usePrefersReducedMotion();
  const isHydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const words = text.split(" ");
  const wordCount = words.length;
  const isRevealActive = isHydrated && !isReducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!isRevealActive || !container) return;
    let animationFrameId = 0;

    function updateWordOpacity() {
      animationFrameId = 0;
      if (!container) return;
      const containerBounds = container.getBoundingClientRect();
      const revealProgress = calculateRevealProgress(
        containerBounds.top,
        containerBounds.height,
        window.innerHeight,
      );
      wordElementsRef.current.forEach((wordElement, wordIndex) => {
        if (!wordElement) return;
        wordElement.style.opacity = String(
          calculateWordOpacity(revealProgress, wordIndex, wordCount),
        );
      });
    }

    function scheduleUpdate() {
      if (animationFrameId === 0)
        animationFrameId = window.requestAnimationFrame(updateWordOpacity);
    }

    updateWordOpacity();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isRevealActive, wordCount]);

  return (
    <p ref={containerRef} className={className}>
      {isRevealActive ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, wordIndex) => (
              <span
                key={`${wordIndex}-${word}`}
                ref={(wordElement) => {
                  wordElementsRef.current[wordIndex] = wordElement;
                }}
                className="inline-block pr-[0.25em]"
                style={{ opacity: revealMinimumOpacity }}
              >
                {word}
              </span>
            ))}
          </span>
        </>
      ) : (
        text
      )}
    </p>
  );
}
