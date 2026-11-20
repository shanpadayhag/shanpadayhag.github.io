import { describe, expect, it } from "vitest";
import { isBuiltPagePresent, readBuiltPage } from "@/core/testing/built-page";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

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
  },
);
