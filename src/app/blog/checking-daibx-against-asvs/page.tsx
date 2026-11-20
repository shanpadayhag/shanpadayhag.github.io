import CheckingDaibxAgainstAsvsPage from "@/features/notes/pages/checking-daibx-against-asvs-page";
import { asvsCheckNote } from "@/features/notes/data_sources/content/notes-content";
import { buildNoteMetadata } from "@/features/notes/entities/note";

export const metadata = buildNoteMetadata(asvsCheckNote);

export default function CheckingDaibxAgainstAsvs() {
  return <CheckingDaibxAgainstAsvsPage />;
}
