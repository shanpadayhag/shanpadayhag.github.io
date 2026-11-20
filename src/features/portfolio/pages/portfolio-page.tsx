import FloatingNavigation from "@/features/portfolio/components/floating-navigation";
import HeroSection from "@/features/portfolio/components/hero-section";
import AboutSection from "@/features/portfolio/components/about-section";
import ProjectsSection from "@/features/portfolio/components/projects-section";
import ExperienceSection from "@/features/portfolio/components/experience-section";
import StatementSection from "@/features/portfolio/components/statement-section";
import ContactSection from "@/features/portfolio/components/contact-section";
import SiteFooter from "@/features/portfolio/components/site-footer";

export default function PortfolioPage() {
  return (
    <>
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only z-[60] rounded-full px-5 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <FloatingNavigation />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <StatementSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
