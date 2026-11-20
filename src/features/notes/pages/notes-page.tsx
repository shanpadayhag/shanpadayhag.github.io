import NoteCard from "@/features/notes/components/note-card";
import NotesHeader from "@/features/notes/components/notes-header";
import { notesContent } from "@/features/notes/data_sources/content/notes-content";

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-24 sm:px-6">
      <NotesHeader backLinkHref="/" backLinkLabel={notesContent.homeAction} />
      <main>
        <section className="mt-20 sm:mt-28" aria-labelledby="notes-title">
          <p className="text-primary text-sm font-medium">
            {notesContent.eyebrow}
          </p>
          <h1
            id="notes-title"
            className="mt-3 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance"
          >
            {notesContent.heading}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[52ch] text-lg leading-relaxed">
            {notesContent.introduction}
          </p>
        </section>
        <section className="mt-14 space-y-6" aria-label="Published notes">
          {notesContent.notes.map((note) => (
            <NoteCard
              key={note.slug}
              note={note}
              readAction={notesContent.readAction}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
