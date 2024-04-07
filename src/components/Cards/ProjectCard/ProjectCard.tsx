import { HTMLAttributes } from 'react';
import { cn, groupParticipantsByRole, Project } from '@common';
import { Button, CardWrapper, Popover, PopoverContent, PopoverTrigger, Tag } from '@components';

interface ProjectCardProps extends Omit<Project, 'id' | 'createdAt' | 'repositoryUrl'>, HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const ProjectCard = ({ className, name, description, administrator, members, requiredRoles, ...restOfProps }: ProjectCardProps) => {
  const classes = {
    container: cn('grid gap-8 max-w-md w-full max-xl:mx-auto', className),
    subTitle: cn('text-4 font-bold'),
    list: cn('flex flex-wrap gap-4 mt-4 text-3.5')
  };

  const popoverclasses = {
    trigger: cn('bg-secondary-600 w-5 h-5 rounded-full text-xs flex items-center justify-center cursor-pointer'),
    ulContainer: cn('border border-pBorder p-2 rounded-md text-sm bg-secondary-950/50 backdrop-blur-md'),
    liElement: cn('text-cWhite capitalize px-1 py-0.5 flex gap-1'),
    admin: cn('text-secondary-600')
  };
  const handleDescription = () => {
    if (description.length > 175) return `${description.slice(0, 130)}...`;
    return description;
  };

  /**
   * Concat the admin and parse the Array of members
   */
  const participantsByRole = groupParticipantsByRole(members, administrator);

  const renderParticipantsTag = Object.keys(participantsByRole).map((role, idx) => {
    const groupLength = participantsByRole[role].length;

    const participantList = participantsByRole[role].map((participant, idx) => {
      const isAdmin = Object.values(administrator).includes(participant.name);
      return (
        <li className={popoverclasses.liElement} key={participant.name + idx}>
          {participant.name} <span className={popoverclasses.admin}>{isAdmin && '(Admin)'}</span>
        </li>
      );
    });

    const popOver = () => {
      return (
        <Popover placement="bottom">
          <PopoverTrigger asChild={true}>
            <span className={popoverclasses.trigger}>{groupLength}</span>
          </PopoverTrigger>
          <PopoverContent role="tooltip" className="z-10">
            <ul className={popoverclasses.ulContainer}>{participantList}</ul>
          </PopoverContent>
        </Popover>
      );
    };

    return (
      <li key={role + idx}>
        {/** TODO: change key later */}
        <Tag>
          <div className="flex items-center gap-2">
            {role}
            {popOver()}
          </div>
        </Tag>
      </li>
    );
  });

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
        <p className="text-4 h-24 text-balance truncate">{handleDescription()}</p>
      </header>

      {/* Participants Section */}
      <section aria-labelledby="participants-title">
        <h4 id="participants-title" className={classes.subTitle}>
          Participantes
        </h4>
        <ul className={classes.list}>{renderParticipantsTag}</ul>
      </section>

      {/* Roles Section */}
      <section aria-labelledby="roles-title">
        <h4 id="roles-title" className={classes.subTitle}>
          Estamos buscando
        </h4>
        <ul className={classes.list}>{renderRequiredRolesTag()}</ul>
      </section>

      <footer className="mx-auto">
        <Button>Contactar</Button>
      </footer>
    </CardWrapper>
  );
};
