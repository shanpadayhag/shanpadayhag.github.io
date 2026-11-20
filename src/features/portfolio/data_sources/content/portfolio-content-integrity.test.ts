import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

const builtPagePath = path.resolve(process.cwd(), "out/index.html");
const isPageBuilt = existsSync(builtPagePath);

function collectContentStrings(contentValue: unknown): string[] {
  if (typeof contentValue === "string") return [contentValue];
  if (Array.isArray(contentValue))
    return contentValue.flatMap(collectContentStrings);
  if (contentValue && typeof contentValue === "object")
    return Object.values(contentValue).flatMap(collectContentStrings);
  return [];
}

function decodeEntities(markup: string) {
  return markup
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

describe.runIf(isPageBuilt || process.env.CI === "true")(
  "the built home page",
  () => {
    const builtMarkup = isPageBuilt ? readFileSync(builtPagePath, "utf8") : "";
    const decodedMarkup = normalizeWhitespace(decodeEntities(builtMarkup));
    const visibleText = normalizeWhitespace(
      decodeEntities(
        builtMarkup
          .replace(/<script[\s\S]*?<\/script>/g, " ")
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/<[^>]+>/g, " "),
      ),
    );

    it.each(collectContentStrings(portfolioContent))(
      "contains %j word for word",
      (contentString) => {
        const expectedText = normalizeWhitespace(contentString);
        const isPresent =
          visibleText.includes(expectedText) ||
          decodedMarkup.includes(expectedText);
        expect(isPresent).toBe(true);
      },
    );
  },
);
