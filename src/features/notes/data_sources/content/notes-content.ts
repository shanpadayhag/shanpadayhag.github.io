import type Note from "@/features/notes/entities/note";

export const asvsCheckNote: Note = {
  slug: "checking-daibx-against-asvs",
  title: "Checking DaiBX against all 253 ASVS Level 2 requirements",
  documentTitle: "Checking DaiBX Against All 253 ASVS Level 2 Requirements",
  description:
    "How Shan Padayhag checked the DaiBX API against every OWASP ASVS 5.0 Level 1 and 2 requirement, and the deviations the record writes down.",
  summary:
    "Why I mapped every Level 1 and 2 requirement to the code, and the places where DaiBX deliberately does something different.",
  standfirst:
    "A security checklist tells you what to do. A record tells you where you did it, and where you chose not to.",
  category: "Security · DaiBX",
  publishedOn: "2026-11-21",
  readingMinutes: 4,
};

export const refreshTokenNote: Note = {
  slug: "refresh-tokens-you-can-take-back",
  title: "Refresh tokens you can take back",
  documentTitle: "Refresh Tokens You Can Take Back",
  description:
    "How the Showcase Authentication Service keeps people signed in with opaque, hashed, revocable refresh tokens, and what its first version deliberately leaves out.",
  summary:
    "Why the “stay signed in” token is a random string the server only keeps a hash of, and what the first version leaves out.",
  standfirst:
    "A signed token is easy to check and hard to take back. The fix is to give that job to a second token the server can forget.",
  category: "Authentication · Showcase",
  publishedOn: "2026-11-21",
  readingMinutes: 3,
};

export const firstMeetingNote: Note = {
  slug: "the-first-meeting",
  title: "The meeting that taught me to think like an engineer.",
  documentTitle: "The Meeting That Taught Me to Think Like an Engineer",
  description:
    "How an early meeting with a startup CEO shaped Shan Padayhag's engineering judgment and ownership.",
  summary:
    "Meeting a startup CEO as a student led to hands-on work, direct feedback, and an early lesson in the kind of judgment useful teams need.",
  standfirst:
    "An early conversation with a startup CEO gave me something more useful than a list of technologies: a chance to learn how good engineering work is actually done.",
  category: "Mentorship",
  articleCategory: "Early career",
  publishedOn: "2024-11-13",
  readingMinutes: 2,
};

export const notesContent = {
  eyebrow: "Notes",
  heading: "Notes from the build.",
  introduction:
    "Short write-ups of decisions in my projects — what I chose, what I left out, and why — plus the conversation that started it all.",
  documentTitle: "Notes — Shan Padayhag",
  description:
    "Engineering notes by Shan Padayhag: security and authentication decisions in personal projects, and the mentorship that shaped how he works.",
  readAction: "Read the note",
  homeAction: "Home",
  notesAction: "Notes",
  backToNotesAction: "Back to all notes",
  author: "Shan Padayhag",
  notes: [asvsCheckNote, refreshTokenNote, firstMeetingNote],
};
