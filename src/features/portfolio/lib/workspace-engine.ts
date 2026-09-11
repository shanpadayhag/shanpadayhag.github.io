import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import {
  clampWorkspaceProgress,
  resolveWorkspaceCamera,
  resolveWorkspaceScreen,
  workspaceScreens,
  type WorkspaceScreen,
} from "./workspace-camera";
import { createWorkspaceModel } from "./workspace-model";
import type { PortfolioTheme } from "./theme";

export type WorkspaceFrame = {
  screen: WorkspaceScreen | null;
  rect: { left: number; top: number; width: number; height: number } | null;
  contentProgress: number;
  opacity: number;
  progress: number;
};

export type WorkspaceController = {
  setProgress: (progress: number) => void;
  setTheme: (theme: PortfolioTheme) => void;
  setReadingMode: (reading: boolean) => void;
  dispose: () => void;
};

function projectScreenRectangle(
  screenName: WorkspaceScreen,
  camera: PerspectiveCamera,
  viewportWidth: number,
  viewportHeight: number,
) {
  const screen = workspaceScreens[screenName];
  const projectedPoint = new Vector3();
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const horizontal of [-0.5, 0.5]) {
    for (const vertical of [-0.5, 0.5]) {
      projectedPoint
        .set(
          screen.center[0] + horizontal * screen.width,
          screen.center[1] +
            (screen.normal === "z" ? vertical * screen.height : 0),
          screen.center[2] +
            (screen.normal === "y" ? vertical * screen.height : 0),
        )
        .project(camera);
      const horizontalPixel = ((projectedPoint.x + 1) * viewportWidth) / 2;
      const verticalPixel = ((1 - projectedPoint.y) * viewportHeight) / 2;
      left = Math.min(left, horizontalPixel);
      right = Math.max(right, horizontalPixel);
      top = Math.min(top, verticalPixel);
      bottom = Math.max(bottom, verticalPixel);
    }
  }
  return { left, top, width: right - left, height: bottom - top };
}

function createWorkspaceLighting(scene: Scene) {
  const hemisphere = new HemisphereLight("#d5e3eb", "#806343", 2.1);
  const daylight = new DirectionalLight("#ffe3bb", 4.2);
  daylight.position.set(-3, 8, 6);
  daylight.castShadow = true;
  daylight.shadow.mapSize.set(1024, 1024);
  daylight.shadow.camera.left = -7;
  daylight.shadow.camera.right = 7;
  daylight.shadow.camera.top = 7;
  daylight.shadow.camera.bottom = -7;
  daylight.shadow.camera.near = 0.5;
  daylight.shadow.camera.far = 24;
  daylight.shadow.normalBias = 0.025;
  daylight.shadow.bias = -0.00015;
  daylight.shadow.radius = 4;
  const moonlight = new DirectionalLight("#9ebfd6", 1.5);
  moonlight.position.set(4, 5, -4);
  scene.add(hemisphere, daylight, moonlight);
  const groundGeometry = new PlaneGeometry(100, 100);
  const groundMaterial = new ShadowMaterial({ opacity: 0.13 });
  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.335;
  ground.receiveShadow = true;
  scene.add(ground);
  return {
    setTheme(isDark: boolean) {
      hemisphere.intensity = isDark ? 0.75 : 2.1;
      hemisphere.color.set(isDark ? "#9cb6d4" : "#d5e3eb");
      daylight.intensity = isDark ? 0.8 : 4.2;
      daylight.color.set(isDark ? "#afc6e6" : "#ffe3bb");
      moonlight.intensity = isDark ? 0.6 : 1.5;
      groundMaterial.opacity = isDark ? 0.25 : 0.13;
    },
    dispose() {
      hemisphere.dispose();
      daylight.dispose();
      moonlight.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
    },
  };
}

export function createWorkspace(
  canvas: HTMLCanvasElement,
  onFailure: () => void,
  onFrame?: (frame: WorkspaceFrame) => void,
): WorkspaceController {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  const cleanupCallbacks: Array<() => void> = [() => renderer.dispose()];
  let isDisposed = false;
  let animationFrame = 0;
  function stopAnimation() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }
  function dispose() {
    if (isDisposed) return;
    isDisposed = true;
    stopAnimation();
    for (const cleanup of cleanupCallbacks.reverse()) cleanup();
    canvas.dataset.renderState = "disposed";
  }
  try {
    renderer.setClearColor(new Color("#eeefeb"), 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 100);
    const model = createWorkspaceModel();
    cleanupCallbacks.push(model.dispose);
    scene.add(model.group);
    const lighting = createWorkspaceLighting(scene);
    cleanupCallbacks.push(lighting.dispose);
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isReducedMotion = motionPreference.matches;
    let isVisible = true;
    let currentProgress = 0;
    let readingMode = false;
    let targetProgress = 0;
    let previousTime = 0;
    let viewportWidth = 1;
    let viewportHeight = 1;
    function canRender() {
      return !isDisposed && isVisible && !document.hidden;
    }
    function updateCamera() {
      const state = resolveWorkspaceCamera(
        currentProgress,
        camera.aspect,
        isReducedMotion,
      );
      camera.position.set(...state.position);
      camera.quaternion.set(...state.orientation);
      camera.near = state.near;
      if (!readingMode && (state.viewOffset[0] || state.viewOffset[1])) {
        camera.setViewOffset(
          viewportWidth,
          viewportHeight,
          state.viewOffset[0] * viewportWidth,
          state.viewOffset[1] * viewportHeight,
          viewportWidth,
          viewportHeight,
        );
      } else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      canvas.dataset.cameraStage = state.stage;
      canvas.dataset.cameraDistance = state.distance.toFixed(3);
      canvas.dataset.cameraProgress = (
        isReducedMotion ? 0 : currentProgress
      ).toFixed(4);
    }
    function publishFrame() {
      const frame = resolveWorkspaceScreen(currentProgress, isReducedMotion);
      canvas.dataset.cameraScreen = frame.screen ?? "none";
      canvas.dataset.contentProgress = frame.contentProgress.toFixed(4);
      onFrame?.({
        ...frame,
        rect: frame.screen
          ? projectScreenRectangle(
              frame.screen,
              camera,
              viewportWidth,
              viewportHeight,
            )
          : null,
      });
    }
    function fail() {
      dispose();
      canvas.dataset.renderState = "failed";
      onFailure();
    }
    function renderFrame(time: number) {
      animationFrame = 0;
      if (!canRender()) return;
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 1 / 30;
      previousTime = time;
      currentProgress = isReducedMotion
        ? 0
        : currentProgress +
          (targetProgress - currentProgress) * (1 - Math.exp(-10 * delta));
      if (Math.abs(targetProgress - currentProgress) < 0.0001)
        currentProgress = targetProgress;
      updateCamera();
      try {
        renderer.render(scene, camera);
        publishFrame();
      } catch {
        fail();
        return;
      }
      if (!isReducedMotion && currentProgress !== targetProgress) {
        canvas.dataset.renderState = "moving";
        animationFrame = requestAnimationFrame(renderFrame);
      } else canvas.dataset.renderState = "idle";
    }
    function requestRender() {
      if (!isVisible) {
        const bounds = canvas.getBoundingClientRect();
        isVisible =
          bounds.width > 0 &&
          bounds.height > 0 &&
          bounds.bottom > 0 &&
          bounds.top < innerHeight &&
          bounds.right > 0 &&
          bounds.left < innerWidth;
      }
      if (animationFrame || !canRender()) return;
      previousTime = 0;
      animationFrame = requestAnimationFrame(renderFrame);
    }
    function handleVisibility() {
      if (!canRender()) stopAnimation();
      else requestRender();
    }
    function handleMotionPreference() {
      isReducedMotion = motionPreference.matches;
      if (isReducedMotion) currentProgress = 0;
      stopAnimation();
      requestRender();
    }
    function handleContextLoss(event: Event) {
      event.preventDefault();
      fail();
    }
    function resize() {
      if (isDisposed) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      viewportWidth = width;
      viewportHeight = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.shadowMap.needsUpdate = true;
      requestRender();
    }
    const resizeObserver = new ResizeObserver(resize);
    cleanupCallbacks.push(() => resizeObserver.disconnect());
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        handleVisibility();
      },
      { threshold: 0 },
    );
    cleanupCallbacks.push(() => visibilityObserver.disconnect());
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    cleanupCallbacks.push(() =>
      document.removeEventListener("visibilitychange", handleVisibility),
    );
    motionPreference.addEventListener("change", handleMotionPreference);
    cleanupCallbacks.push(() =>
      motionPreference.removeEventListener("change", handleMotionPreference),
    );
    canvas.addEventListener("webglcontextlost", handleContextLoss);
    cleanupCallbacks.push(() =>
      canvas.removeEventListener("webglcontextlost", handleContextLoss),
    );
    canvas.dataset.theme = "light";
    model.setTheme(false);
    lighting.setTheme(false);
    resize();
    stopAnimation();
    updateCamera();
    renderer.render(scene, camera);
    publishFrame();
    canvas.dataset.renderState = "idle";
    return {
      setReadingMode(reading: boolean) {
        readingMode = reading;
        requestRender();
      },
      setProgress(progress: number) {
        if (isDisposed) return;
        if (
          canvas.clientWidth !== viewportWidth ||
          canvas.clientHeight !== viewportHeight
        )
          resize();
        const normalizedProgress = clampWorkspaceProgress(progress);
        if (normalizedProgress === targetProgress) return;
        targetProgress = normalizedProgress;
        requestRender();
      },
      setTheme(theme: PortfolioTheme) {
        if (isDisposed) return;
        const isDark = theme === "dark";
        model.setTheme(isDark);
        lighting.setTheme(isDark);
        renderer.setClearColor(new Color(isDark ? "#181c1b" : "#eeefeb"), 0);
        renderer.shadowMap.needsUpdate = true;
        canvas.dataset.theme = theme;
        canvas.dataset.timeOfDay = isDark ? "night" : "day";
        requestRender();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
