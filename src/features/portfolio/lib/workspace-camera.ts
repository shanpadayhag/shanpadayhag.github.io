export type WorkspaceCameraPoint = readonly [number, number, number];
export type WorkspaceQuaternion = readonly [number, number, number, number];
export type WorkspaceScreen = "computer" | "television" | "notebook";

export type WorkspaceCameraState = {
  position: WorkspaceCameraPoint;
  target: WorkspaceCameraPoint;
  orientation: WorkspaceQuaternion;
  distance: number;
  near: number;
  viewOffset: readonly [number, number];
  stage: "overview" | "projects" | "experience" | "about" | "contact";
};

type WorkspaceScreenGeometry = {
  center: WorkspaceCameraPoint;
  width: number;
  height: number;
  normal: "y" | "z";
};

export const workspaceScreens: Record<
  WorkspaceScreen,
  WorkspaceScreenGeometry
> = {
  computer: {
    center: [-1.52, 2.02, -2.001],
    width: 1.75,
    height: 0.98,
    normal: "z",
  },
  television: {
    center: [2.94, 2.44, -2.702],
    width: 1.41,
    height: 0.76,
    normal: "z",
  },
  notebook: {
    center: [2.18, 0.675, 0.3],
    width: 0.72,
    height: 0.62,
    normal: "y",
  },
};

const cameraKeyframes = [
  { progress: 0, pose: "overview" },
  { progress: 0.06, pose: "overview" },
  { progress: 0.125, pose: "computer" },
  { progress: 0.375, pose: "computer" },
  { progress: 0.41, pose: "computer-exit" },
  { progress: 0.465, pose: "television" },
  { progress: 0.705, pose: "television" },
  { progress: 0.74, pose: "television-exit" },
  { progress: 0.805, pose: "notebook" },
  { progress: 0.955, pose: "notebook" },
  { progress: 1, pose: "overview" },
] as const;

const screenIntervals = [
  { screen: "computer", start: 0.14, end: 0.36 },
  { screen: "television", start: 0.48, end: 0.69 },
  { screen: "notebook", start: 0.82, end: 0.94 },
] as const;

export function clampWorkspaceProgress(progress: number) {
  return Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
}

function smoothProgress(progress: number) {
  const clamped = clampWorkspaceProgress(progress);
  return clamped * clamped * (3 - 2 * clamped);
}

function interpolatePoint(
  start: WorkspaceCameraPoint,
  end: WorkspaceCameraPoint,
  blend: number,
): WorkspaceCameraPoint {
  return [
    start[0] + (end[0] - start[0]) * blend,
    start[1] + (end[1] - start[1]) * blend,
    start[2] + (end[2] - start[2]) * blend,
  ];
}

function normalizePoint(point: WorkspaceCameraPoint): WorkspaceCameraPoint {
  const length = Math.hypot(...point);
  return [point[0] / length, point[1] / length, point[2] / length];
}

function crossPoints(
  left: WorkspaceCameraPoint,
  right: WorkspaceCameraPoint,
): WorkspaceCameraPoint {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function calculateOrientation(
  direction: WorkspaceCameraPoint,
  up: WorkspaceCameraPoint,
): WorkspaceQuaternion {
  const backward = normalizePoint(direction);
  const right = normalizePoint(crossPoints(up, backward));
  const vertical = crossPoints(backward, right);
  const trace = right[0] + vertical[1] + backward[2];
  if (trace > 0) {
    const scale = 0.5 / Math.sqrt(trace + 1);
    return [
      (vertical[2] - backward[1]) * scale,
      (backward[0] - right[2]) * scale,
      (right[1] - vertical[0]) * scale,
      0.25 / scale,
    ];
  }
  if (right[0] > vertical[1] && right[0] > backward[2]) {
    const scale = 2 * Math.sqrt(1 + right[0] - vertical[1] - backward[2]);
    return [
      0.25 * scale,
      (vertical[0] + right[1]) / scale,
      (backward[0] + right[2]) / scale,
      (vertical[2] - backward[1]) / scale,
    ];
  }
  if (vertical[1] > backward[2]) {
    const scale = 2 * Math.sqrt(1 + vertical[1] - right[0] - backward[2]);
    return [
      (vertical[0] + right[1]) / scale,
      0.25 * scale,
      (backward[1] + vertical[2]) / scale,
      (backward[0] - right[2]) / scale,
    ];
  }
  const scale = 2 * Math.sqrt(1 + backward[2] - right[0] - vertical[1]);
  return [
    (backward[0] + right[2]) / scale,
    (backward[1] + vertical[2]) / scale,
    0.25 * scale,
    (right[1] - vertical[0]) / scale,
  ];
}

function interpolateOrientation(
  start: WorkspaceQuaternion,
  end: WorkspaceQuaternion,
  blend: number,
): WorkspaceQuaternion {
  let dot =
    start[0] * end[0] +
    start[1] * end[1] +
    start[2] * end[2] +
    start[3] * end[3];
  const sign = dot < 0 ? -1 : 1;
  dot = Math.min(1, Math.abs(dot));
  const angle = Math.acos(dot);
  const denominator = Math.sin(angle);
  const startWeight =
    denominator > 0.001
      ? Math.sin((1 - blend) * angle) / denominator
      : 1 - blend;
  const endWeight =
    (denominator > 0.001 ? Math.sin(blend * angle) / denominator : blend) *
    sign;
  const orientation: WorkspaceQuaternion = [
    start[0] * startWeight + end[0] * endWeight,
    start[1] * startWeight + end[1] * endWeight,
    start[2] * startWeight + end[2] * endWeight,
    start[3] * startWeight + end[3] * endWeight,
  ];
  const length = Math.hypot(...orientation);
  return [
    orientation[0] / length,
    orientation[1] / length,
    orientation[2] / length,
    orientation[3] / length,
  ];
}

function resolvePose(
  pose: (typeof cameraKeyframes)[number]["pose"],
  aspect: number,
) {
  if (pose === "overview") {
    const direction: WorkspaceCameraPoint = [0.62, 0.53, 0.7];
    return {
      target: [0, 1.4, 0] as WorkspaceCameraPoint,
      direction: normalizePoint(direction),
      orientation: calculateOrientation(direction, [0, 1, 0]),
      distance: 19.4 * Math.max(0.94, 1.06 / aspect),
      near: 0.1,
    };
  }
  if (pose === "computer-exit" || pose === "television-exit") {
    const screen =
      workspaceScreens[pose === "computer-exit" ? "computer" : "television"];
    const direction = normalizePoint([
      0,
      pose === "computer-exit" ? 0.12 : 0.3,
      1,
    ]);
    return {
      target: screen.center,
      direction,
      orientation: calculateOrientation(direction, [0, 1, 0]),
      distance: pose === "computer-exit" ? 3.8 : 3.2,
      near: 0.1,
    };
  }
  const screen = workspaceScreens[pose];
  const direction: WorkspaceCameraPoint =
    screen.normal === "y" ? [0, 1, 0] : [0, 0, 1];
  const up: WorkspaceCameraPoint =
    screen.normal === "y" ? [0, 0, -1] : [0, 1, 0];
  const viewportCoverage = aspect < 0.85 ? 0.78 : 0.76;
  const distance =
    screen.height / (2 * Math.tan(Math.PI / 10) * viewportCoverage);
  return {
    target: screen.center,
    direction,
    orientation: calculateOrientation(direction, up),
    distance,
    near: distance * 0.45,
  };
}

export function resolveWorkspaceScreen(
  progress: number,
  reducedMotion = false,
) {
  const normalizedProgress = reducedMotion
    ? 0
    : clampWorkspaceProgress(progress);
  const interval = screenIntervals.find(
    ({ start, end }) =>
      normalizedProgress > start - 0.015 && normalizedProgress < end + 0.015,
  );
  if (!interval)
    return {
      screen: null,
      contentProgress: 0,
      opacity: 0,
      progress: normalizedProgress,
    };
  const arrival = smoothProgress(
    (normalizedProgress - interval.start + 0.015) / 0.015,
  );
  const departure = smoothProgress(
    (interval.end + 0.015 - normalizedProgress) / 0.015,
  );
  return {
    screen: interval.screen,
    contentProgress: clampWorkspaceProgress(
      (normalizedProgress - interval.start) / (interval.end - interval.start),
    ),
    opacity: Math.min(arrival, departure),
    progress: normalizedProgress,
  };
}

export function resolveWorkspaceCamera(
  progress: number,
  aspect: number,
  reducedMotion = false,
): WorkspaceCameraState {
  const normalizedProgress = reducedMotion
    ? 0
    : clampWorkspaceProgress(progress);
  const safeAspect = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  const nextIndex = cameraKeyframes.findIndex(
    (keyframe) => keyframe.progress > normalizedProgress,
  );
  const lastKeyframe = cameraKeyframes[cameraKeyframes.length - 1]!;
  const start =
    nextIndex < 0 ? lastKeyframe : cameraKeyframes[Math.max(0, nextIndex - 1)]!;
  const end = nextIndex < 0 ? lastKeyframe : cameraKeyframes[nextIndex]!;
  const interval = end.progress - start.progress;
  const blend = smoothProgress(
    interval ? (normalizedProgress - start.progress) / interval : 0,
  );
  const startPose = resolvePose(start.pose, safeAspect);
  const endPose = resolvePose(end.pose, safeAspect);
  const target = interpolatePoint(startPose.target, endPose.target, blend);
  const direction = normalizePoint(
    interpolatePoint(startPose.direction, endPose.direction, blend),
  );
  const distance =
    startPose.distance + (endPose.distance - startPose.distance) * blend;
  const introOffset = Math.max(
    1 - smoothProgress((normalizedProgress - 0.06) / 0.065),
    smoothProgress((normalizedProgress - 0.955) / 0.045),
  );
  return {
    target,
    distance,
    near: startPose.near + (endPose.near - startPose.near) * blend,
    orientation: interpolateOrientation(
      startPose.orientation,
      endPose.orientation,
      blend,
    ),
    viewOffset:
      safeAspect > 1.1 ? [-0.19 * introOffset, 0] : [0, 0.19 * introOffset],
    position: [
      target[0] + direction[0] * distance,
      target[1] + direction[1] * distance,
      target[2] + direction[2] * distance,
    ],
    stage:
      normalizedProgress < 0.08
        ? "overview"
        : normalizedProgress < 0.4
          ? "projects"
          : normalizedProgress < 0.74
            ? "experience"
            : normalizedProgress < 0.97
              ? "about"
              : "contact",
  };
}
