import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WordRevealText from "@/features/portfolio/components/word-reveal-text";

function mockReducedMotion(isReducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: isReducedMotion,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

describe("WordRevealText", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows the whole statement at once under reduced motion", () => {
    mockReducedMotion(true);
    render(<WordRevealText text="Reliable software, start to finish." />);
    const statement = screen.getByText("Reliable software, start to finish.");
    expect(statement.tagName).toBe("P");
    expect(statement.querySelectorAll("span")).toHaveLength(0);
  });

  it("splits the statement into dimmed words otherwise, keeping a full copy for screen readers", () => {
    mockReducedMotion(false);
    const { container } = render(
      <WordRevealText text="Reliable software, start to finish." />,
    );
    expect(screen.getByText("Reliable software, start to finish.")).toHaveClass(
      "sr-only",
    );
    const revealWords = container.querySelectorAll(
      "[aria-hidden='true'] > span",
    );
    expect(revealWords).toHaveLength(5);
  });
});
