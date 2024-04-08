import { useState } from 'react';
import { AvatarSize, ButtonSize, cn, ROUTE, useAuth, useBreakpoint, useContributors, useNavAnimation, Variant } from '@common';
import { Avatar, BurgerButton, Button, Logo } from '@components';
import { useUserStore } from '@store';
import { Link, NavLink } from 'react-router-dom';

interface NavProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const Nav = ({ className }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { contributors, isLoading } = useContributors();
  const { isMobile } = useBreakpoint();
  const { signInWithDiscord } = useAuth();
  const { isAtTop, isHidden } = useNavAnimation();
  const user = useUserStore((state) => state.user);
  const handleButtonSize = isMobile ? ButtonSize.xl : ButtonSize.base;
  const handleAvatarSize = isMobile ? AvatarSize.md : AvatarSize.sm;

  const classes = {
    container: cn(
      'h-20 fixed',
      'bg-neutral-950 md:bg-cBackground',
      'md:fixed md:top-6 z-20 md:inset-x-0',
      'text-gray-400',
      'md:max-w-7xl mx-auto px-6 py-2',
      'flex items-center gap-6',
      'border-b',
      'md:border-[0.2px] border-cBorder md:rounded-full',
      'w-full md:w-fit mx-auto h-fit',
      'transition-all ease-in-out duration-300',
      !isAtTop && isHidden && '-translate-y-full opacity-0',
      className
    ),
    nav: cn(
      'text-[28px] md:text-base font-dmsans',
      'absolute max-md:right-0 max-md:top-14',
      'md:relative',
      'transition z-10 ease-in-out duration-300',
      {
        'max-md:translate-y-[-300%] max-md:opacity-0': !isOpen,
        'max-md:translate-y-0 max-md:opacity-100': isOpen
      }
    ),
    list: cn(
      'py-5 px-6 md:py-0 md:px-0 backdrop-blur-2xl',
      'flex flex-col gap-6 font-bold',
      'md:flex-row md:items-center',
      'bg-cBackground/80 backdrop-blur-lg md:bg-transparent md:backdrop-filter-none',
      'max-md:w-[100svw] max-md:h-[100svh]'
    ),
    listItem: (isActive: boolean) =>
      cn('cursor-pointer hover:text-white transition-all ease-in-out duration-300 w-fit', {
        'bg-gradient-to-rb from-primary-600 to-secondary-500 text-transparent bg-clip-text': isActive
      }),
    dots: cn('hidden md:block', 'h-1 w-1', 'cursor-pointer select-none cursor-default', 'bg-cGray rounded-full')
  };

  // TODO: Implement a lock when isOpen on Mobile

  const renderContributors = () =>
    contributors.map((contributor) => (
      <a
        href={`https://github.com/${contributor.username}`}
        key={contributor.username}
        className="contributor"
        aria-label={`Contributor: ${contributor.username}`}
      >
        {isLoading ? (
          <div className="w-12 h-12 bg-cGray" />
        ) : (
          <img
            key={contributor.username}
            src={contributor.avatarUrl}
            className="rounded-full mr-[-10px] overflow-auto"
            alt={contributor.username}
          />
        )}
      </a>
    ));

  const handleClick = () => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    }
    setIsOpen(!isOpen);
  };

  return (
    <header className={classes.container}>
      <Link to={ROUTE.home} className="w-10 h-10" aria-label="Volver al inicio">
        <Logo width={36} height={33} />
      </Link>

      {/* Navigation Section */}
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink className={({ isActive }) => classes.listItem(isActive)} to={ROUTE.home}>
              Inicio
            </NavLink>
          </li>
          <li>
            <span className={classes.dots}></span>
          </li>

          <li>
            <NavLink to={ROUTE.projects} className={({ isActive }) => classes.listItem(isActive)}>
              Proyectos
            </NavLink>
          </li>
          <li>
            <span className={classes.dots}></span>
          </li>

          <li>
            <NavLink to={ROUTE.registration} className={({ isActive }) => classes.listItem(isActive)}>
              Registro
            </NavLink>
          </li>

          <li>
            <span className={classes.dots}></span>
          </li>

          <li>
            {user ? (
              <Avatar avatar={user.user_metadata.avatar_url} size={handleAvatarSize} />
            ) : (
              <Button
                onClick={() => {
                  signInWithDiscord();
                }}
                variant={Variant.secondary}
                hasBorder
                size={handleButtonSize}
              >
                Accede con Discord
              </Button>
            )}
          </li>

          {/* Contributor Section */}
          <li className="md:hidden mt-auto mb-8">
            <p className="px-4 text-cWhite text-lg text-center">Quienes han contribuido en el desarrollo</p>
            <div className="contributors overflow-x-scroll" style={{ '--contributor-count': 6 } as any}>
              {renderContributors()}
            </div>
          </li>
        </ul>
      </nav>

      <BurgerButton isOpen={isOpen} onClick={handleClick} className="md:hidden" />
    </header>
  );
};
