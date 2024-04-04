import { useEffect, useState } from 'react';
import { TagVariant } from '@common';
import { ProjectCard, Tag, ToggleButtonGroup } from '@components';
import { RootLayout } from '@layouts';
import { createClient } from '@supabase/supabase-js';
import { Project, ProjectStatus } from './types';

// TODO: Implement a controller to fetch projects
const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_API_KEY);

export const fetchProjects = () => {
  return supabase.from('Project').select();
};

export const Projects = () => {
  const [isActive, setIsActive] = useState(true);
  const [projects, setProjects] = useState<Project[] | null>([]);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data.data);
    });
  }, []);

  const activeProjects = projects?.filter((project) => project.status === ProjectStatus.PENDING);
  const closedProjects = projects?.filter((project) => project.status === ProjectStatus.CLOSED);

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
          required_roles={project.required_roles}
          status={project.status}
          className={`animate-fade-up-custom`}
          style={{ '--animate-delay': `${animateDelay}s` } as any}
        />
      );
    });

  return (
    <RootLayout>
      <main>
        {/* TODO: Change to FIGMA element */}
        <section id="projects" className="relative z-2 w-full py-40 max-w-7xl mx-auto gap-y-16 font-dmsans text-white px-5">
          <div className="grid gap-8 text-white">
            <ToggleButtonGroup isActive={isActive} setIsActive={setIsActive} className="mx-auto" />
            <p className="mt-4 text-fluid-sm text-center">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor
              sit amet consectetur. Dolor sit amet.
            </p>
          </div>

          {/* TODO: Implement the filter */}
          <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            <span className="i-lucide-filter"></span>
            <Tag variant={TagVariant.neutral}>Front-end</Tag>
            <Tag variant={TagVariant.neutral}>Back-end</Tag>
            <Tag variant={TagVariant.neutral}>Full-stack</Tag>
            <Tag variant={TagVariant.neutral}>Diseñador(a)</Tag>
            <Tag variant={TagVariant.neutral}>Otros</Tag>
          </div>

          {/* TODO: add the grid-cols arbitrary to UNOCSS config */}
          <article className="grid sm:grid-cols-[repeat(auto-fit,_minmax(390px,1fr))] gap-6 pt-12">
            {isActive ? renderProjects(activeProjects) : renderProjects(closedProjects)}
          </article>
        </section>
      </main>
    </RootLayout>
  );
};
