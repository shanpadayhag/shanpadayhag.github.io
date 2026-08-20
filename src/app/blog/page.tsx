import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Notes — Shan Padayhag",
  description: "A note about the meeting that changed how Shan Padayhag learned software engineering.",
};

export default function BlogPage() {
  return (
    <main className="notes-page">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Shan Padayhag, home">
          <Image src="/icon.svg" alt="" width={32} height={32} />
          <span>Shan Padayhag</span>
        </Link>
        <Link className="back-link" href="/">Home <span aria-hidden="true">←</span></Link>
      </nav>
      <section className="notes-intro" aria-labelledby="notes-title">
        <p className="eyebrow">Notes</p>
        <h1 id="notes-title">One story worth keeping.</h1>
        <p>A small archive of moments that changed how I build, learn, and work with other people.</p>
      </section>
      <section className="post-list" aria-label="Published notes">
        <Link className="post-preview" href="/blog/the-first-meeting">
          <div className="post-preview-meta"><span>13 November 2024</span><span>2 min read</span></div>
          <div className="post-preview-content">
            <p className="eyebrow">Mentorship</p>
            <h2>The meeting that taught me to think like an engineer.</h2>
            <p>Meeting a startup CEO as a student led to hands-on work, direct feedback, and an early lesson in the kind of judgment useful teams need.</p>
          </div>
          <span className="post-preview-action">Read the note <span aria-hidden="true">→</span></span>
        </Link>
      </section>
    </main>
  );
}
