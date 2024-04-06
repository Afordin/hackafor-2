import { HTMLAttributes } from 'react';
import { cn, Project } from '@common';
import { Button, CardWrapper, Tag } from '@components';
import { useUserStore } from '@store';

interface ProjectCardProps extends Omit<Project, 'id' | 'createdAt' | 'repositoryUrl'>, HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Specify if the project is active
   */
  isActive: boolean;
}

export const ProjectCard = ({
  isActive,
  className,
  name,
  description,
  administrator,
  members,
  requiredRoles,
  ...restOfProps
}: ProjectCardProps) => {
  const classes = {
    container: cn('grid gap-8 max-w-md w-full max-xl:mx-auto', className),
    subTitle: cn('text-4 font-bold'),
    list: cn('flex flex-wrap gap-x-4 gap-y-2 mt-2 text-3.5')
  };

  const handleDescription = () => {
    if (description.length > 210) return `${description.slice(0, 210)}...`;
    return description;
  };
  const renderParticipantsTag = () => {
    return members.map((member) => {
      if (member.role === undefined) return null;
      return (
        <li key={member.name}>
          <Tag className="capitalize">{member.role}</Tag>
        </li>
      );
    });
  };

  const user = useUserStore((state) => state.user);

  /* TODO: Filtrar si está buscando antes del texto */
  const renderRequiredRolesTag = () => {
    return Object.entries(requiredRoles)
      .filter(([, quantity]) => quantity > 0)
      .map(([role]) => (
        <li key={role}>
          <Tag className="capitalize">{role}</Tag>
        </li>
      ));
  };

  return (
    <CardWrapper {...restOfProps} className={classes.container}>
      {/*  Header */}
      <header className="grid gap-4">
        <h3 className="font-bold text-8">{name}</h3>
        <p className="text-4 h-24 text-balance ">{handleDescription()}</p>
      </header>

      {/* Participants Section */}
      <section aria-labelledby="participants-title" className="py-4">
        <h4 id="participants-title" className={classes.subTitle}>
          Participantes
        </h4>
        <ul className={classes.list}>
          <li>
            <Tag className="capitalize">{administrator.role}</Tag>
          </li>
          {renderParticipantsTag()}
        </ul>
      </section>

      {isActive && (
        <>
          <section aria-labelledby="roles-title">
            <h4 id="roles-title" className={classes.subTitle}>
              Estamos buscando
            </h4>
            <ul className={classes.list}>{renderRequiredRolesTag()}</ul>
          </section>
          {user && (
            <footer className="mx-auto">
              <Button>Contactar</Button>
            </footer>
          )}
        </>
      )}
    </CardWrapper>
  );
};
