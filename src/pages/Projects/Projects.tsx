import { useState } from 'react';
import { Project, ProjectStatus, TagVariant, useProjects, VARIANT } from '@common';
import { Button, ProjectCard, Tag, ToggleButtonGroup } from '@components';
import { RootLayout } from '@layouts';

export const Projects = () => {
  // TODO: Implement a Loading State
  const { projects } = useProjects();
  const [isActive, setIsActive] = useState(true);
  const activeProjects = projects?.filter((project) => project.status === ProjectStatus.pending);
  const closedProjects = projects?.filter((project) => project.status === ProjectStatus.closed);

  console.log(activeProjects);

  const [filter, setFilter] = useState<string[]>([]);

  // TODO: Unificar filters

  const filterBy = (projects: Project[], roles: string[]) => {
    if (roles?.length === 0) return projects;
    return projects.filter((project) => roles?.some((role) => project.requiredRoles[role] > 0));
  };

  const renderProjects = (projects: Project[] | undefined | null) =>
    filterBy(projects ?? [], filter).map((project, index) => {
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

  const updateFilter = (updatedRole: string) => {
    setFilter((prev) => (prev.includes(updatedRole) ? prev.filter((role) => role !== updatedRole) : [...prev, updatedRole]));
  };

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
          <section className="flex items-center justify-center gap-x-4 mt-12 flex-wrap">
            <span className="i-lucide-filter"></span>
            <Button
              variant={VARIANT.GHOST}
              onClick={() => {
                updateFilter('front-end');
              }}
              //TODO: Update strings with constants
              className={`p-0 ${filter.includes('front-end') ? 'p-2 bg-red' : ''} `}
            >
              {/* // TODO: Add hover to tag */}
              <Tag variant={TagVariant.neutral}>Front-end</Tag>
            </Button>
            <Button
              variant={VARIANT.GHOST}
              onClick={() => {
                updateFilter('back-end');
              }}
              className={`p-0 ${filter.includes('back-end') ? 'p-2 bg-red' : ''} `}
            >
              <Tag variant={TagVariant.neutral}>Back-end</Tag>
            </Button>
            <Button
              variant={VARIANT.GHOST}
              onClick={() => {
                updateFilter('full-stack');
              }}
              className={`p-0 ${filter.includes('full-stack') ? 'p-2 bg-red' : ''} `}
            >
              <Tag variant={TagVariant.neutral}>Full-Stack</Tag>
            </Button>
            <Button
              variant={VARIANT.GHOST}
              onClick={() => {
                updateFilter('designer');
              }}
              className={`p-0 ${filter.includes('designer') ? 'p-2 bg-red' : ''} `}
            >
              <Tag variant={TagVariant.neutral}>Diseñador(a)</Tag>
            </Button>
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
