import Image from "next/image";
import { version } from "../../../../package.json";
import { portfolio } from "../content";
import { Workspace } from "./workspace";
import { ThemeSwitch } from "./theme-switch";

import "../portfolio.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

function SelectedProjects() {
  return (
    <div className="editor-content">
      <div className="editor-tab">
        <span aria-hidden="true">TS</span> projects.ts{" "}
        <span className="editor-tab-dot" aria-hidden="true" />
      </div>
      <header className="editor-heading">
        <p className="code-comment">{"// Selected personal projects"}</p>
        <h2>Built to hold up.</h2>
        <p>{portfolio.selectedIntroduction}</p>
      </header>
      {portfolio.projects.map((project, index) => (
        <article className="code-project" key={project.name}>
          <div className="code-declaration">
            <span className="code-keyword">export const</span>{" "}
            <span className="code-name">project{index + 1}</span> = {"{"}
          </div>
          <div className="code-properties">
            <p className="code-comment">
              {"// "}
              {project.category}
            </p>
            <span className="code-key">name:</span>
            <h3>“{project.name}”</h3>
            <span className="code-key">description:</span>
            <p className="code-description">{project.description}</p>
            <p className="code-stack">
              <span className="code-key">stack:</span> [
              <span>
                {project.stack
                  .split(" · ")
                  .map((item) => '"' + item + '"')
                  .join(", ")}
              </span>
              ]
            </p>
            <a
              className="portfolio-source-link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="code-keyword">viewSource</span>(){" "}
              <Arrow diagonal />
            </a>
          </div>
          <div className="code-declaration">{"};"}</div>
        </article>
      ))}
      <p className="code-comment editor-ending">
        {"// End of projects. Next: experience on the TV."}
      </p>
    </div>
  );
}

function ProfessionalWork() {
  return (
    <div className="broadcast-content">
      <header className="broadcast-title">
        <p className="broadcast-kicker">
          <span className="channel-mark">SP</span> THE EXPERIENCE REEL
        </p>
        <h2>
          Better in
          <br />
          <em>production.</em>
        </h2>
        <p>{portfolio.resultsIntroduction}</p>
        <div className="broadcast-caption">
          <span>ENGINEERING THAT MAKES A DIFFERENCE</span>
          <span>FEATURE 01</span>
        </div>
      </header>
      {portfolio.outcomes.map((outcome, index) => (
        <article className="broadcast-result" key={outcome.metric}>
          <p className="broadcast-kicker">THE RESULTS / 0{index + 1}</p>
          <strong>{outcome.metric}</strong>
          <p>{outcome.description}</p>
          <span className="broadcast-rule" aria-hidden="true" />
        </article>
      ))}
      <div className="broadcast-credits">
        <p className="broadcast-kicker">BEHIND THE WORK</p>
        {portfolio.work.map((work) => (
          <article key={work.company}>
            <p className="experience-period">{work.period}</p>
            <h3>{work.company}</h3>
            <p className="broadcast-role">{work.role}</p>
            <p>{work.detail}</p>
          </article>
        ))}
      </div>
      <p className="broadcast-signoff">Up next: a few personal notes.</p>
    </div>
  );
}

function NotePage({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <article className="notebook-page" data-page={number - 1}>
      <div className="notebook-page-body">{children}</div>
      <span className="notebook-page-number">
        {String(number).padStart(2, "0")}
      </span>
    </article>
  );
}

function Notebook() {
  return (
    <div className="notebook-content">
      <div className="notebook-book">
        <NotePage number={1}>
          <p className="note-date">From my desk</p>
          <h2>
            A considered
            <br />
            approach.
          </h2>
          <p>{portfolio.aboutParagraphs[0]}</p>
          <span className="note-underline" aria-hidden="true" />
        </NotePage>
        <div className="notebook-leaf">
          <NotePage number={2}>
            <p className="note-date">How I work</p>
            <h3>
              Think it through.
              <br />
              Then build.
            </h3>
            <p>{portfolio.aboutParagraphs[1]}</p>
          </NotePage>
          <NotePage number={3}>
            <p className="note-date">Worth keeping</p>
            <h3>
              The first
              <br />
              meeting.
            </h3>
            <p>
              An early lesson in engineering, mentorship, and learning through
              real work.
            </p>
            <a
              className="portfolio-source-link"
              href="/blog/the-first-meeting/"
            >
              Read the note <Arrow diagonal />
            </a>
            <p className="note-postscript">Keep learning. Keep making.</p>
          </NotePage>
        </div>
        <NotePage number={4}>
          <p className="note-date">An open invitation</p>
          <h3>
            Let’s make
            <br />
            it useful.
          </h3>
          <p>Something complex on your mind?</p>
          <a className="notebook-email" href={`mailto:${portfolio.email}`}>
            {portfolio.email}
          </a>
          <p className="note-signature">— Shan</p>
        </NotePage>
      </div>
      <nav className="notebook-pagination" aria-label="Notebook pages">
        <button
          type="button"
          data-page-turn="previous"
          aria-label="Previous notebook page"
        >
          ←
        </button>
        <span className="notebook-page-status">Pages 1–2 / 4</span>
        <button
          type="button"
          data-page-turn="next"
          aria-label="Next notebook page"
        >
          →
        </button>
      </nav>
    </div>
  );
}

function Introduction() {
  return (
    <>
      <h1>
        {portfolio.headline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className="portfolio-hero-description">{portfolio.introduction}</p>
      <a className="portfolio-primary-link" href="#projects">
        Step into my workspace
        <Arrow />
      </a>
      <p className="journey-hint">
        Scroll to explore the computer, TV, and notebook.
      </p>
    </>
  );
}

function Closing() {
  return (
    <>
      <h2>{portfolio.closingTitle}</h2>
      <p>{portfolio.closingDescription}</p>
      <a
        className="portfolio-source-link journey-email"
        href={`mailto:${portfolio.email}`}
      >
        {portfolio.email}
        <Arrow diagonal />
      </a>
    </>
  );
}

export function PortfolioPage() {
  return (
    <div className="portfolio" id="top">
      <a className="portfolio-skip" href="#main">
        Skip to content
      </a>
      <header className="portfolio-header portfolio-container">
        <a className="portfolio-wordmark" href="#top">
          <Image
            src="/icon.svg"
            alt=""
            width={36}
            height={36}
            className="portfolio-logo"
          />
          <span className="portfolio-name">{portfolio.name}</span>
          <span className="portfolio-role">{portfolio.role}</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <ThemeSwitch />
        </nav>
      </header>
      <main id="main" className="portfolio-main">
        <Workspace
          intro={<Introduction />}
          projects={<SelectedProjects />}
          experience={<ProfessionalWork />}
          notes={<Notebook />}
          closing={<Closing />}
        />
      </main>
      <footer className="portfolio-footer portfolio-container">
        <span>
          © {new Date().getFullYear()} {portfolio.name}
        </span>
        <div>
          {portfolio.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("https")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.label}
              <Arrow diagonal />
            </a>
          ))}
        </div>
        <span className="portfolio-version">v{version}</span>
      </footer>
    </div>
  );
}
