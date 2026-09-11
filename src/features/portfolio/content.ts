export const portfolio = {
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
  projects: [
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
        "A production-shaped authentication vertical slice: Argon2id password hashing, email verification, JWT access tokens, revocable opaque refresh tokens, contract-first APIs, and end-to-end tests.",
      href: "https://github.com/shanpadayhag/showcase-auth-service",
    },
    {
      name: "Savings Tracker",
      category: "Local-first finance",
      illustration: "ledger",
      illustrationLabel:
        "Layered financial records, from transactional ledgers to reconciliation and reports",
      diagramLabels: [
        "Transactional ledger",
        "Reconciliation",
        "Read models",
        "Reports",
      ],
      stack: "Next.js · React · TypeScript · IndexedDB",
      description:
        "A local-first finance application built around transactional ledgers, reconciliation, reports and denormalized read models.",
      href: "https://github.com/shanpadayhag/savings-tracker-web",
    },
    {
      name: "Study Aid",
      category: "Learning, offline",
      illustration: "study",
      illustrationLabel:
        "A stack of study cards with spaced repetition scheduling",
      diagramLabels: [
        "Recall",
        "Reflect",
        "Remember",
        "Spaced repetition · FSRS",
      ],
      stack: "Astro · SolidJS · TypeScript · IndexedDB",
      description:
        "An offline study tool with rich cards, attachment management, backups, migrations and an FSRS scheduling integration.",
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
  closingTitle: "Something complex\non your mind?",
  closingDescription: "Let’s make it useful.",
  footer: "Thoughtfully engineered.",
};

export type PortfolioProject = (typeof portfolio.projects)[number];
