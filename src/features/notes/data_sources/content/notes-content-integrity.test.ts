import { describe, expect, it } from "vitest";
import { isBuiltPagePresent, readBuiltPage } from "@/core/testing/built-page";
import { notesContent } from "@/features/notes/data_sources/content/notes-content";
import {
  formatNotePublishedDate,
  formatNoteReadingTime,
} from "@/features/notes/entities/note";

describe.runIf(isBuiltPagePresent("blog") || process.env.CI === "true")(
  "the built notes pages",
  () => {
    const builtNotesPage = readBuiltPage("blog");

    it.each([
      notesContent.eyebrow,
      notesContent.heading,
      notesContent.introduction,
      notesContent.documentTitle,
      notesContent.description,
      notesContent.readAction,
      notesContent.homeAction,
    ])("lists %j on the notes page", (pageText) => {
      expect(builtNotesPage.containsText(pageText)).toBe(true);
    });

    describe.each(notesContent.notes)("$slug", (note) => {
      const builtArticlePage = readBuiltPage(`blog/${note.slug}`);

      it.each([
        note.title,
        note.summary,
        note.category,
        formatNotePublishedDate(note.publishedOn),
        formatNoteReadingTime(note.readingMinutes),
      ])("shows %j on its notes card", (cardText) => {
        expect(builtNotesPage.containsText(cardText)).toBe(true);
      });

      it.each([
        note.title,
        note.documentTitle,
        note.description,
        note.standfirst,
        note.articleCategory ?? note.category,
        notesContent.author,
        notesContent.notesAction,
        notesContent.backToNotesAction,
      ])("shows %j on its article page", (articleText) => {
        expect(builtArticlePage.containsText(articleText)).toBe(true);
      });
    });
  },
);
