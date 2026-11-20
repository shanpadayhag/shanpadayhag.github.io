import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import VelocityMarquee from "@/features/portfolio/components/velocity-marquee";

describe("VelocityMarquee", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("stays still under reduced motion", () => {
    const requestAnimationFrame = vi.fn();
    vi.stubGlobal("requestAnimationFrame", requestAnimationFrame);
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    const { container } = render(
      <VelocityMarquee text="Backend · Frontend · Systems" baseVelocity={-1} />,
    );
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });
});
