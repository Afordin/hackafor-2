import { useEffect, useState } from 'react';

export const Countdown = () => {
  const time = [
    {
      name: 'days',
      label: 'Días'
    },
    {
      name: 'hours',
      label: 'Horas'
    },
    {
      name: 'minutes',
      label: 'Minutos'
    },
    {
      name: 'seconds',
      label: 'Segundos'
    }
  ];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setInterval(() => {
      const countdownDate = new Date('2024-11-20');
      const now = new Date();

      const timeDifference = countdownDate.getTime() - now.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
  }, []);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <>
      {time.map(({ name, label }, index) => (
        <section key={index} className="text-center text-shadow-sm">
          <span className="font-bold text-6xl">{formatNumber(timeLeft[name])}</span>
          <p className="mb-4 text-2xl">{label}</p>
        </section>
      ))}
    </>
  );
};
