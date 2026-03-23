import { Group, List, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import { SiteIcon } from "./SiteIcon";
import type { DetailPanel, ProfileContent } from "../../types/site";

export function ProfileSection({ profile }: { profile: ProfileContent }) {
  return (
    <section className="section-block detail-grid">
      <div className="detail-column">
        <Text className="eyebrow">{profile.eyebrow}</Text>
        <Title order={2} className="section-title">
          {profile.title}
        </Title>
        <Text className="detail-copy">{profile.body}</Text>
        {profile.achievements.length > 0 && (
          <Group className="achievement-list">
            {profile.achievements.map((item) => (
              <span key={item} className="achievement-pill">
                {item}
              </span>
            ))}
          </Group>
        )}
      </div>

      <div className="detail-column">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {profile.panels.map((panel) => (
            <DetailPanelCard key={panel.title} panel={panel} />
          ))}
        </SimpleGrid>
      </div>
    </section>
  );
}

function DetailPanelCard({ panel }: { panel: DetailPanel }) {
  return (
    <div className="detail-panel">
      {panel.icon && (
        <ThemeIcon size={44} radius="xl" variant="light" color="cyan">
          <SiteIcon name={panel.icon} size={24} />
        </ThemeIcon>
      )}
      <Title order={3} className="detail-title">
        {panel.title}
      </Title>
      {panel.body && <Text className="detail-copy">{panel.body}</Text>}
      {panel.items.length > 0 && (
        <List spacing="sm" className="note-list">
          {panel.items.map((item) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
