import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import {
  getProjectScreenshotHeight,
  getProjectScreenshotSource,
  projectScreenshotWidths,
} from "@/features/portfolio/entities/project-screenshot";

const sizeBudgetsInBytes = { 640: 45 * 1024, 1280: 110 * 1024 } as const;

function readWebpDimensions(fileBytes: Buffer) {
  const chunkType = fileBytes.toString("ascii", 12, 16);
  if (chunkType === "VP8X")
    return {
      width: 1 + fileBytes.readUIntLE(24, 3),
      height: 1 + fileBytes.readUIntLE(27, 3),
    };
  if (chunkType === "VP8 ")
    return {
      width: fileBytes.readUInt16LE(26) & 0x3fff,
      height: fileBytes.readUInt16LE(28) & 0x3fff,
    };
  if (chunkType === "VP8L") {
    const packedSize = fileBytes.readUInt32LE(21);
    return {
      width: 1 + (packedSize & 0x3fff),
      height: 1 + ((packedSize >> 14) & 0x3fff),
    };
  }
  throw new Error(`Not a WebP image (chunk ${chunkType})`);
}

const screenshotProjects = portfolioContent.projects.flatMap((project) =>
  project.screenshot ? [{ name: project.name, ...project.screenshot }] : [],
);

describe("the project screenshots", () => {
  it("leave the Showcase Authentication Service on its drawing", () => {
    const projectsWithoutScreenshot = portfolioContent.projects
      .filter((project) => !project.screenshot)
      .map((project) => project.name);
    expect(projectsWithoutScreenshot).toContain(
      "Showcase Authentication Service",
    );
  });

  describe.each(screenshotProjects)("$name", (screenshot) => {
    it.each(projectScreenshotWidths)(
      "has a %i px WebP of the right size within budget",
      (width) => {
        const filePath = path.join(
          process.cwd(),
          "public",
          getProjectScreenshotSource(screenshot.slug, width),
        );
        expect(existsSync(filePath)).toBe(true);
        expect(readWebpDimensions(readFileSync(filePath))).toEqual({
          width,
          height: getProjectScreenshotHeight(width),
        });
        expect(statSync(filePath).size).toBeLessThanOrEqual(
          sizeBudgetsInBytes[width],
        );
      },
    );

    it("names its project in the alt text and says the data is sample data", () => {
      expect(screenshot.alt).toContain(screenshot.name);
      expect(screenshot.caption.startsWith("Sample data · ")).toBe(true);
    });
  });
});
