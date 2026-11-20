"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/core/class-names";

const FigureCanvas = dynamic(
  () => import("@/features/figure/components/figure-canvas"),
  { ssr: false },
);

type FigureStageProps = {
  caption: string;
};

export default function FigureStage({ caption }: FigureStageProps) {
  const [isCanvasRequested, setIsCanvasRequested] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    const requestCanvas = () => setIsCanvasRequested(true);
    if ("requestIdleCallback" in window) {
      const idleHandle = window.requestIdleCallback(requestCanvas, {
        timeout: 1500,
      });
      return () => window.cancelIdleCallback(idleHandle);
    }
    const timeoutHandle = setTimeout(requestCanvas, 300);
    return () => clearTimeout(timeoutHandle);
  }, []);

  return (
    <figure className="relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[25rem]">
      <div className="relative aspect-[4/5]">
        <div className="border-border/60 bg-card absolute inset-0 overflow-hidden rounded-[2rem] border shadow-[0_24px_60px_-28px_rgb(14_21_18/0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,var(--brand-glow),transparent_72%)] opacity-55" />
        </div>
        <div className="absolute inset-x-[-12%] top-[-20%] bottom-0 overflow-hidden rounded-b-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figure.webp"
            alt=""
            width={640}
            height={774}
            fetchPriority="high"
            className={cn(
              "absolute inset-0 size-full object-contain transition-opacity duration-700",
              isCanvasReady && "opacity-0",
            )}
          />
          {isCanvasRequested && (
            <FigureCanvas
              className={cn(
                "absolute inset-0 size-full opacity-0 transition-opacity duration-700",
                isCanvasReady && "opacity-100",
              )}
              onReady={() => setIsCanvasReady(true)}
            />
          )}
        </div>
      </div>
      <figcaption className="text-muted-foreground mt-5 text-center text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
