import { describe, expect, it } from "vitest";
import { isBuiltPagePresent, readBuiltPage } from "@/core/testing/built-page";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import { getProjectScreenshotSourceSet } from "@/features/portfolio/entities/project-screenshot";

function collectContentStrings(contentValue: unknown): string[] {
  if (typeof contentValue === "string") return [contentValue];
  if (Array.isArray(contentValue))
    return contentValue.flatMap(collectContentStrings);
  if (contentValue && typeof contentValue === "object")
    return Object.values(contentValue).flatMap(collectContentStrings);
  return [];
}

describe.runIf(isBuiltPagePresent("") || process.env.CI === "true")(
  "the built home page",
  () => {
    const builtHomePage = readBuiltPage("");

    it.each(collectContentStrings(portfolioContent))(
      "contains %j word for word",
      (contentString) => {
        expect(builtHomePage.containsText(contentString)).toBe(true);
      },
    );

    it.each(
      portfolioContent.projects.flatMap((project) =>
        project.screenshot ? [project.screenshot] : [],
      ),
    )("loads the $slug screenshot lazily with both sizes", (screenshot) => {
      expect(
        builtHomePage.containsText(
          `srcSet="${getProjectScreenshotSourceSet(screenshot.slug)}"`,
        ),
      ).toBe(true);
      expect(builtHomePage.containsText('loading="lazy"')).toBe(true);
    });

    it("keeps the drawing for projects without a screenshot", () => {
      for (const project of portfolioContent.projects) {
        if (!project.screenshot && project.illustrationLabel)
          expect(
            builtHomePage.containsText(
              `role="img" aria-label="${project.illustrationLabel}"`,
            ),
          ).toBe(true);
      }
    });
  },
);
