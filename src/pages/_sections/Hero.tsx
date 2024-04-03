import { cn } from '@common';
import { TwitchLive } from '@components';
import { CTA } from './CTA';

interface HeroProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const Hero = ({ className }: HeroProps) => {
  const classes = {
    container: cn(className),
    innerContainer: cn('relative z-1', 'container mx-auto', 'grid md:grid-rows-[1fr_0.5fr]', 'w-full min-h-[100svh]')
  };

  return (
    <section className={classes.container}>
      <div className={classes.innerContainer}>
        <article className="text-center self-end pb-20">
          <h1 className="text-fluid-title font-bold leading-none text-shadow-md">Hackafor</h1>
          <p className="max-sm:text-fluid-base text-fluid-lg font-semibold text-shadow-sm">Una hackaton de programación</p>
          <TwitchLive />
        </article>

        <CTA className="text-center text-shadow-sm md:self-center" />
      </div>
    </section>
  );
};
