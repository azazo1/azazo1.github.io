import { Group, Stack, Text, Title } from "@mantine/core";
import { ActionButton } from "./ActionButton";
import type { CtaContent } from "../../types/site";

export function CtaSection({ cta }: { cta: CtaContent }) {
  return (
    <section className="section-block footer-cta">
      <Stack gap="md">
        <Text className="eyebrow">{cta.eyebrow}</Text>
        <Title order={2} className="cta-title">
          {cta.title}
        </Title>
        <Text className="detail-copy cta-copy">{cta.body}</Text>
      </Stack>

      {cta.actions.length > 0 && (
        <Group className="cta-actions">
          {cta.actions.map((action) => (
            <ActionButton key={`${action.label}-${action.href}`} action={action} />
          ))}
        </Group>
      )}
    </section>
  );
}
