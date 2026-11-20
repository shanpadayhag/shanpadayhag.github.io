import { ArrowUpRight } from "lucide-react";
import { version } from "../../../../package.json";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

export default function SiteFooter() {
  return (
    <footer className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="bg-card border-border relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border px-6 py-10 sm:px-10">
        <div
          aria-hidden="true"
          className="bg-brand-glow/25 absolute -top-28 left-1/4 -z-10 size-72 rounded-full blur-3xl"
        />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-accent text-3xl italic">
              {portfolioContent.name}
            </p>
            <p className="text-muted-foreground mt-2">
              {portfolioContent.footer}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {portfolioContent.links.map((link) => {
              const isExternalLink = link.href.startsWith("https");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(isExternalLink
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="border-border hover:bg-muted inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {link.label}
                    {isExternalLink && (
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-border text-muted-foreground mt-10 flex flex-wrap justify-between gap-2 border-t pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} {portfolioContent.name}
          </p>
          <p className="tabular-nums">v{version}</p>
        </div>
      </div>
    </footer>
  );
}
