import Link from "next/link";
import ThemeToggle from "@/core/components/molecules/theme-toggle";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";

const navigationLinks = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function FloatingNavigation() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary navigation"
        className="border-border/70 bg-background/85 pointer-events-auto flex items-center gap-0.5 rounded-full border p-1.5 shadow-[0_12px_32px_-16px_rgb(14_21_18/0.35)] backdrop-blur-md sm:gap-1 sm:pl-5"
      >
        <Link
          href="/#top"
          className="font-accent mr-2 hidden text-lg italic sm:block"
        >
          {portfolioContent.name}
        </Link>
        {navigationLinks.map((navigationLink) => (
          <Link
            key={navigationLink.href}
            href={navigationLink.href}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            {navigationLink.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
