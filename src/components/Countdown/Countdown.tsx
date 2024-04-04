import { useEffect, useState } from 'react';

export const Countdown = () => {
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
    <article className="flex flex-wrap justify-center items-center gap-24">
      <section className="text-center">
        <p className="mb-4 text-2xl">Días</p>
        <span className="font-bold text-6xl">{formatNumber(timeLeft.days)}</span>
      </section>
      <section>
        <p className="mb-4 text-2xl">Horas</p>
        <span className="font-bold text-6xl">{formatNumber(timeLeft.hours)}</span>
      </section>
      <section className="text-center">
        <p className="mb-4 text-2xl">Minutos</p>
        <span className="font-bold text-6xl">{formatNumber(timeLeft.minutes)}</span>
      </section>
      <section className="text-center">
        <p className="mb-4 text-2xl">Segundos</p>
        <span className="font-bold text-6xl">{formatNumber(timeLeft.seconds)}</span>
      </section>
    </article>
  );
};
