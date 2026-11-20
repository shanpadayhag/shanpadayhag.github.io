"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/core/class-names";

const canvasSettleDelayMilliseconds = 2500;
const canvasIdleTimeoutMilliseconds = 2000;

const FigureCanvas = dynamic(
  () => import("@/features/figure/components/figure-canvas"),
  { ssr: false },
);

type FigureStageProps = {
  caption: string;
  description: string;
};

export default function FigureStage({
  caption,
  description,
}: FigureStageProps) {
  const [isCanvasRequested, setIsCanvasRequested] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    let settleTimeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let idleHandle: number | undefined;
    const requestCanvas = () => setIsCanvasRequested(true);
    const requestCanvasWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(requestCanvas, {
          timeout: canvasIdleTimeoutMilliseconds,
        });
        return;
      }
      requestCanvas();
    };
    const scheduleAfterPageSettles = () => {
      settleTimeoutHandle = setTimeout(
        requestCanvasWhenIdle,
        canvasSettleDelayMilliseconds,
      );
    };
    if (document.readyState === "complete") scheduleAfterPageSettles();
    else
      window.addEventListener("load", scheduleAfterPageSettles, { once: true });
    return () => {
      window.removeEventListener("load", scheduleAfterPageSettles);
      if (settleTimeoutHandle) clearTimeout(settleTimeoutHandle);
      if (idleHandle !== undefined && "cancelIdleCallback" in window)
        window.cancelIdleCallback(idleHandle);
    };
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
            alt={description}
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
