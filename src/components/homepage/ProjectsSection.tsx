import { Fragment } from "react";
import { Divider, Text, Title } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";
import { SiteIcon } from "./SiteIcon";
import type { ProjectItem, ProjectsContent } from "../../types/site";

export function ProjectsSection({ projects }: { projects: ProjectsContent }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <Text className="eyebrow">{projects.eyebrow}</Text>
        <Title order={2} className="section-title">
          {projects.title}
        </Title>
      </div>
      <div className="project-list">
        {projects.items.map((project, index) => (
          <ProjectRow key={project.url} project={project} order={index + 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, order }: { project: ProjectItem; order: number }) {
  const reducedMotion = useReducedMotion();
  const tags = [project.accent, project.stack].filter(Boolean) as string[];
  const displayIndex = project.index ?? String(order).padStart(2, "0");

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="project-row"
      whileHover={reducedMotion ? undefined : { x: 8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="project-index">{displayIndex}</div>
      <div className="project-main">
        {tags.length > 0 && (
          <div className="project-topline">
            {tags.map((tag, index) => (
              <Fragment key={`${project.name}-${tag}`}>
                {index > 0 && <Divider orientation="vertical" mx={10} />}
                <span>{tag}</span>
              </Fragment>
            ))}
          </div>
        )}
        <Title order={3} className="project-title">
          {project.name}
        </Title>
        <Text className="project-description">{project.description}</Text>
      </div>
      <div className="project-meta">
        {project.stars && (
          <span className="project-stars">
            <SiteIcon name="star" size={14} />
            {project.stars}
          </span>
        )}
        <SiteIcon name="arrowRight" size={18} />
      </div>
    </motion.a>
  );
}
