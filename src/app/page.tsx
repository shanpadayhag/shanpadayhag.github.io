import Image from "next/image";

const work = [
  {
    role: "Software Engineer",
    company: "Mabizza IT Solutions",
    period: "Sep 2022 — Jul 2024",
    detail:
      "Maintained and improved a calculation-heavy client application with PHP, TypeScript, React, MySQL, Redis, AWS and Ubuntu.",
  },
  {
    role: "Lead Developer",
    company: "Whitelide",
    period: "May 2021 — Sep 2022",
    detail:
      "Provided technical direction for a small delivery team while building with Laravel, React, TypeScript, MySQL, CI/CD and Ubuntu.",
  },
];
const projects = [
  {
    name: "Savings Tracker",
    stack: "Next.js · React · TypeScript · IndexedDB",
    description:
      "A local-first finance application built around transactional ledgers, reconciliation, reports and denormalized read models.",
    href: "https://github.com/shanpadayhag/savings-tracker-web",
  },
  {
    name: "Study Aid",
    stack: "Astro · SolidJS · TypeScript · IndexedDB",
    description:
      "An offline study tool with rich cards, attachment management, backups, migrations and an FSRS scheduling integration.",
    href: "https://github.com/shanpadayhag/study-aid",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Shan Padayhag, home">
          <Image src="/icon.svg" alt="" width={32} height={32} />
          <span>Shan Padayhag</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="/blog">Notes</a>
        </div>
      </nav>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <p className="availability">
          Available for thoughtful engineering teams
        </p>
        <h1 id="hero-title">
          Shan Padayhag
          <span>Software engineer for systems that need to move faster.</span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-summary">
            I turn slow, calculation-heavy software into reliable, maintainable
            systems. My work sits where backend performance, practical product
            engineering, and technical judgment meet.
          </p>
          <a className="text-link" href="#projects">
            See selected work <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <section className="proof" aria-label="Selected outcomes">
        <article className="proof-item">
          <strong>3 s → 300&nbsp;ms</strong>
          <p>
            Selected basic API calls after eliminating unnecessary database
            work.
          </p>
        </article>
        <article className="proof-item">
          <strong>90%</strong>
          <p>
            Database-load reduction through targeted performance remediation.
          </p>
        </article>
        <article className="proof-item">
          <strong>99.9%</strong>
          <p>Uptime maintained for a system used by 1,300+ daily operators.</p>
        </article>
      </section>
      <section
        className="section work-section"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <h2 id="work-title">Work shaped by constraints, not buzzwords.</h2>
          <p>
            Experience across product maintenance, performance improvements,
            technical direction, testing, delivery, and production operations.
          </p>
        </div>
        <div className="work-list">
          {work.map((item) => (
            <article className="work-entry" key={item.company}>
              <p className="work-period">{item.period}</p>
              <div>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section projects-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <h2 id="projects-title">Source-verified personal projects.</h2>
          <p>
            Built to practice the parts of engineering I care about: correct
            data models, useful offline behavior, and tests that protect the
            hard edges.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a
              className="project-entry"
              href={project.href}
              key={project.name}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3>{project.name}</h3>
                <p className="stack">{project.stack}</p>
              </div>
              <p>{project.description}</p>
              <span className="project-action">
                View source <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="closing" aria-labelledby="closing-title">
        <p>
          Currently deepening Rust while building a public systems showcase.
        </p>
        <h2 id="closing-title">
          Looking for the next hard thing to make measurably better.
        </h2>
        <a
          className="contact-link"
          href="https://github.com/shanpadayhag"
          target="_blank"
          rel="noreferrer"
        >
          Find me on GitHub <span aria-hidden="true">→</span>
        </a>
      </section>
      <footer>
        <span>© {new Date().getFullYear()} Shan Padayhag</span>
        <span>Built with deliberate constraints.</span>
      </footer>
    </main>
  );
}
