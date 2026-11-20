import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Notes — Shan Padayhag",
  description:
    "A note about the meeting that changed how Shan Padayhag learned software engineering.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-24 sm:px-6">
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
            href="/"
          >
            Home <span aria-hidden="true">←</span>
          </Link>
        </nav>
      </header>
      <main>
        <section className="mt-20 sm:mt-28" aria-labelledby="notes-title">
          <p className="text-primary text-sm font-medium">Notes</p>
          <h1
            id="notes-title"
            className="mt-3 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance"
          >
            One story worth keeping.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[52ch] text-lg leading-relaxed">
            A small archive of moments that changed how I build, learn, and work
            with other people.
          </p>
        </section>
        <section className="mt-14" aria-label="Published notes">
          <Link
            className="bg-card border-border hover:border-brand/50 group block rounded-[2rem] border p-7 shadow-[0_18px_50px_-32px_rgb(14_21_18/0.4)] transition-colors sm:p-9"
            href="/blog/the-first-meeting"
          >
            <div className="text-muted-foreground flex gap-4 text-sm tabular-nums">
              <span>13 November 2024</span>
              <span>2 min read</span>
            </div>
            <div className="mt-6">
              <p className="text-primary text-sm font-medium">Mentorship</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
                The meeting that taught me to think like an engineer.
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Meeting a startup CEO as a student led to hands-on work, direct
                feedback, and an early lesson in the kind of judgment useful
                teams need.
              </p>
            </div>
            <span className="text-primary mt-6 inline-flex items-center gap-1.5 font-medium group-hover:underline">
              Read the note <span aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
