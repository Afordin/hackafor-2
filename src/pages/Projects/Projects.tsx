import { useState } from 'react';
import { Project, ProjectStatus, TagVariant, useProjects } from '@common';
import { ProjectCard, Tag, ToggleButtonGroup } from '@components';
import { RootLayout } from '@layouts';

export const Projects = () => {
  // TODO: Implement a Loading State
  const { projects } = useProjects();
  const [isActive, setIsActive] = useState(true);
  const activeProjects = projects?.filter((project) => project.status === ProjectStatus.pending);
  const closedProjects = projects?.filter((project) => project.status === ProjectStatus.closed);

  const renderProjects = (projects: Project[] | undefined | null) =>
    projects?.map((project, index) => {
      const animateDelay = index * 0.05;
      return (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          administrator={project.administrator}
          members={project.members}
          requiredRoles={project.requiredRoles}
          status={project.status}
          className={`animate-fade-up-custom`}
          style={{ '--animate-delay': `${animateDelay}s` } as any}
        />
      );
    });

  return (
    <RootLayout>
      <main id="projects">
        <div className="container mx-auto relative z-2 w-full py-40 max-w-7xl mx-auto gap-y-16 font-dmsans text-white px-5">
          {/* TODO: Change to FIGMA element */}

          <div className="grid gap-8 text-white">
            <ToggleButtonGroup isActive={isActive} setIsActive={setIsActive} className="mx-auto" />
            <p className="mt-4 text-fluid-sm text-center">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor
              sit amet consectetur. Dolor sit amet.
            </p>
          </div>

          {/* TODO: Implement the filter */}
          <section className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            <span className="i-lucide-filter"></span>
            <Tag variant={TagVariant.neutral}>Front-end</Tag>
            <Tag variant={TagVariant.neutral}>Back-end</Tag>
            <Tag variant={TagVariant.neutral}>Full-stack</Tag>
            <Tag variant={TagVariant.neutral}>Diseñador(a)</Tag>
            <Tag variant={TagVariant.neutral}>Otros</Tag>
          </section>

          {/* TODO: add the grid-cols arbitrary to UNOCSS config */}
          <section className="grid sm:grid-cols-[repeat(auto-fit,_minmax(390px,1fr))] gap-6 pt-12">
            {isActive ? renderProjects(activeProjects) : renderProjects(closedProjects)}
          </section>
        </div>
      </main>
    </RootLayout>
  );
};
