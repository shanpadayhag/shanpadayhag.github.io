import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import WordRevealText from "@/features/portfolio/components/word-reveal-text";

export default function StatementSection() {
  return (
    <section aria-label="Statement" className="py-24 sm:py-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <WordRevealText
          text={portfolioContent.introduction}
          className="font-accent text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-balance italic"
        />
      </div>
    </section>
  );
}
