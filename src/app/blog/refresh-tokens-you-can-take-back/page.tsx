import RefreshTokensYouCanTakeBackPage from "@/features/notes/pages/refresh-tokens-you-can-take-back-page";
import { refreshTokenNote } from "@/features/notes/data_sources/content/notes-content";
import { buildNoteMetadata } from "@/features/notes/entities/note";

export const metadata = buildNoteMetadata(refreshTokenNote);

export default function RefreshTokensYouCanTakeBack() {
  return <RefreshTokensYouCanTakeBackPage />;
}
