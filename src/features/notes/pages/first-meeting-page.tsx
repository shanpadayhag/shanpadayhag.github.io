import NoteArticle from "@/features/notes/components/note-article";
import { firstMeetingNote } from "@/features/notes/data_sources/content/notes-content";

export default function FirstMeetingPage() {
  return (
    <NoteArticle note={firstMeetingNote}>
      <p className="text-foreground text-xl">
        I met Joshua Paylaga while I was a second-year college student. He was a
        senior software engineer building Whitelide Solutions; I was looking for
        a way to contribute to real work and get better fast. That conversation
        led to the most useful kind of learning environment: one where the work,
        the feedback, and the consequences were real.
      </p>
      <h2>What changed</h2>
      <p>
        At Whitelide, I was exposed to the full development cycle:
        brainstorming, development, feedback, and deployment. That taught me to
        look beyond the task in front of me. Good engineering means
        understanding what a team is trying to achieve, choosing a practical
        path, and taking responsibility for the result.
      </p>
      <p>
        Joshua’s mentorship was direct and constructive. I could bring a
        problem, work through the tradeoffs, and return to the code with a
        clearer decision. That cadence built the habit I still rely on: do the
        work to understand the problem, ask precise questions, and use feedback
        to improve the next iteration.
      </p>
      <figure className="border-brand my-10 border-y py-8">
        <p className="font-accent text-[clamp(1.5rem,3.5vw,2rem)] leading-snug italic">
          “The valuable lesson was not a specific tool. It was learning to make
          better decisions in the work.”
        </p>
      </figure>
      <h2>The lasting result</h2>
      <p>
        That early experience gave me a foundation I carried into later roles:
        technical ownership, comfort with feedback, and a bias toward measurable
        improvement. It is why I care about engineering that makes a practical
        difference—not just software that runs, but systems that help a team
        move with more confidence.
      </p>
    </NoteArticle>
  );
}
