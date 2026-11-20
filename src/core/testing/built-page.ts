import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

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

export function resolveBuiltPagePath(routePath: string) {
  return path.resolve(process.cwd(), "out", routePath, "index.html");
}

export function isBuiltPagePresent(routePath: string) {
  return existsSync(resolveBuiltPagePath(routePath));
}

export function readBuiltPage(routePath: string) {
  const builtPagePath = resolveBuiltPagePath(routePath);
  const builtMarkup = existsSync(builtPagePath)
    ? readFileSync(builtPagePath, "utf8")
    : "";
  const decodedMarkup = normalizeWhitespace(decodeEntities(builtMarkup));
  const visibleText = normalizeWhitespace(
    decodeEntities(
      builtMarkup
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<[^>]+>/g, " "),
    ),
  );
  return {
    containsText: (expectedText: string) => {
      const normalizedExpectedText = normalizeWhitespace(expectedText);
      return (
        visibleText.includes(normalizedExpectedText) ||
        decodedMarkup.includes(normalizedExpectedText)
      );
    },
  };
}
