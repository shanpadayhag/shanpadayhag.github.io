import { expect, test } from "vitest";
import { resolveTheme } from "@/core/theme/resolve-theme";

test("a saved theme wins over the system preference", () => {
  expect(resolveTheme("light", true)).toBe("light");
  expect(resolveTheme("dark", false)).toBe("dark");
});

test("without a saved theme the system preference decides", () => {
  expect(resolveTheme(null, true)).toBe("dark");
  expect(resolveTheme(null, false)).toBe("light");
});

test("an unknown saved value is ignored", () => {
  expect(resolveTheme("sepia", true)).toBe("dark");
});
