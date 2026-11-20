import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import CopyEmailButton from "@/features/portfolio/components/copy-email-button";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-accent relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-14 sm:py-24">
          <div
            aria-hidden="true"
            className="bg-brand-glow/45 absolute -right-24 -bottom-32 -z-10 size-96 rounded-full blur-3xl"
          />
          <h2
            id="contact-title"
            className="text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em] whitespace-pre-line text-balance"
          >
            {portfolioContent.closingTitle}
          </h2>
          <p className="font-accent text-brand mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] italic">
            {portfolioContent.closingDescription}
          </p>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`mailto:${portfolioContent.email}`}
              className="decoration-brand/50 hover:decoration-brand text-xl font-medium break-all underline decoration-2 underline-offset-[6px] sm:text-2xl"
            >
              {portfolioContent.email}
            </a>
            <CopyEmailButton email={portfolioContent.email} className="w-fit" />
          </div>
        </div>
      </div>
    </section>
  );
}
