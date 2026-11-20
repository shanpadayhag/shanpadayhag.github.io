import FirstMeetingPage from "@/features/notes/pages/first-meeting-page";
import { firstMeetingNote } from "@/features/notes/data_sources/content/notes-content";
import { buildNoteMetadata } from "@/features/notes/entities/note";

export const metadata = buildNoteMetadata(firstMeetingNote);

export default function FirstMeeting() {
  return <FirstMeetingPage />;
}
