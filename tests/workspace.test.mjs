import assert from "node:assert/strict";
import test from "node:test";
import { PerspectiveCamera, Vector3 } from "three";
import {
  resolveWorkspaceCamera,
  resolveWorkspaceScreen,
  workspaceScreens,
} from "../src/features/portfolio/lib/workspace-camera.ts";
import { resolveTheme } from "../src/features/portfolio/lib/theme.ts";

const chapters = [
  ["computer", 0.14, 0.36],
  ["television", 0.48, 0.69],
  ["notebook", 0.82, 0.94],
];

test("each surface stays locked while its content scrolls from beginning to end", () => {
  for (const [screen, start, end] of chapters) {
    const camera = resolveWorkspaceCamera(start, 1.6);
    for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
      const progress = start + (end - start) * fraction;
      const frame = resolveWorkspaceScreen(progress);
      assert.equal(frame.screen, screen);
      assert.ok(Math.abs(frame.contentProgress - fraction) < 1e-10);
      assert.ok(Math.abs(frame.opacity - 1) < 1e-10);
      const current = resolveWorkspaceCamera(progress, 1.6);
      assert.deepEqual(current.position, camera.position);
      current.orientation.forEach((value, axis) =>
        assert.ok(Math.abs(value - camera.orientation[axis]) < 1e-12),
      );
    }
  }
});

test("content disappears during short local moves between objects", () => {
  for (const progress of [0, 0.06, 0.1, 0.41, 0.44, 0.74, 0.78, 1]) {
    assert.equal(resolveWorkspaceScreen(progress).screen, null);
  }
  for (const aspect of [0.46, 1, 1.6]) {
    const overview = resolveWorkspaceCamera(0, aspect);
    for (const [exit, start] of [
      [0.41, 0.14],
      [0.74, 0.48],
    ]) {
      const pullback = resolveWorkspaceCamera(exit, aspect);
      const screen = resolveWorkspaceCamera(start, aspect);
      assert.ok(pullback.distance > screen.distance);
      assert.ok(pullback.distance < overview.distance / 3);
      assert.deepEqual(pullback.target, screen.target);
    }
  }
});

test("every reading surface projects centrally and remains in front of the near plane", () => {
  for (const aspect of [0.46, 1, 1.6]) {
    for (const [screen, start] of chapters) {
      const pose = resolveWorkspaceCamera(start, aspect);
      const camera = new PerspectiveCamera(36, aspect, pose.near, 100);
      camera.position.set(...pose.position);
      camera.quaternion.set(...pose.orientation);
      camera.updateMatrixWorld();
      const projected = new Vector3(...workspaceScreens[screen].center).project(
        camera,
      );
      assert.ok(Math.abs(projected.x) < 1e-8 && Math.abs(projected.y) < 1e-8);
      assert.ok(projected.z > -1 && projected.z < 1);
    }
  }
});

test("reversing scroll restores the same pose and motion stays continuous", () => {
  const forward = Array.from({ length: 1001 }, (_, index) =>
    resolveWorkspaceCamera(index / 1000, 0.46),
  );
  for (let index = 1000; index >= 0; index--) {
    assert.deepEqual(
      resolveWorkspaceCamera(index / 1000, 0.46),
      forward[index],
    );
    assert.ok(Math.abs(Math.hypot(...forward[index].orientation) - 1) < 1e-8);
    assert.ok(forward[index].position.every(Number.isFinite));
  }
  for (const boundary of [
    0.06, 0.125, 0.375, 0.41, 0.465, 0.705, 0.74, 0.805, 0.955,
  ]) {
    const before = resolveWorkspaceCamera(boundary - 1e-6, 0.46);
    const after = resolveWorkspaceCamera(boundary + 1e-6, 0.46);
    assert.ok(
      Math.hypot(
        ...before.position.map((value, axis) => value - after.position[axis]),
      ) < 1e-4,
    );
  }
});

test("reduced motion keeps the overview without activating screen content", () => {
  const overview = resolveWorkspaceCamera(0, 1.5, true);
  for (const progress of [0, 0.2, 0.5, 0.85, 1]) {
    assert.deepEqual(resolveWorkspaceCamera(progress, 1.5, true), overview);
    assert.equal(resolveWorkspaceScreen(progress, true).screen, null);
  }
});

test("invalid viewport values and overscroll resolve safely", () => {
  for (const aspect of [0, -1, Infinity, NaN]) {
    assert.ok(
      resolveWorkspaceCamera(NaN, aspect).position.every(Number.isFinite),
    );
  }
  assert.deepEqual(resolveWorkspaceCamera(-1, 1), resolveWorkspaceCamera(0, 1));
  assert.deepEqual(resolveWorkspaceCamera(2, 1), resolveWorkspaceCamera(1, 1));
});

test("explicit theme choice wins over system appearance", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("invalid", false), "light");
});

test("notebook holds two spreads and reverses the leaf through its center", async () => {
  const { resolveNotebookProgress } =
    await import("../src/features/portfolio/lib/notebook.ts");
  assert.deepEqual(resolveNotebookProgress(0, false), { page: 0, turn: 0 });
  assert.deepEqual(resolveNotebookProgress(1, false), { page: 2, turn: 1 });
  assert.ok(Math.abs(resolveNotebookProgress(0.5, false).turn - 0.5) < 1e-8);
  assert.deepEqual(resolveNotebookProgress(0.1, false), { page: 0, turn: 0 });
  for (let page = 0; page < 4; page++) {
    assert.deepEqual(resolveNotebookProgress((page + 0.1) / 4, true), {
      page,
      turn: 0,
    });
  }
  assert.deepEqual(resolveNotebookProgress(NaN, true), { page: 0, turn: 0 });
});
