import { Box } from "@mantine/core";
import { CtaSection } from "./components/homepage/CtaSection";
import { HeroSection } from "./components/homepage/HeroSection";
import { MetricsSection } from "./components/homepage/MetricsSection";
import { ProfileSection } from "./components/homepage/ProfileSection";
import { ProjectsSection } from "./components/homepage/ProjectsSection";
import { RevealSection } from "./components/homepage/RevealSection";
import { siteContent } from "./lib/site-content";

export default function App() {
  const { site, hero, metrics, projects, profile, cta } = siteContent;

  return (
    <Box className="page-shell">
      <HeroSection site={site} hero={hero} />

      <main className="content-shell">
        <RevealSection delay={0.05}>
          <MetricsSection metrics={metrics} />
        </RevealSection>

        <RevealSection delay={0.1}>
          <ProjectsSection projects={projects} />
        </RevealSection>

        <RevealSection delay={0.12}>
          <ProfileSection profile={profile} />
        </RevealSection>

        <RevealSection delay={0.18}>
          <CtaSection cta={cta} />
        </RevealSection>
      </main>
    </Box>
  );
}
