"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type FocusEvent,
} from "react";
import type {
  WorkspaceController,
  WorkspaceFrame,
} from "../lib/workspace-engine";
import { updateNotebook } from "../lib/notebook";
import { useTheme } from "../lib/use-theme";
import { WorkspaceFallback } from "./workspace-fallback";
import { ThemeSwitch } from "./theme-switch";

const chapters = [
  {
    screen: "computer",
    id: "projects",
    label: "Personal projects",
    start: 0.14,
    end: 0.36,
  },
  {
    screen: "television",
    id: "work",
    label: "Professional experience",
    start: 0.48,
    end: 0.69,
  },
  {
    screen: "notebook",
    id: "about",
    label: "Notes & approach",
    start: 0.82,
    end: 0.94,
  },
] as const;

type WorkspaceProps = {
  intro: ReactNode;
  projects: ReactNode;
  experience: ReactNode;
  notes: ReactNode;
  closing: ReactNode;
};

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function readMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function serverMotion() {
  return false;
}

export function Workspace({
  intro,
  projects,
  experience,
  notes,
  closing,
}: WorkspaceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<WorkspaceController | null>(null);
  const surfacesRef = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef(0);
  const activeRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    readMotion,
    serverMotion,
  );
  const isEnhanced = isReady && !hasFailed && !isReading && !reducedMotion;

  useEffect(() => {
    let cancelled = false;
    const started = new Set<string>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    function handleFrame(frame: WorkspaceFrame) {
      if (!activeRef.current) return;
      if (introRef.current) {
        const opacity = Math.max(0, 1 - frame.progress / 0.05);
        introRef.current.style.opacity = String(opacity);
        introRef.current.inert = opacity < 0.5;
        introRef.current.style.visibility = opacity > 0 ? "visible" : "hidden";
      }
      if (outroRef.current) {
        const opacity = Math.max(0, (frame.progress - 0.97) / 0.03);
        outroRef.current.style.opacity = String(opacity);
        outroRef.current.inert = opacity < 0.5;
        outroRef.current.style.visibility = opacity > 0 ? "visible" : "hidden";
      }
      for (let index = 0; index < chapters.length; index++) {
        const element = surfacesRef.current[index];
        const chapter = chapters[index];
        if (!element || !chapter) continue;
        const isVisible =
          frame.screen === chapter.screen &&
          frame.rect &&
          frame.opacity > 0.001;
        element.style.visibility = isVisible ? "visible" : "hidden";
        element.style.opacity = isVisible ? String(frame.opacity) : "0";
        element.inert = !isVisible || frame.opacity < 0.9;
        if (!isVisible || !frame.rect || !canvasRef.current) continue;
        const isMobileScreen = innerWidth <= 700 && frame.screen !== "notebook";
        const margin = innerWidth <= 700 ? 16 : 12;
        const left = isMobileScreen ? 0 : Math.max(margin, frame.rect.left + 8);
        const top = Math.max(16, frame.rect.top + 8);
        const right = isMobileScreen
          ? canvasRef.current.clientWidth
          : Math.min(
              canvasRef.current.clientWidth - margin,
              frame.rect.left + frame.rect.width - 8,
            );
        const bottom = Math.min(
          canvasRef.current.clientHeight - (innerWidth < 360 ? 120 : 78),
          frame.rect.top + frame.rect.height - 8,
        );
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        element.style.width = `${Math.max(0, right - left)}px`;
        element.style.height = `${Math.max(0, bottom - top)}px`;
        const viewport =
          element.querySelector<HTMLElement>(".surface-viewport");
        const content = element.querySelector<HTMLElement>(".surface-content");
        if (viewport && content) {
          viewport.scrollTop = 0;
          if (chapter.screen === "notebook") {
            content.style.transform = "none";
            updateNotebook(element, frame.contentProgress);
          } else {
            content.style.transform = `translateY(${-Math.max(0, content.scrollHeight - viewport.clientHeight) * frame.contentProgress}px)`;
            if (frame.opacity >= 0.9 && !started.has(chapter.screen)) {
              started.add(chapter.screen);
              element.dataset.booting = "true";
              viewport.inert = true;
              const timer = setTimeout(() => {
                element.dataset.booting = "false";
                viewport.inert = false;
                timers.delete(timer);
              }, 850);
              timers.add(timer);
            }
          }
        }
      }
    }
    import("../lib/workspace-engine")
      .then(({ createWorkspace }) => {
        if (cancelled || !canvasRef.current) return;
        engineRef.current = createWorkspace(
          canvasRef.current,
          () => setHasFailed(true),
          handleFrame,
        );
        engineRef.current.setTheme(themeRef.current);
        engineRef.current.setReadingMode(!activeRef.current);
        setIsReady(true);
      })
      .catch(() => {
        if (!cancelled) setHasFailed(true);
      });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    engineRef.current?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    activeRef.current = isEnhanced;
    engineRef.current?.setReadingMode(!isEnhanced);
    if (!isEnhanced) {
      for (const element of [
        introRef.current,
        outroRef.current,
        ...surfacesRef.current,
      ]) {
        if (!element) continue;
        element.removeAttribute("style");
        element.inert = false;
        element.querySelector(".surface-content")?.removeAttribute("style");
        const viewport =
          element.querySelector<HTMLElement>(".surface-viewport");
        if (viewport) viewport.inert = false;
        for (const page of element.querySelectorAll<HTMLElement>(
          ".notebook-page",
        )) {
          page.removeAttribute("style");
          page.inert = false;
        }
        element.querySelector(".notebook-leaf")?.removeAttribute("style");
      }
      engineRef.current?.setProgress(0);
      return;
    }
    let frame = 0;
    function update() {
      frame = 0;
      const root = rootRef.current;
      if (!root) return;
      const distance = root.offsetHeight - innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -root.getBoundingClientRect().top / Math.max(1, distance)),
      );
      progressRef.current = progress;
      engineRef.current?.setProgress(progress);
    }
    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target?.classList.contains("journey-anchor"))
        target.scrollIntoView({ behavior: "instant" });
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isEnhanced]);

  function handleReadingMode() {
    history.replaceState(null, "", location.pathname + location.search);
    setIsReading(!isReading);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function handleNotebookTurn(direction: string) {
    const root = rootRef.current;
    const surface = surfacesRef.current[2];
    if (!isEnhanced || !root || !surface) return;
    const single = surface.clientWidth < 560;
    const page = Number(
      surface.querySelector<HTMLElement>(".notebook-book")?.dataset.page ?? 0,
    );
    const next = Math.max(
      0,
      Math.min(
        single ? 3 : 2,
        page + (direction === "next" ? 1 : -1) * (single ? 1 : 2),
      ),
    );
    const target = single ? (next + 0.15) / 4 : next === 0 ? 0.1 : 0.9;
    window.scrollTo({
      top:
        root.getBoundingClientRect().top +
        scrollY +
        (0.82 + target * 0.12) * (root.offsetHeight - innerHeight),
      behavior: "instant",
    });
  }
  function handleSurfaceFocus(event: FocusEvent<HTMLElement>, index: number) {
    if (!isEnhanced || index === 2) return;
    const chapter = chapters[index];
    const surface = surfacesRef.current[index];
    const viewport = surface?.querySelector<HTMLElement>(".surface-viewport");
    const content = surface?.querySelector<HTMLElement>(".surface-content");
    const root = rootRef.current;
    if (!chapter || !viewport || !content || !root) return;
    viewport.scrollTop = 0;
    const target = event.target.getBoundingClientRect();
    const bounds = viewport.getBoundingClientRect();
    if (target.top >= bounds.top && target.bottom <= bounds.bottom) return;
    const targetOffset =
      target.top -
      content.getBoundingClientRect().top -
      viewport.clientHeight / 2;
    const fraction = Math.max(
      0,
      Math.min(
        1,
        targetOffset /
          Math.max(1, content.scrollHeight - viewport.clientHeight),
      ),
    );
    const progress = chapter.start + fraction * (chapter.end - chapter.start);
    window.scrollTo({
      top:
        root.getBoundingClientRect().top +
        scrollY +
        progress * (root.offsetHeight - innerHeight),
      behavior: "instant",
    });
  }
  const contents = [projects, experience, notes];

  return (
    <div
      ref={rootRef}
      className={`workspace-journey${isEnhanced ? " journey-enhanced" : " journey-reading"}${isReady && !hasFailed ? " workspace-ready" : ""}`}
    >
      {isEnhanced && (
        <>
          {chapters.map((chapter) => (
            <div
              className="journey-anchor"
              key={chapter.id}
              id={chapter.id}
              style={{
                top: `calc(var(--journey-distance) * ${chapter.start})`,
              }}
            />
          ))}
          <div className="journey-anchor journey-contact-anchor" id="contact" />
        </>
      )}
      <div className="journey-stage">
        <div className="workspace-stage" aria-hidden="true">
          <WorkspaceFallback />
          <canvas ref={canvasRef} />
        </div>
        <div ref={introRef} className="journey-intro">
          {intro}
        </div>
        {chapters.map((chapter, index) => (
          <section
            key={chapter.screen}
            id={isEnhanced ? undefined : chapter.id}
            ref={(element) => {
              surfacesRef.current[index] = element;
            }}
            className={`journey-surface surface-${chapter.screen}`}
            aria-label={chapter.label}
            onFocus={(event) => handleSurfaceFocus(event, index)}
            onClick={(event) => {
              const button = (event.target as HTMLElement).closest<HTMLElement>(
                "[data-page-turn]",
              );
              if (button?.dataset.pageTurn)
                handleNotebookTurn(button.dataset.pageTurn);
            }}
          >
            <div className="surface-toolbar">
              <span>
                {chapter.screen === "computer"
                  ? "shan / personal-projects"
                  : chapter.screen === "television"
                    ? "SP — Experience channel"
                    : "Personal notes"}
              </span>
              <span>
                {chapter.screen === "notebook"
                  ? "Shan’s notebook"
                  : "Shan Padayhag"}
              </span>
            </div>
            {chapter.screen !== "notebook" && (
              <div
                className={`screen-startup startup-${chapter.screen}`}
                aria-hidden="true"
              >
                <div className="startup-symbol">
                  {chapter.screen === "computer" ? ">_" : "SP"}
                </div>
                <p>
                  {chapter.screen === "computer"
                    ? "Opening workspace"
                    : "Tuning in"}
                </p>
                <div className="startup-track">
                  <span />
                </div>
                <span>
                  {chapter.screen === "computer"
                    ? "projects.ts"
                    : "THE EXPERIENCE REEL"}
                </span>
              </div>
            )}
            <div className="surface-viewport">
              <div className="surface-content">{contents[index]}</div>
            </div>
          </section>
        ))}
        <div
          ref={outroRef}
          id={isEnhanced ? undefined : "contact"}
          className="journey-outro"
        >
          {closing}
        </div>
        <nav className="journey-controls" aria-label="Room chapters">
          <div className="journey-chapters">
            <a href="#projects">Computer</a>
            <a href="#work">TV</a>
            <a href="#about">Notes</a>
          </div>
          <div className="journey-options">
            <ThemeSwitch />
            <button
              type="button"
              onClick={handleReadingMode}
              disabled={!isReady || hasFailed || reducedMotion}
            >
              {isEnhanced ? "Read as a page" : "Explore the room"}
            </button>
          </div>
        </nav>
        {hasFailed && (
          <p className="workspace-status" role="status">
            The 3D room is unavailable. You can read the complete portfolio
            below.
          </p>
        )}
      </div>
    </div>
  );
}
