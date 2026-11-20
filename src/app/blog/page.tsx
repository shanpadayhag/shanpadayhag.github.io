import type { Metadata } from "next";
import NotesPage from "@/features/notes/pages/notes-page";
import { notesContent } from "@/features/notes/data_sources/content/notes-content";

export const metadata: Metadata = {
  title: notesContent.documentTitle,
  description: notesContent.description,
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: notesContent.documentTitle,
    description: notesContent.description,
    type: "website",
  },
};

export default function Blog() {
  return <NotesPage />;
}
