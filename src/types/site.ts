export type ButtonVariant = "primary" | "ghost";

export type IconName = "arrowRight" | "bolt" | "code" | "github" | "sparkles" | "star";

export interface ActionLink {
  label: string;
  href: string;
  variant: ButtonVariant;
  icon?: IconName;
}

export interface SiteHeaderContent {
  brand: string;
  navLabel: string;
  navHref: string;
}

export interface HeroContent {
  eyebrow: string;
  titlePrimary: string;
  titleSecondary: string;
  body: string;
  avatarSrc: string;
  avatarAlt?: string;
  metadata: string[];
  actions: ActionLink[];
}

export interface MetricContent {
  label: string;
  value: string;
}

export interface ProjectItem {
  name: string;
  url: string;
  description: string;
  index?: string;
  accent?: string;
  stack?: string;
  stars?: string;
}

export interface ProjectsContent {
  eyebrow: string;
  title: string;
  items: ProjectItem[];
}

export interface DetailPanel {
  title: string;
  icon?: IconName;
  body?: string;
  items: string[];
}

export interface ProfileContent {
  eyebrow: string;
  title: string;
  body: string;
  achievements: string[];
  panels: DetailPanel[];
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  body: string;
  actions: ActionLink[];
}

export interface SiteContent {
  site: SiteHeaderContent;
  hero: HeroContent;
  metrics: MetricContent[];
  projects: ProjectsContent;
  profile: ProfileContent;
  cta: CtaContent;
}
