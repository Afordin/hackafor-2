import { cn, useContributors } from '@common';

interface SocialIcon {
  icon: JSX.Element;
  url: string;
}

const socialIcons: SocialIcon[] = [
  { icon: <span className="i-bi-discord" />, url: 'https://discord.com/invite/ke48ZgXcdU' },
  { icon: <span className="i-bi-twitch" />, url: 'https://www.twitch.tv/afor_digital' },
  { icon: <span className="i-bi-instagram" />, url: 'https://www.instagram.com/afor_digital' },
  { icon: <span className="i-bi-github" />, url: 'https://github.com/Afordin' },
  { icon: <span className="i-bi-twitter-x" />, url: 'https://twitter.com/afor_digital' }
];

export const Footer = () => {
  const { contributors, isLoading } = useContributors();
  const classes = {
    container: cn('text-cWhite bg-gradient-to-r from-[#19101D] to-[#0D0D0E] py-5 w-full font-dmsans'),
    innerContainer: cn(
      'max-w-7xl w-full mx-auto text-center px-5 container relative pb-10 flex flex-col md:flex-row justify-between items-center'
    ),
    socialIcon: cn('hover:text-gray-500 inline-flex'),
    copyRight: cn('text-sm mt-5 absolute inset-x-0 bottom-2')
  };

  const renderContributors = () =>
    contributors.map((contributor) => (
      <a
        href={`https://github.com/${contributor.username}`}
        key={contributor.username}
        target="_blank"
        className="contributor"
        aria-label={`Contributor: ${contributor.username}`}
        role="link"
      >
        {isLoading ? (
          <div className="w-12 h-12 bg-cGray" />
        ) : (
          <img key={contributor.username} src={contributor.avatarUrl} alt={contributor.username} />
        )}
      </a>
    ));

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
        <section aria-labelledby="event-info-heading" className="flex items-center mb-4 md:mb-0">
          <img src="images/logo.webp" className="w-15 h-15" alt="Event Logo" aria-label="Event Logo Hackafor 2024" />

          <div className="ml-3 flex flex-col gap-y-3">
            <h4 id="event-info-heading" className="text-sm">
              Más información del evento
            </h4>
            <nav aria-label="Social media links" className="flex gap-x-5 text-2xl">
              {renderSocialIcons()}
            </nav>
          </div>
        </section>

        {/* Contributors Section */}
        <section aria-labelledby="contributors-heading">
          <div className="contributors overflow-x-scroll w-84">{renderContributors()}</div>
          <h4 id="contributors-heading" className="text-sm">
            Quienes han contribuido en el desarrollo
          </h4>
        </section>

        {/* Copyrights */}
        <div className={classes.copyRight}>© 2024 Designed by Ana Rangel Developed by aforcita</div>
      </div>
    </footer>
  );
};
