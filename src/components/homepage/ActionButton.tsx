import { Button } from "@mantine/core";
import { SiteIcon } from "./SiteIcon";
import type { ActionLink } from "../../types/site";

export function ActionButton({ action }: { action: ActionLink }) {
  return (
    <Button
      component="a"
      href={action.href}
      target="_blank"
      rel="noreferrer"
      size="lg"
      radius="xl"
      variant={action.variant === "primary" ? "filled" : "subtle"}
      className={action.variant === "primary" ? "primary-button" : "ghost-button"}
      rightSection={<SiteIcon name={action.icon} size={18} />}
    >
      {action.label}
    </Button>
  );
}
