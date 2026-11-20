import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="experience-title"
          className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
        >
          {portfolioContent.resultsTitle}
        </h2>
        <p className="text-muted-foreground mt-5 max-w-[52ch] text-lg leading-relaxed">
          {portfolioContent.resultsIntroduction}
        </p>
        <ul className="border-border mt-14 grid gap-10 border-y py-12 sm:grid-cols-3 sm:gap-8">
          {portfolioContent.outcomes.map((outcome) => (
            <li key={outcome.metric}>
              <strong className="font-accent text-brand block text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-normal italic tabular-nums">
                {outcome.metric}
              </strong>
              <p className="text-muted-foreground mt-4 max-w-[32ch] leading-relaxed">
                {outcome.description}
              </p>
            </li>
          ))}
        </ul>
        <ol className="divide-border mt-6 divide-y">
          {portfolioContent.work.map((workEntry) => (
            <li
              key={workEntry.company}
              className="grid gap-3 py-8 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <p className="text-muted-foreground pt-1 text-sm tabular-nums">
                {workEntry.period}
              </p>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.015em]">
                  {workEntry.role}
                </h3>
                <p className="text-primary font-medium">{workEntry.company}</p>
                <p className="text-muted-foreground mt-3 max-w-[65ch] leading-relaxed">
                  {workEntry.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
