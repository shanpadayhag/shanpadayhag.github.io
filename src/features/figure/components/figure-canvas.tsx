"use client";

import { useEffect, useRef } from "react";
import type { FigureTheme } from "@/features/figure/entities/figure-palette";
import {
  calculateFigurePose,
  calculateHeadTurnTarget,
  easeHeadTurn,
  maximumHeadTurnRadians,
  restingFigurePose,
  type HeadTurn,
} from "@/features/figure/entities/figure-motion";
import { createFigureScene } from "@/features/figure/scene/create-figure-scene";

type FigureCanvasProps = {
  className?: string;
  onReady?: () => void;
};

function canCreateWebGlContext() {
  try {
    const probeCanvas = document.createElement("canvas");
    return Boolean(
      probeCanvas.getContext("webgl2") ?? probeCanvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

function readDocumentTheme(): FigureTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function FigureCanvas({
  className,
  onReady,
}: FigureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canCreateWebGlContext()) return;
    let figureScene: ReturnType<typeof createFigureScene>;
    try {
      figureScene = createFigureScene(canvas, readDocumentTheme());
    } catch {
      return;
    }
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isReducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let animationFrameId = 0;
    let startTimestamp: number | null = null;
    let previousTimestamp: number | null = null;
    let headTurn: HeadTurn = { yaw: 0, pitch: 0 };
    let headTurnTarget: HeadTurn = { yaw: 0, pitch: 0 };

    function renderStill() {
      figureScene.applyPose(restingFigurePose);
      figureScene.render();
    }

    function renderFrame(timestamp: number) {
      startTimestamp ??= timestamp;
      const elapsedSeconds = (timestamp - startTimestamp) / 1000;
      const deltaSeconds =
        previousTimestamp === null ? 0 : (timestamp - previousTimestamp) / 1000;
      previousTimestamp = timestamp;
      headTurn = easeHeadTurn(headTurn, headTurnTarget, deltaSeconds);
      figureScene.applyPose(
        calculateFigurePose(elapsedSeconds, headTurn, false),
      );
      figureScene.applySeaGlassDrift(
        elapsedSeconds,
        headTurn.yaw / maximumHeadTurnRadians,
        headTurn.pitch / maximumHeadTurnRadians,
      );
      figureScene.render();
      animationFrameId = window.requestAnimationFrame(renderFrame);
    }

    function startLoop() {
      window.cancelAnimationFrame(animationFrameId);
      if (isReducedMotion || !isVisible) {
        renderStill();
        return;
      }
      previousTimestamp = null;
      animationFrameId = window.requestAnimationFrame(renderFrame);
    }

    function resizeToCanvas() {
      const canvasBounds = canvas?.getBoundingClientRect();
      if (!canvasBounds || canvasBounds.width === 0) return;
      figureScene.resize(canvasBounds.width, canvasBounds.height);
      figureScene.render();
    }

    function handlePointerMove(pointerEvent: PointerEvent) {
      const canvasBounds = canvas?.getBoundingClientRect();
      if (!canvasBounds) return;
      const centerX = canvasBounds.left + canvasBounds.width / 2;
      const centerY = canvasBounds.top + canvasBounds.height / 3;
      headTurnTarget = calculateHeadTurnTarget(
        (pointerEvent.clientX - centerX) / (window.innerWidth / 2),
        (pointerEvent.clientY - centerY) / (window.innerHeight / 2),
      );
    }

    function handleReducedMotionChange() {
      isReducedMotion = reducedMotionQuery.matches;
      startLoop();
    }

    const resizeObserver = new ResizeObserver(resizeToCanvas);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      startLoop();
    });
    visibilityObserver.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      figureScene.setTheme(readDocumentTheme());
      if (isReducedMotion || !isVisible) renderStill();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    resizeToCanvas();
    startLoop();
    onReadyRef.current?.();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      window.removeEventListener("pointermove", handlePointerMove);
      figureScene.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
