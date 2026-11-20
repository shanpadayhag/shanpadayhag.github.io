"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/core/class-names";
import { Button } from "@/core/components/atoms/button";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

export default function CopyEmailButton({
  email,
  className,
}: CopyEmailButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  useEffect(() => {
    if (!isCopied) return;
    const resetTimer = setTimeout(() => {
      setIsCopied(false);
      setStatusAnnouncement("");
    }, 2400);
    return () => clearTimeout(resetTimer);
  }, [isCopied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setStatusAnnouncement("Email address copied");
    } catch {
      setStatusAnnouncement(
        "Couldn’t copy. Select the email address to copy it.",
      );
    }
  }

  return (
    <>
      <Button
        type="button"
        size="lg"
        onClick={copyEmail}
        className={cn("h-12 cursor-pointer rounded-full px-6", className)}
      >
        {isCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {isCopied ? "Copied" : "Copy email"}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {statusAnnouncement}
      </span>
    </>
  );
}
