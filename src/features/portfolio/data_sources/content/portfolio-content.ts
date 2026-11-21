import type { ProjectScreenshot } from "@/features/portfolio/entities/project-screenshot";

export const portfolioContent = {
  name: "Shan Padayhag",
  role: "Software engineer",
  title: "Shan Padayhag — Software Engineer",
  description:
    "Performance-minded software engineering across backend, frontend, data, and production operations. Explore selected work by Shan Padayhag.",
  headline: ["Complexity,", "made useful."],
  introduction:
    "I turn demanding systems into reliable software — from the data underneath to the experience on top.",
  disciplines: "Backend · Frontend · Systems",
  identity: "Shan Padayhag · Software engineer",
  figureDescription:
    "Illustrated 3D likeness of Shan Padayhag, smiling and holding up a peace sign",
  workAction: "Explore my work",
  contactAction: "Let’s talk",
  navigation: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
  ],
  email: "shanpadayhag@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/shanpadayhag" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shanpadayhag/" },
    { label: "Notes", href: "/blog" },
  ],
  selectedTitle: "Built to hold up.",
  selectedIntroduction:
    "Personal projects that put the hard parts first: trust, data integrity, and software that works offline.",
  projectSourceAction: "Explore source",
  projectNoteAction: "Read the note",
  projects: [
    {
      name: "DaiBX",
      category: "Planning, start to finish",
      illustration: "planner",
      screenshot: {
        slug: "daibx",
        alt: "DaiBX board named Personal: a To do list with Plan weekend hike, Renew library card and Book dentist appointment, and a Doing list with Read chapter 4 and Fix bike brakes.",
        caption: "Sample data · DaiBX web v3.7.0",
      } satisfies ProjectScreenshot,
      stack:
        "Rust · Axum · AWS Lambda · PostgreSQL · Supabase · Next.js · Vercel",
      description:
        "A planner with nested tasks, a board, and a calendar whose events link back to tasks and cards, plus time tracking and automatic scheduling. Invite-only sign-up with a required authenticator app, built to OWASP ASVS 5.0 Level 2.",
      note: "Sign-up is invite-only for now.",
      href: "https://github.com/shanpadayhag/dai-bx-api",
      additionalLinks: [
        {
          label: "Web source",
          href: "https://github.com/shanpadayhag/dai-bx-web",
        },
        { label: "Visit the app", href: "https://dai-bx.vercel.app/" },
      ],
      noteHref: "/blog/checking-daibx-against-asvs/",
    },
    {
      name: "Showcase Authentication Service",
      category: "Identity & access",
      illustration: "auth",
      illustrationLabel:
        "Authentication flow from credentials through verification to revocable sessions",
      diagramLabels: [
        "Credentials",
        "Verify",
        "Session",
        "Argon2id",
        "JWT access",
        "Revocable refresh",
      ],
      stack: "Rust · Axum · AWS Lambda · PostgreSQL · sqlx · OpenAPI",
      description:
        "A production-shaped authentication vertical slice: Argon2id password hashing, email verification, JWT access tokens, revocable opaque refresh tokens, a contract-first API, and integration tests that run the whole sign-in flow against PostgreSQL.",
      href: "https://github.com/shanpadayhag/showcase-auth-service",
      noteHref: "/blog/refresh-tokens-you-can-take-back/",
    },
    {
      name: "Savings Tracker",
      category: "Local-first finance",
      illustration: "ledger",
      screenshot: {
        slug: "savings-tracker",
        alt: "Savings Tracker dashboard: a net worth of $9,432.55, with $4,282.55 in wallets, $5,150.00 in goals and $267.45 spent this month, above a note that the New laptop goal is 53% complete.",
        caption: "Sample data · Savings Tracker master b3eb39e",
      } satisfies ProjectScreenshot,
      stack: "Next.js · React · TypeScript · IndexedDB",
      description:
        "A local-first finance application built around transactional ledgers, reconciliation, reports and denormalized read models.",
      href: "https://github.com/shanpadayhag/savings-tracker-web",
    },
    {
      name: "Study Aid",
      category: "Learning, local-first",
      illustration: "study",
      screenshot: {
        slug: "study-aid",
        alt: "Study Aid reviewing a World capitals deck: the answer “Canberra, not Sydney.” is revealed below its question, above the Again, Hard, Good and Easy rating buttons.",
        caption: "Sample data · Study Aid master f994886",
      } satisfies ProjectScreenshot,
      stack: "Next.js · React · TypeScript · IndexedDB",
      description:
        "A local-first study tool with Markdown cards, deduplicated file attachments, backups and an FSRS scheduling integration.",
      href: "https://github.com/shanpadayhag/study-aid",
    },
  ],
  resultsTitle: "Better in production.",
  resultsIntroduction:
    "Professional experience making calculation-heavy systems faster, more reliable, and more efficient.",
  outcomes: [
    {
      metric: "3 s → 300 ms",
      description:
        "Selected basic API calls after eliminating unnecessary database work.",
    },
    {
      metric: "90%",
      description:
        "Database-load reduction through targeted performance remediation.",
    },
    {
      metric: "99.9%",
      description:
        "Uptime maintained for a system used by 1,300+ daily operators.",
    },
  ],
  work: [
    {
      role: "Software Engineer",
      company: "Mabizza IT Solutions",
      period: "Sep 2022 — Jul 2024",
      detail:
        "Primarily optimized slow existing production features in a calculation-heavy Laravel web and mobile application, while continuing to deliver across the full stack.",
    },
    {
      role: "Lead Developer",
      company: "Whitelide",
      period: "May 2021 — Sep 2022",
      detail:
        "Provided technical direction for a small delivery team while building Laravel backend services and frontend features for web and mobile applications.",
    },
  ],
  aboutTitle: "A broad toolkit.\nA considered approach.",
  aboutParagraphs: [
    "My strongest work is in performance-minded systems. I build across backend, frontend, data, and production operations, and I’m learning Rust to broaden that toolkit.",
    "I plan the work before I write it: understand what’s needed, shape the approach, then build in clear, testable steps. AI tooling speeds up implementation; the thinking, standards, review, and tests stay mine. Every line I ship is one I can explain and defend.",
  ],
  processTitle: "I plan the work before I write it.",
  process: [
    "Understand what’s needed",
    "Shape the approach",
    "Build in clear, testable steps",
  ],
  closingTitle: "Something complex\non your mind?",
  closingDescription: "Let’s make it useful.",
  footer: "Thoughtfully engineered.",
};

export type PortfolioProject = (typeof portfolioContent.projects)[number];
