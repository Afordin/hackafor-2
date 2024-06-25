import { HTMLAttributes } from 'react';
import { cn, groupParticipantsByRole, Project } from '@common';
import { Button, CardWrapper, Popover, Tag } from '@components';

interface ProjectCardProps extends Omit<Project, 'id' | 'createdAt' | 'repositoryUrl'>, HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Specifies if the card is active
   */
  isActive?: boolean;

  /**
   * Button title.
   */
  buttonTitle: string;

  /**
   * Function to call on button click.
   */
  actionButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ProjectCard = ({
  actionButton,
  buttonTitle,
  className,
  name,
  description,
  administrator,
  members,
  requiredRoles,
  isActive,
  ...restOfProps
}: ProjectCardProps) => {
  const classes = {
    container: cn('grid gap-8 max-w-md w-full max-xl:mx-auto', className),
    subTitle: cn('text-4 font-bold'),
    list: cn('flex flex-wrap gap-4 mt-4 text-3.5'),
    popoverTrigger: cn(
      'bg-gradient-to-rb from-primary-600 to-secondary-500 w-5 h-5 rounded-full text-xs flex items-center justify-center cursor-pointer select-none'
    ),
    adminBadge: cn('text-xs bg-gradient-to-rb from-primary-600 to-secondary-500 text-transparent bg-clip-text rounded-full')
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
        <li className="text-cWhite capitalize px-1 py-0.5 flex items-center gap-1.5" key={participant.name + idx}>
          {participant.name}
          {isAdmin && <span className={classes.adminBadge}>{'(admin)'}</span>}
        </li>
      );
    });

    return (
      <li key={role + idx}>
        {/** TODO: change key later 😒 Why later?*/}
        <Tag className="relative capitalize">
          <span>{role}</span>
          <div className="absolute -right-2 -top-2">
            <Popover content={<ul>{participantList}</ul>}>
              <span className={classes.popoverTrigger}>{groupLength}</span>
            </Popover>
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
      {isActive && (
        <>
          <section aria-labelledby="roles-title">
            <h4 id="roles-title" className={classes.subTitle}>
              Estamos buscando
            </h4>
            <ul className={classes.list}>{renderRequiredRolesTag()}</ul>
          </section>
          <footer className="mx-auto">
            <Button onClick={actionButton}>{buttonTitle}</Button>
          </footer>
        </>
      )}
    </CardWrapper>
  );
};
