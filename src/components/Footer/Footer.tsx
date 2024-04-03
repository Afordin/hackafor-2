import { cn, ROUTE } from '@common';
import { Link } from 'react-router-dom';

interface SocialIcon {
  icon: JSX.Element;
  url: string;
}

const socialIcons: SocialIcon[] = [
  { icon: <span className="i-bi-discord hover:text-[#5864F2]" />, url: 'https://discord.com/invite/ke48ZgXcdU' },
  { icon: <span className="i-bi-twitch hover:text-[#A96FFF]" />, url: 'https://www.twitch.tv/afor_digital' },
  {
    icon: <span className="i-bi-instagram hover:text-warmGray" />,
    url: 'https://www.instagram.com/afor_digital'
  },
  { icon: <span className="i-bi-github hover:text-gray-7" />, url: 'https://github.com/Afordin' },
  {
    icon: <span className="i-bi-twitter-x hover:text-gray-8" />,
    url: 'https://twitter.com/afor_digital'
  }
];

export const Footer = () => {
  const classes = {
    container: cn('text-cWhite bg-gradient-to-r from-[#19101D] to-[#0D0D0E] py-5 w-full font-dmsans'),
    innerContainer: cn('max-w-7xl w-full mx-auto text-center mb-10 flex flex-col justify-between items-center'),
    socialIcon: cn('inline-flex transition-all duration-300'),
    copyRight: cn('text-sm mt-5 absolute inset-x-0 bottom-2')
  };

  const renderSocialIcons = () =>
    socialIcons.map((socialIcon, index) => (
      <a
        key={index}
        href={socialIcon.url}
        className={classes.socialIcon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Link to ${socialIcon.url}`}
      >
        {socialIcon.icon}
      </a>
    ));

  return (
    <footer className={classes.container}>
      <div className={classes.innerContainer}>
        {/* Social Sections */}
        <section aria-labelledby="event-info-heading" className="flex items-center">
          <Link to={ROUTE.home} className="cursor-pointer hover:opacity-85" aria-label="Volver al inicio">
            <img src="images/logo.webp" className="w-15 h-15" alt="Event Logo" aria-label="Event Logo Hackafor 2024" />
          </Link>

          <div className="ml-3 flex flex-col gap-y-3">
            <h4 id="event-info-heading" className="text-sm">
              Más información del evento
            </h4>
            <nav aria-label="Social media links" className="flex gap-x-5 text-2xl">
              {renderSocialIcons()}
            </nav>
          </div>
        </section>

        {/* Copyrights */}
        <div className={classes.copyRight}>© 2024 Designed by Ana Rangel Developed by aforcita</div>
      </div>
    </footer>
  );
};
