import Link from "next/link";
import Image from "next/image";

type NotesHeaderProps = {
  backLinkHref: string;
  backLinkLabel: string;
};

export default function NotesHeader({
  backLinkHref,
  backLinkLabel,
}: NotesHeaderProps) {
  return (
    <header>
      <nav
        className="border-border/70 bg-background/85 flex items-center justify-between rounded-full border p-1.5 pl-2 shadow-[0_12px_32px_-16px_rgb(14_21_18/0.35)]"
        aria-label="Primary navigation"
      >
        <Link
          className="flex items-center gap-2 rounded-full pr-3"
          href="/"
          aria-label="Shan Padayhag, home"
        >
          <Image src="/icon.svg" alt="" width={32} height={32} />
          <span className="font-accent text-lg italic">Shan Padayhag</span>
        </Link>
        <Link
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors"
          href={backLinkHref}
        >
          {backLinkLabel} <span aria-hidden="true">←</span>
        </Link>
      </nav>
    </header>
  );
}
