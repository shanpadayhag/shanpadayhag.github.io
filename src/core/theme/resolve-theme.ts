export type PortfolioTheme = "light" | "dark";

export function resolveTheme(
  saved: unknown,
  prefersDark: boolean,
): PortfolioTheme {
  return saved === "light" || saved === "dark"
    ? saved
    : prefersDark
      ? "dark"
      : "light";
}
