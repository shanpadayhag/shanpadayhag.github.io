import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

const globalsCss = readFileSync(
  join(process.cwd(), "src/core/styles/globals.css"),
  "utf8",
);

function readThemeTokens(selector: string) {
  const blockStart = globalsCss.indexOf(`${selector} {`);
  const blockEnd = globalsCss.indexOf("}", blockStart);
  const block = globalsCss.slice(blockStart, blockEnd);
  const themeTokens = new Map<string, string>();
  for (const match of block.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6});/g)) {
    const [, tokenName, tokenHex] = match;
    if (tokenName && tokenHex) themeTokens.set(tokenName, tokenHex);
  }
  return themeTokens;
}

function calculateRelativeLuminance(hexColor: string) {
  const channelValues = [1, 3, 5].map((channelStart) => {
    const channel =
      parseInt(hexColor.slice(channelStart, channelStart + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const [red = 0, green = 0, blue = 0] = channelValues;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function calculateContrastRatio(firstHex: string, secondHex: string) {
  const firstLuminance = calculateRelativeLuminance(firstHex);
  const secondLuminance = calculateRelativeLuminance(secondHex);
  const lighterLuminance = Math.max(firstLuminance, secondLuminance);
  const darkerLuminance = Math.min(firstLuminance, secondLuminance);
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
}

const textPairs = [
  ["foreground", "background"],
  ["foreground", "card"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["muted-foreground", "muted"],
  ["primary", "background"],
  ["primary", "card"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
] as const;

const largeTextPairs = [
  ["brand", "background"],
  ["brand", "card"],
] as const;

describe.each([":root", '[data-theme="dark"]'])("the %s theme", (selector) => {
  const themeTokens = readThemeTokens(selector);

  function getTokenHex(tokenName: string) {
    const tokenHex = themeTokens.get(tokenName);
    if (!tokenHex) throw new Error(`${selector} is missing --${tokenName}`);
    return tokenHex;
  }

  test.each(textPairs)(
    "%s on %s meets 4.5:1 for body text",
    (textToken, surfaceToken) => {
      expect(
        calculateContrastRatio(
          getTokenHex(textToken),
          getTokenHex(surfaceToken),
        ),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );

  test.each(largeTextPairs)(
    "%s on %s meets 3:1 for large text and shapes",
    (textToken, surfaceToken) => {
      expect(
        calculateContrastRatio(
          getTokenHex(textToken),
          getTokenHex(surfaceToken),
        ),
      ).toBeGreaterThanOrEqual(3);
    },
  );
});
