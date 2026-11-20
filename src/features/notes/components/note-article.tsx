import Link from "next/link";
import type { ReactNode } from "react";
import NotesHeader from "@/features/notes/components/notes-header";
import { notesContent } from "@/features/notes/data_sources/content/notes-content";
import {
  formatNotePublishedDate,
  formatNoteReadingTime,
} from "@/features/notes/entities/note";
import type Note from "@/features/notes/entities/note";

type NoteArticleProps = {
  note: Note;
  children: ReactNode;
};

export default function NoteArticle({ note, children }: NoteArticleProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-24 sm:px-6">
      <NotesHeader
        backLinkHref="/blog"
        backLinkLabel={notesContent.notesAction}
      />
      <main>
        <article className="mt-20 sm:mt-28" aria-labelledby="article-title">
          <header>
            <p className="text-primary text-sm font-medium">
              {note.articleCategory ?? note.category} ·{" "}
              {formatNotePublishedDate(note.publishedOn)}
            </p>
            <h1
              id="article-title"
              className="mt-3 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
            >
              {note.title}
            </h1>
            <p className="text-muted-foreground mt-6 text-xl leading-relaxed">
              {note.standfirst}
            </p>
            <p className="text-muted-foreground mt-6 text-sm">
              By {notesContent.author} ·{" "}
              {formatNoteReadingTime(note.readingMinutes)}
            </p>
          </header>
          <div className="border-border [&_code]:bg-muted mt-12 space-y-6 border-t pt-12 text-lg leading-[1.75] [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h3]:pt-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.015em] [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
            {children}
          </div>
          <footer className="border-border mt-14 border-t pt-8">
            <Link
              className="text-primary font-medium underline-offset-4 hover:underline"
              href="/blog"
            >
              ← {notesContent.backToNotesAction}
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
