import { describe, expect, it } from "vitest";
import {
  buildNoteHref,
  buildNoteMetadata,
  formatNotePublishedDate,
  formatNoteReadingTime,
} from "@/features/notes/entities/note";
import type Note from "@/features/notes/entities/note";

const sampleNote: Note = {
  slug: "sample-note",
  title: "A sample note.",
  documentTitle: "A Sample Note",
  description: "A note used by the tests.",
  summary: "The summary on the index card.",
  standfirst: "The line under the heading.",
  category: "Testing",
  publishedOn: "2026-01-05",
  readingMinutes: 3,
};

describe("note entity", () => {
  it("formats the published date as day, month name and year", () => {
    expect(formatNotePublishedDate("2024-11-13")).toBe("13 November 2024");
  });

  it("keeps the published date on the same day in every time zone", () => {
    expect(formatNotePublishedDate("2026-01-01")).toBe("1 January 2026");
  });

  it("formats the reading time in minutes", () => {
    expect(formatNoteReadingTime(4)).toBe("4 min read");
  });

  it("builds the note address with a trailing slash", () => {
    expect(buildNoteHref(sampleNote)).toBe("/blog/sample-note/");
  });

  it("builds article metadata from the note", () => {
    expect(buildNoteMetadata(sampleNote)).toEqual({
      title: "A Sample Note — Shan Padayhag",
      description: "A note used by the tests.",
      alternates: { canonical: "/blog/sample-note/" },
      openGraph: {
        title: "A Sample Note — Shan Padayhag",
        description: "A note used by the tests.",
        type: "article",
        publishedTime: "2026-01-05",
        authors: ["Shan Padayhag"],
      },
    });
  });
});
