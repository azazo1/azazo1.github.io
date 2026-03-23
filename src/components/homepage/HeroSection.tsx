import { Group, Text, Title } from "@mantine/core";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ActionButton } from "./ActionButton";
import { SiteHeader } from "./SiteHeader";
import type { HeroContent, SiteHeaderContent } from "../../types/site";

export function HeroSection({
  site,
  hero,
}: {
  site: SiteHeaderContent;
  hero: HeroContent;
}) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const avatarY = useTransform(scrollYProgress, [0, 0.4], [0, reducedMotion ? 0 : 72]);

  return (
    <motion.section className="hero" style={{ opacity: heroOpacity }}>
      <motion.div className="hero-backdrop" style={{ y: heroY }} />
      <div className="hero-noise" />
      <SiteHeader site={site} />

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 36 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Text className="eyebrow">{hero.eyebrow}</Text>
          <Title order={1} className="hero-title">
            <span>{hero.titlePrimary}</span>
            <span>{hero.titleSecondary}</span>
          </Title>
          <Text className="hero-body">{hero.body}</Text>

          {hero.actions.length > 0 && (
            <Group className="hero-actions">
              {hero.actions.map((action) => (
                <ActionButton key={`${action.label}-${action.href}`} action={action} />
              ))}
            </Group>
          )}
        </motion.div>

        <motion.div
          className="hero-visual"
          style={{ y: avatarY }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbital-ring orbital-ring-a" />
          <div className="orbital-ring orbital-ring-b" />
          <img src={hero.avatarSrc} alt={hero.avatarAlt ?? hero.titlePrimary} className="avatar-image" />

          {hero.metadata.length > 0 && (
            <div className="hero-metadata">
              {hero.metadata.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
