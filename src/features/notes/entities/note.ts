import type { Metadata } from "next";

type Note = {
  slug: string;
  title: string;
  documentTitle: string;
  description: string;
  summary: string;
  standfirst: string;
  category: string;
  articleCategory?: string;
  publishedOn: string;
  readingMinutes: number;
};

const notePublishedDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatNotePublishedDate(publishedOn: string) {
  return notePublishedDateFormat.format(new Date(`${publishedOn}T00:00:00Z`));
}

export function formatNoteReadingTime(readingMinutes: number) {
  return `${readingMinutes} min read`;
}

export function buildNoteHref(note: Pick<Note, "slug">) {
  return `/blog/${note.slug}/`;
}

export function buildNoteMetadata(note: Note): Metadata {
  const pageTitle = `${note.documentTitle} — Shan Padayhag`;
  return {
    title: pageTitle,
    description: note.description,
    alternates: { canonical: buildNoteHref(note) },
    openGraph: {
      title: pageTitle,
      description: note.description,
      type: "article",
      publishedTime: note.publishedOn,
      authors: ["Shan Padayhag"],
    },
  };
}

export default Note;
