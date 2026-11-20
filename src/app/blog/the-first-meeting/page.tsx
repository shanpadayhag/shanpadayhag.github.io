import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The Meeting That Taught Me to Think Like an Engineer — Shan Padayhag",
  description:
    "How an early meeting with a startup CEO shaped Shan Padayhag's engineering judgment and ownership.",
};

export default function FirstMeetingPage() {
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
            href="/blog"
          >
            Notes <span aria-hidden="true">←</span>
          </Link>
        </nav>
      </header>
      <main>
        <article className="mt-20 sm:mt-28" aria-labelledby="article-title">
          <header>
            <p className="text-primary text-sm font-medium">
              Early career · 13 November 2024
            </p>
            <h1
              id="article-title"
              className="mt-3 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
            >
              The meeting that taught me to think like an engineer.
            </h1>
            <p className="text-muted-foreground mt-6 text-xl leading-relaxed">
              An early conversation with a startup CEO gave me something more
              useful than a list of technologies: a chance to learn how good
              engineering work is actually done.
            </p>
            <p className="text-muted-foreground mt-6 text-sm">
              By Shan Padayhag · 2 min read
            </p>
          </header>
          <div className="border-border mt-12 space-y-6 border-t pt-12 text-lg leading-[1.75] [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em]">
            <p className="text-foreground text-xl">
              I met Joshua Paylaga while I was a second-year college student. He
              was a senior software engineer building Whitelide Solutions; I was
              looking for a way to contribute to real work and get better fast.
              That conversation led to the most useful kind of learning
              environment: one where the work, the feedback, and the
              consequences were real.
            </p>
            <h2>What changed</h2>
            <p>
              At Whitelide, I was exposed to the full development cycle:
              brainstorming, development, feedback, and deployment. That taught
              me to look beyond the task in front of me. Good engineering means
              understanding what a team is trying to achieve, choosing a
              practical path, and taking responsibility for the result.
            </p>
            <p>
              Joshua’s mentorship was direct and constructive. I could bring a
              problem, work through the tradeoffs, and return to the code with a
              clearer decision. That cadence built the habit I still rely on: do
              the work to understand the problem, ask precise questions, and use
              feedback to improve the next iteration.
            </p>
            <figure className="border-brand my-10 border-y py-8">
              <p className="font-accent text-[clamp(1.5rem,3.5vw,2rem)] leading-snug italic">
                “The valuable lesson was not a specific tool. It was learning to
                make better decisions in the work.”
              </p>
            </figure>
            <h2>The lasting result</h2>
            <p>
              That early experience gave me a foundation I carried into later
              roles: technical ownership, comfort with feedback, and a bias
              toward measurable improvement. It is why I care about engineering
              that makes a practical difference—not just software that runs, but
              systems that help a team move with more confidence.
            </p>
          </div>
          <footer className="border-border mt-14 border-t pt-8">
            <Link
              className="text-primary font-medium underline-offset-4 hover:underline"
              href="/blog"
            >
              ← Back to all notes
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
