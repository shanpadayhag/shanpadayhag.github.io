import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The Meeting That Taught Me to Think Like an Engineer — Shan Padayhag",
  description: "How an early meeting with a startup CEO shaped Shan Padayhag's engineering judgment and ownership.",
};

export default function FirstMeetingPage() {
  return (
    <main className="article-page">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Shan Padayhag, home"><Image src="/icon.svg" alt="" width={32} height={32} /><span>Shan Padayhag</span></Link>
        <Link className="back-link" href="/blog">Notes <span aria-hidden="true">←</span></Link>
      </nav>
      <article className="article" aria-labelledby="article-title">
        <header className="article-header">
          <p className="eyebrow">Early career · 13 November 2024</p>
          <h1 id="article-title">The meeting that taught me to think like an engineer.</h1>
          <p className="article-deck">An early conversation with a startup CEO gave me something more useful than a list of technologies: a chance to learn how good engineering work is actually done.</p>
          <p className="article-byline">By Shan Padayhag · 2 min read</p>
        </header>
        <div className="article-body">
          <p className="article-lede">I met Joshua Paylaga while I was a second-year college student. He was a senior software engineer building Whitelide Solutions; I was looking for a way to contribute to real work and get better fast. That conversation led to the most useful kind of learning environment: one where the work, the feedback, and the consequences were real.</p>
          <h2>What changed</h2>
          <p>At Whitelide, I was exposed to the full development cycle: brainstorming, development, feedback, and deployment. That taught me to look beyond the task in front of me. Good engineering means understanding what a team is trying to achieve, choosing a practical path, and taking responsibility for the result.</p>
          <p>Joshua’s mentorship was direct and constructive. I could bring a problem, work through the tradeoffs, and return to the code with a clearer decision. That cadence built the habit I still rely on: do the work to understand the problem, ask precise questions, and use feedback to improve the next iteration.</p>
          <aside className="article-pullquote"><p>“The valuable lesson was not a specific tool. It was learning to make better decisions in the work.”</p></aside>
          <h2>The lasting result</h2>
          <p>That early experience gave me a foundation I carried into later roles: technical ownership, comfort with feedback, and a bias toward measurable improvement. It is why I care about engineering that makes a practical difference—not just software that runs, but systems that help a team move with more confidence.</p>
        </div>
        <footer className="article-footer"><Link href="/blog">← Back to all notes</Link></footer>
      </article>
    </main>
  );
}
