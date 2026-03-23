import {
  IconArrowRight,
  IconBolt,
  IconBrandGithub,
  IconCode,
  IconSparkles,
  IconStarFilled,
} from "@tabler/icons-react";
import type { IconName } from "../../types/site";

export function SiteIcon({ name, size = 18 }: { name?: IconName; size?: number }) {
  if (!name) {
    return null;
  }

  switch (name) {
    case "arrowRight":
      return <IconArrowRight size={size} />;
    case "bolt":
      return <IconBolt size={size} />;
    case "code":
      return <IconCode size={size} />;
    case "github":
      return <IconBrandGithub size={size} />;
    case "sparkles":
      return <IconSparkles size={size} />;
    case "star":
      return <IconStarFilled size={size} />;
    default:
      return null;
  }
}
