import { useEffect, useState } from 'react';
import { cn, ROUTE, VARIANT } from '@common';
import { BurgerButton, Button, type Contributor } from '@components';
import { Link } from 'react-router-dom';

interface NavProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const Nav = ({ className }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contributors, setContributors] = useState<Array<Contributor>>([]);

  const classes = {
    container: cn(
      'h-20 relative',
      'bg-cBackground/80 backdrop-blur-lg',
      'md:absolute md:top-6 z-20 md:inset-x-0',
      'md:bg-cBackground text-cGray',
      'md:max-w-7xl mx-auto px-6 py-2',
      'flex items-center gap-6',
      'border-b',
      'md:border-[0.2px] border-cBorder md:rounded-full',
      'w-full md:w-fit mx-auto h-fit',
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
      'py-5 px-6 md:py-0 md:px-0',
      'flex flex-col gap-6',
      'md:flex-row md:items-center',
      'bg-cBackground/80 backdrop-blur-lg md:bg-transparent md:backdrop-blur-0',
      'max-md:w-[100svw] max-md:h-[100svh]'
    ),
    listItem: cn('cursor-pointer hover:text-white transition-colors w-fit'),
    dots: cn('hidden md:block', 'h-1 w-1', 'cursor-pointer select-none cursor-default', 'bg-cGray rounded-full')
  };

  // TODO: Move this fetch to a hook
  useEffect(() => {
    fetch('https://api.github.com/repos/Afordin/hackafor-2/contributors')
      .then((response) => response.json())
      .then((data) => {
        const contributorsData: Contributor[] = data.map((contributor: any) => {
          return {
            username: contributor.login,
            avatarUrl: contributor.avatar_url
          };
        });
        contributorsData.sort((a, b) => a.username.localeCompare(b.username));
        setContributors(contributorsData);
      })
      .catch((error) => console.error('Error fetching contributors:', error));
  }, []);

  // TODO: Implement a lock when isOpen on Mobile

  const renderContributors = () =>
    contributors.map((contributor) => (
      <a href={`https://github.com/${contributor.username}`} key={contributor.username} target="_blank" className="contributor">
        <img
          key={contributor.username}
          src={contributor.avatarUrl}
          className="rounded-full mr-[-10px] overflow-auto"
          alt={contributor.username}
        />
      </a>
    ));

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <header className={classes.container}>
      <Link to={ROUTE.home} className="w-10 h-10">
        {/* TODO: Create a component Icon to work with this SVG */}
        <svg
          width="36"
          height="33"
          viewBox="0 0 36 33"
          className="fill-white hover:fill-cGray transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.3986 19.7013H33.9984C34.8783 19.7013 35.5982 20.4212 35.5982 21.3011V26.1007C35.5982 26.9806 34.8783 27.7005 33.9984 27.7005H32.3986V29.3003C32.3986 31.0761 30.9747 32.5 29.1989 32.5H6.8012C5.95259 32.5 5.13874 32.1629 4.53869 31.5628C3.93863 30.9628 3.60153 30.1489 3.60153 29.3003V27.7005H2.00169C1.12178 27.7005 0.401855 26.9806 0.401855 26.1007V21.3011C0.401855 20.4212 1.12178 19.7013 2.00169 19.7013H3.60153C3.60153 13.5099 8.60901 8.50246 14.8004 8.50246H16.4002V6.47067C15.4403 5.92672 14.8004 4.88683 14.8004 3.70295C14.7998 3.14115 14.9472 2.58911 15.2276 2.10232C15.5081 1.61554 15.9118 1.21118 16.3981 0.929906C16.8844 0.648633 17.4362 0.500361 17.998 0.500001C18.5598 0.499641 19.1118 0.647205 19.5985 0.927855C20.0851 1.2085 20.4893 1.61235 20.7704 2.09877C21.0515 2.58519 21.1996 3.13705 21.1997 3.69885C21.1999 4.26065 21.0521 4.81258 20.7713 5.29915C20.4904 5.78572 20.0864 6.18977 19.5999 6.47067V8.50246H21.1997C27.3911 8.50246 32.3986 13.5099 32.3986 19.7013ZM12.6886 25.8767L14.5764 23.9889L12.6886 22.1011L14.5764 20.2133L12.6886 18.3255L10.8008 20.2133L8.91298 18.3255L7.02518 20.2133L8.91298 22.1011L7.02518 23.9889L8.91298 25.8767L10.8008 23.9889L12.6886 25.8767ZM27.5516 23.189L28.7195 22.0211C29.3594 21.3811 29.3594 20.3252 28.7195 19.7013C28.0635 19.0294 27.0236 19.0294 26.3677 19.7013L25.1998 20.8532L24.0319 19.7013C23.376 19.0294 22.3361 19.0294 21.6802 19.7013C21.0402 20.3252 21.0402 21.3811 21.6802 22.0211L25.1998 25.5407L27.5516 23.189Z"
          />
        </svg>
      </Link>

      {/* Navigation Section */}
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Link to={ROUTE.home}>Inicio</Link>
          </li>
          <li>
            <span className={classes.dots}></span>
          </li>

          <li className={classes.listItem}>
            <Link to={ROUTE.projects}>Proyectos</Link>
          </li>
          <li>
            <span className={classes.dots}></span>
          </li>

          <li className={classes.listItem}>
            <Link to={ROUTE.registration}>Registro</Link>
          </li>

          <li>
            <span className={classes.dots}></span>
          </li>

          <li>
            <Button
              onClick={() => {
                console.log('has clickado');
              }}
              variant={VARIANT.SECONDARY}
              hasBorder
            >
              Accede con Discord
            </Button>
          </li>

          {/* Contributor Section */}
          <li className="md:hidden absolute inset-x-0 bottom-40">
            <div className="contributors overflow-x-scroll">{renderContributors()}</div>
            <p className="px-4 text-cWhite text-lg">Quienes han contribuido en el desarrollo</p>
          </li>
        </ul>
      </nav>

      <BurgerButton isOpen={isOpen} onClick={handleClick} className="md:hidden" />
    </header>
  );
};
