import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2
            id="about-title"
            className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] whitespace-pre-line text-balance"
          >
            {portfolioContent.aboutTitle}
          </h2>
          <div className="text-muted-foreground max-w-[62ch] space-y-6 text-lg leading-relaxed">
            {portfolioContent.aboutParagraphs.map((aboutParagraph) => (
              <p key={aboutParagraph}>{aboutParagraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-20 sm:mt-28">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            {portfolioContent.processTitle}
          </h3>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {portfolioContent.process.map((processStep, stepIndex) => (
              <li key={processStep} className="border-border border-t pt-6">
                <span
                  aria-hidden="true"
                  className="font-accent text-brand text-5xl leading-none italic"
                >
                  {stepIndex + 1}
                </span>
                <p className="mt-4 text-xl font-medium tracking-[-0.01em]">
                  {processStep}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
