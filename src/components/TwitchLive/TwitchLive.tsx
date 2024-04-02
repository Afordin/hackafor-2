import { useEffect, useState } from 'react';
import { cn } from '@common';

interface TwitchLiveProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

export const TwitchLive = ({ className }: TwitchLiveProps) => {
  const URL = 'https://midudev-apis.midudev.workers.dev/uptime/afor_digital';

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchTwitchStatus = async () => {
      try {
        const response = await fetch(URL);
        const { online } = await response.json();
        setIsLive(online);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTwitchStatus();
  }, []);

  const classes = {
    container: cn('mt-4 h-[40px]', className),
    content: cn(
      'flex h-full items-center mx-auto bg-[#9146FF] w-fit px-3 py-1 rounded-[0.4rem] hover:bg-[#6441A4] transition-all duration-300 shadow-2xl'
    ),
    liveBox: cn(' rounded-[0.4rem] px-2 ml-3 font-600 bg-[#EB0400] animate-pulse')
  };

  return (
    <div className={classes.container}>
      {isLive && (
        <a className={classes.content} href="https://www.twitch.tv/afor_digital" target="_blank">
          <span className="text-white text-lg font-600">twitch.tv/afor_digital</span>
          <div className={classes.liveBox}>LIVE</div>
        </a>
      )}
    </div>
  );
};
