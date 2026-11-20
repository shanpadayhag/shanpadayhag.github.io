import Link from "next/link";
import {
  buildNoteHref,
  formatNotePublishedDate,
  formatNoteReadingTime,
} from "@/features/notes/entities/note";
import type Note from "@/features/notes/entities/note";

type NoteCardProps = {
  note: Note;
  readAction: string;
};

export default function NoteCard({ note, readAction }: NoteCardProps) {
  return (
    <Link
      className="bg-card border-border hover:border-brand/50 group block rounded-[2rem] border p-7 shadow-[0_18px_50px_-32px_rgb(14_21_18/0.4)] transition-colors sm:p-9"
      href={buildNoteHref(note)}
    >
      <div className="text-muted-foreground flex gap-4 text-sm tabular-nums">
        <span>{formatNotePublishedDate(note.publishedOn)}</span>
        <span>{formatNoteReadingTime(note.readingMinutes)}</span>
      </div>
      <div className="mt-6">
        <p className="text-primary text-sm font-medium">{note.category}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
          {note.title}
        </h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {note.summary}
        </p>
      </div>
      <span className="text-primary mt-6 inline-flex items-center gap-1.5 font-medium group-hover:underline">
        {readAction} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
