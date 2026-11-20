import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CopyEmailButton from "@/features/portfolio/components/copy-email-button";

describe("CopyEmailButton", () => {
  afterEach(() => vi.restoreAllMocks());

  it("copies the address and announces it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(<CopyEmailButton email="name@example.com" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    });
    expect(writeText).toHaveBeenCalledWith("name@example.com");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Email address copied",
    );
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("announces a failure with the way to recover", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    render(<CopyEmailButton email="name@example.com" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Select the email address to copy it.",
    );
  });
});
