import { useState } from 'react';
import { ButtonSize, cn, Project, ProjectRoles, ProjectStatus, useAuth, useProjects, VARIANT } from '@common';
import { Button, ProjectCard, ToggleButtonGroup } from '@components';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { filterBy } from './utils/filterBy';

export const Projects = () => {
  // TODO: Implement a Loading State
  const { projects } = useProjects();
  const [filter, setFilter] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const activeProjects = projects?.filter((project) => project.status === ProjectStatus.pending);
  const closedProjects = projects?.filter((project) => project.status === ProjectStatus.closed);
  const { signInWithDiscord } = useAuth();
  const user = useUserStore((state) => state.user);

  const classes = {
    tag: (role: ProjectRoles) =>
      cn('ring-1 ring-neutral-800 px-2.5', {
        'bg-gradient-to-rb from-primary-600 to-secondary-500 ': filter.includes(role)
      })
  };

  // TODO: Unificar filters

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
          isActive={isActive}
          actionButton={
            user == null
              ? signInWithDiscord
              : () => {
                  // TODO: contact with the group
                }
          }
        />
      );
    });

  const resetFilter = () => setFilter([]);
  const toggleFilterRole = (roleToToggle: string) => {
    setFilter((currentFilters) => {
      const isRoleActive = currentFilters.includes(roleToToggle);
      if (isRoleActive) {
        return currentFilters.filter((role) => role !== roleToToggle);
      } else return [...currentFilters, roleToToggle];
    });
  };

  return (
    <RootLayout>
      <main id="projects">
        <div className="container mx-auto relative z-2 w-full py-40 max-w-7xl mx-auto gap-y-16 font-dmsans text-white px-5">
          {/* TODO: Change to FIGMA element */}

          <div className="grid gap-8 text-white">
            <ToggleButtonGroup isActive={isActive} setIsActive={setIsActive} setFilter={setFilter} className="mx-auto" />
            <p className="mt-4 text-fluid-sm text-center">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor
              sit amet consectetur. Dolor sit amet.
            </p>
          </div>

          <section className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            <Button
              className="px-3 ring-1 ring-neutral-800 h-8"
              variant={VARIANT.GHOST}
              onClick={resetFilter}
              disabled={isActive === false}
            >
              <span className="i-lucide-filter block "></span>
            </Button>
            <Button
              className={classes.tag(ProjectRoles.frontEnd)}
              variant={VARIANT.GHOST}
              size={ButtonSize.sm}
              disabled={isActive === false}
              onClick={() => {
                toggleFilterRole(ProjectRoles.frontEnd);
              }}
            >
              Front-end
            </Button>
            <Button
              className={classes.tag(ProjectRoles.backEnd)}
              variant={VARIANT.GHOST}
              size={ButtonSize.sm}
              disabled={isActive === false}
              onClick={() => {
                toggleFilterRole(ProjectRoles.backEnd);
              }}
            >
              Back-end
            </Button>
            <Button
              className={classes.tag(ProjectRoles.fullStack)}
              variant={VARIANT.GHOST}
              size={ButtonSize.sm}
              disabled={isActive === false}
              onClick={() => {
                toggleFilterRole(ProjectRoles.fullStack);
              }}
            >
              Full-Stack
            </Button>
            <Button
              className={classes.tag(ProjectRoles.designer)}
              variant={VARIANT.GHOST}
              size={ButtonSize.sm}
              disabled={isActive === false}
              onClick={() => {
                toggleFilterRole(ProjectRoles.designer);
              }}
            >
              Diseñador(a)
            </Button>
          </section>

          {/* TODO: add the grid-cols arbitrary to UNOCSS config */}
          <section className="grid sm:grid-cols-[repeat(auto-fit,_minmax(390px,1fr))] gap-6 pt-12 justify-items-center">
            {isActive ? renderProjects(activeProjects) : renderProjects(closedProjects)}
          </section>
        </div>
      </main>
    </RootLayout>
  );
};
