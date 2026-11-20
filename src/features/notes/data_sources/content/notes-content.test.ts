import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { notesContent } from "@/features/notes/data_sources/content/notes-content";
import { buildNoteHref } from "@/features/notes/entities/note";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

describe("notes content", () => {
  it("gives every note its own slug", () => {
    const noteSlugs = notesContent.notes.map((note) => note.slug);
    expect(new Set(noteSlugs).size).toBe(noteSlugs.length);
  });

  it.each(notesContent.notes.map((note) => note.slug))(
    "has a route for %s",
    (noteSlug) => {
      const routePagePath = path.resolve(
        process.cwd(),
        "src/app/blog",
        noteSlug,
        "page.tsx",
      );
      expect(existsSync(routePagePath)).toBe(true);
    },
  );

  it("lists the notes newest first", () => {
    const publishedDates = notesContent.notes.map((note) => note.publishedOn);
    expect(publishedDates).toEqual([...publishedDates].sort().reverse());
  });

  it("points every project note link at a published note", () => {
    const publishedNoteHrefs = new Set(notesContent.notes.map(buildNoteHref));
    const projectNoteHrefs = portfolioContent.projects.flatMap((project) =>
      project.noteHref ? [project.noteHref] : [],
    );
    expect(projectNoteHrefs).toHaveLength(2);
    for (const projectNoteHref of projectNoteHrefs) {
      expect(publishedNoteHrefs.has(projectNoteHref)).toBe(true);
    }
  });
});
