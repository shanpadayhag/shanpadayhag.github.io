"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/core/class-names";
import { usePrefersReducedMotion } from "@/core/hooks/use-prefers-reduced-motion";
import {
  advanceMarqueeOffset,
  calculateScrollVelocityFactor,
  marqueeCopyCount,
  scrollVelocitySmoothingRate,
  smoothTowards,
  wrapMarqueeOffset,
} from "@/features/portfolio/entities/scroll-motion";

type VelocityMarqueeProps = {
  text: string;
  baseVelocity: number;
  className?: string;
};

export default function VelocityMarquee({
  text,
  baseVelocity,
  className,
}: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (isReducedMotion || !track) return;
    let offsetPercent = 0;
    let movementDirection = 1;
    let smoothedScrollVelocity = 0;
    let previousTimestamp: number | null = null;
    let previousScrollY = window.scrollY;
    let animationFrameId = 0;
    let isVisible = true;

    function stepMarquee(timestamp: number) {
      const deltaSeconds =
        previousTimestamp === null
          ? 0
          : Math.min((timestamp - previousTimestamp) / 1000, 0.1);
      previousTimestamp = timestamp;
      const scrollY = window.scrollY;
      const scrollVelocity =
        deltaSeconds > 0 ? (scrollY - previousScrollY) / deltaSeconds : 0;
      previousScrollY = scrollY;
      smoothedScrollVelocity = smoothTowards(
        smoothedScrollVelocity,
        scrollVelocity,
        deltaSeconds,
        scrollVelocitySmoothingRate,
      );
      const nextStep = advanceMarqueeOffset(
        offsetPercent,
        movementDirection,
        baseVelocity,
        deltaSeconds,
        calculateScrollVelocityFactor(smoothedScrollVelocity),
      );
      offsetPercent = nextStep.offsetPercent;
      movementDirection = nextStep.movementDirection;
      if (track) {
        track.style.transform = `translateX(${wrapMarqueeOffset(offsetPercent)}%)`;
      }
      if (isVisible)
        animationFrameId = window.requestAnimationFrame(stepMarquee);
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && !wasVisible) {
        previousTimestamp = null;
        previousScrollY = window.scrollY;
        animationFrameId = window.requestAnimationFrame(stepMarquee);
      }
    });
    visibilityObserver.observe(track);
    animationFrameId = window.requestAnimationFrame(stepMarquee);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
    };
  }, [baseVelocity, isReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden whitespace-nowrap select-none"
    >
      <div
        ref={trackRef}
        className={cn("inline-block will-change-transform", className)}
      >
        {Array.from({ length: marqueeCopyCount }, (_, copyIndex) => (
          <span key={copyIndex} className="pr-[0.5em]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
