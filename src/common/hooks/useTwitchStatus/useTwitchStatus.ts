import { useEffect, useState } from 'react';
import { TWITCH_STATUS_URL } from '@common';

export const useTwitchStatus = (checkInterval = 60000) => {
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTwitchStatus = async () => {
      try {
        const response = await fetch(TWITCH_STATUS_URL, { signal });
        const data = await response.json();
        setIsLive(data.online);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        } else {
          console.error('An unexpected error occurred:', error);
          setError('An unexpected error occurred');
        }
      }
    };

    fetchTwitchStatus();

    const interval = checkInterval > 0 ? setInterval(fetchTwitchStatus, checkInterval) : null;

    return () => {
      controller.abort();
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [checkInterval]);

  return { isLive, error };
};
