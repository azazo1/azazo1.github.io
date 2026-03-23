import { Anchor } from "@mantine/core";
import type { SiteHeaderContent } from "../../types/site";

export function SiteHeader({ site }: { site: SiteHeaderContent }) {
  return (
    <header className="site-header">
      <span className="brand-mark">{site.brand}</span>
      <Anchor href={site.navHref} target="_blank" rel="noreferrer" className="header-link">
        {site.navLabel}
      </Anchor>
    </header>
  );
}
