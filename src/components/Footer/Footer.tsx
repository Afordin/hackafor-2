import { useEffect, useState } from 'react';
import { FaDiscord, FaGithub, FaInstagram, FaTwitch, FaXTwitter } from 'react-icons/fa6';

interface SocialIcon {
  icon: JSX.Element;
  url: string;
}

const socialIcons: SocialIcon[] = [
  { icon: <FaDiscord />, url: 'https://discord.com/invite/ke48ZgXcdU' },
  { icon: <FaTwitch />, url: 'https://www.twitch.tv/afor_digital' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/afor_digital' },
  { icon: <FaGithub />, url: 'https://github.com/Afordin' },
  { icon: <FaXTwitter />, url: 'https://twitter.com/afor_digital' }
];

interface Contributor {
  username: string;
  avatarUrl: string;
}

export const Footer = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

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

  return (
    <div className="text-cWhite bg-gradient-to-r from-[#19101D] to-[#0D0D0E] py-5 w-full">
      <div className="max-w-7xl w-full mx-auto text-center px-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="images/logo.webp" className="w-15 h-15" alt="Logo" />
            <div className="ml-3 flex flex-col space-y-3">
              <label className="text-sm text-start">Más información del evento</label>
              <div className="flex space-x-5 text-2xl">
                {socialIcons.map((socialIcon, index) => (
                  <a key={index} href={socialIcon.url} className="hover:text-gray-500" target="_blank" rel="noopener noreferrer">
                    {socialIcon.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <a href="https://github.com/Afordin/hackafor-2/graphs/contributors" className="flex" target="_blank" rel="noopener noreferrer">
              {contributors.map((contributor) => (
                <img
                  key={contributor.username}
                  src={contributor.avatarUrl}
                  className="w-10 h-10 rounded-full mr-[-10px] overflow-auto"
                  alt={contributor.username}
                />
              ))}
            </a>
            <label className="text-sm">Quienes han contribuido en el desarrollo</label>
          </div>
        </div>
        <div className="text-sm mt-5">© 2024 Designed by Ana Rangel Developed by aforcita</div>
      </div>
    </div>
  );
};
