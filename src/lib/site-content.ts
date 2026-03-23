import { parse } from "smol-toml";
import rawSiteContent from "../content/site.toml?raw";
import type {
  ActionLink,
  ButtonVariant,
  CtaContent,
  DetailPanel,
  HeroContent,
  IconName,
  MetricContent,
  ProfileContent,
  ProjectItem,
  ProjectsContent,
  SiteContent,
  SiteHeaderContent,
} from "../types/site";

type Table = Record<string, unknown>;

const iconNames = ["arrowRight", "bolt", "code", "github", "sparkles", "star"] as const;
const buttonVariants = ["primary", "ghost"] as const;

export const siteContent = parseSiteContent(parse(rawSiteContent));

function parseSiteContent(value: unknown): SiteContent {
  const root = asTable(value, "root");

  return {
    site: parseSiteHeader(root.site),
    hero: parseHero(root.hero),
    metrics: parseMetrics(root.metrics),
    projects: parseProjects(root.projects),
    profile: parseProfile(root.profile),
    cta: parseCta(root.cta),
  };
}

function parseSiteHeader(value: unknown): SiteHeaderContent {
  const table = asTable(value, "site");

  return {
    brand: asString(table.brand, "site.brand"),
    navLabel: asString(table.navLabel, "site.navLabel"),
    navHref: asString(table.navHref, "site.navHref"),
  };
}

function parseHero(value: unknown): HeroContent {
  const table = asTable(value, "hero");

  return {
    eyebrow: asString(table.eyebrow, "hero.eyebrow"),
    titlePrimary: asString(table.titlePrimary, "hero.titlePrimary"),
    titleSecondary: asString(table.titleSecondary, "hero.titleSecondary"),
    body: asString(table.body, "hero.body"),
    avatarSrc: asString(table.avatarSrc, "hero.avatarSrc"),
    avatarAlt: asOptionalString(table.avatarAlt, "hero.avatarAlt"),
    metadata: asDisplayStringArray(table.metadata, "hero.metadata"),
    actions: asTableArray(table.actions, "hero.actions").map((item, index) =>
      parseAction(item, `hero.actions[${index}]`),
    ),
  };
}

function parseMetrics(value: unknown): MetricContent[] {
  return asTableArray(value, "metrics").map((item, index) => ({
    label: asString(item.label, `metrics[${index}].label`),
    value: asDisplayString(item.value, `metrics[${index}].value`),
  }));
}

function parseProjects(value: unknown): ProjectsContent {
  const table = asTable(value, "projects");

  return {
    eyebrow: asString(table.eyebrow, "projects.eyebrow"),
    title: asString(table.title, "projects.title"),
    items: asTableArray(table.items, "projects.items").map((item, index) =>
      parseProject(item, `projects.items[${index}]`),
    ),
  };
}

function parseProject(value: Table, path: string): ProjectItem {
  return {
    name: asString(value.name, `${path}.name`),
    url: asString(value.url, `${path}.url`),
    description: asString(value.description, `${path}.description`),
    index: asOptionalDisplayString(value.index, `${path}.index`),
    accent: asOptionalString(value.accent, `${path}.accent`),
    stack: asOptionalString(value.stack, `${path}.stack`),
    stars: asOptionalDisplayString(value.stars, `${path}.stars`),
  };
}

function parseProfile(value: unknown): ProfileContent {
  const table = asTable(value, "profile");

  return {
    eyebrow: asString(table.eyebrow, "profile.eyebrow"),
    title: asString(table.title, "profile.title"),
    body: asString(table.body, "profile.body"),
    achievements: asStringArray(table.achievements, "profile.achievements"),
    panels: asTableArray(table.panels, "profile.panels").map((item, index) =>
      parseDetailPanel(item, `profile.panels[${index}]`),
    ),
  };
}

function parseDetailPanel(value: Table, path: string): DetailPanel {
  const body = asOptionalString(value.body, `${path}.body`);
  const items = value.items === undefined ? [] : asStringArray(value.items, `${path}.items`);

  if (!body && items.length === 0) {
    throw new Error(`[site.toml] ${path} must define either body or items.`);
  }

  return {
    title: asString(value.title, `${path}.title`),
    icon: asOptionalIconName(value.icon, `${path}.icon`),
    body,
    items,
  };
}

function parseCta(value: unknown): CtaContent {
  const table = asTable(value, "cta");

  return {
    eyebrow: asString(table.eyebrow, "cta.eyebrow"),
    title: asString(table.title, "cta.title"),
    body: asString(table.body, "cta.body"),
    actions: asTableArray(table.actions, "cta.actions").map((item, index) =>
      parseAction(item, `cta.actions[${index}]`),
    ),
  };
}

function parseAction(value: Table, path: string): ActionLink {
  return {
    label: asString(value.label, `${path}.label`),
    href: asString(value.href, `${path}.href`),
    variant: asButtonVariant(value.variant, `${path}.variant`),
    icon: asOptionalIconName(value.icon, `${path}.icon`),
  };
}

function asTable(value: unknown, path: string): Table {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`[site.toml] Expected a table at ${path}.`);
  }

  return value as Table;
}

function asTableArray(value: unknown, path: string): Table[] {
  if (!Array.isArray(value)) {
    throw new Error(`[site.toml] Expected an array of tables at ${path}.`);
  }

  return value.map((item, index) => asTable(item, `${path}[${index}]`));
}

function asString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[site.toml] Expected a non-empty string at ${path}.`);
  }

  return value;
}

function asOptionalString(value: unknown, path: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return asString(value, path);
}

function asDisplayString(value: unknown, path: string): string {
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }

  if (typeof value === "number" || typeof value === "bigint") {
    return String(value);
  }

  throw new Error(`[site.toml] Expected a string or number at ${path}.`);
}

function asOptionalDisplayString(value: unknown, path: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return asDisplayString(value, path);
}

function asStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`[site.toml] Expected an array of strings at ${path}.`);
  }

  return value.map((item, index) => asString(item, `${path}[${index}]`));
}

function asDisplayStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`[site.toml] Expected an array at ${path}.`);
  }

  return value.map((item, index) => asDisplayString(item, `${path}[${index}]`));
}

function asButtonVariant(value: unknown, path: string): ButtonVariant {
  const variant = asString(value, path);

  if ((buttonVariants as readonly string[]).includes(variant)) {
    return variant as ButtonVariant;
  }

  throw new Error(
    `[site.toml] Invalid button variant at ${path}. Expected one of: ${buttonVariants.join(", ")}.`,
  );
}

function asOptionalIconName(value: unknown, path: string): IconName | undefined {
  if (value === undefined) {
    return undefined;
  }

  const iconName = asString(value, path);

  if ((iconNames as readonly string[]).includes(iconName)) {
    return iconName as IconName;
  }

  throw new Error(`[site.toml] Invalid icon name at ${path}. Expected one of: ${iconNames.join(", ")}.`);
}
