import { ArrowDown } from "lucide-react";
import { Button } from "@/core/components/atoms/button";
import FigureStage from "@/features/figure/components/figure-stage";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import VelocityMarquee from "@/features/portfolio/components/velocity-marquee";

export default function HeroSection() {
  const [headlineFirstLine, headlineSecondLine] = portfolioContent.headline;
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-36 sm:pt-36 sm:pb-52"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-6 -z-10 sm:bottom-10">
        <VelocityMarquee
          text={portfolioContent.disciplines}
          baseVelocity={-1.2}
          className="text-[clamp(4.5rem,13vw,11rem)] leading-none font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--border)]"
        />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <div>
          <p className="sr-only">{portfolioContent.disciplines}</p>
          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,8.5vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
          >
            <span className="block">{headlineFirstLine}</span>
            <span className="font-accent text-brand block font-normal italic">
              {headlineSecondLine}
            </span>
          </h1>
          <p className="text-muted-foreground mt-7 max-w-[36ch] text-lg leading-relaxed sm:text-xl">
            {portfolioContent.introduction}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6">
              <a href="#projects">
                {portfolioContent.workAction}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-background/70 h-12 rounded-full px-6"
            >
              <a href="#contact">{portfolioContent.contactAction}</a>
            </Button>
          </div>
        </div>
        <FigureStage caption={portfolioContent.identity} />
      </div>
    </section>
  );
}
