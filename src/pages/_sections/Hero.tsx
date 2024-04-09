import { ButtonSize, cn, useTwitchStatus, Variant } from '@common';
import { Button, Countdown } from '@components';
import { CTA } from './CTA';

interface HeroProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const Hero = ({ className }: HeroProps) => {
  const { isLive } = useTwitchStatus();
  const classes = {
    container: cn(className),
    innerContainer: cn('relative z-1', 'container mx-auto', 'grid md:grid-rows-[1fr_0.5fr]', 'w-full min-h-[100svh]')
  };

  const renderTwitchButton = () => {
    if (isLive) {
      return (
        <a href="https://www.twitch.tv/afor_digital" target="_blank">
          <Button variant={Variant.twitch} className="mt-4 flex items-center gap-4 mx-auto" size={ButtonSize.xl}>
            <span>twitch.tv/afor_digital</span>
            <div className="rounded-full px-2 bg-primary-600 animate-pulse relative before:content-[''] before:inset-0 before:absolute before:w-full before:h-full before:bg-primary-600 before:rounded-full before:animate-ping before:animate-duration-2000 ">
              LIVE
            </div>
          </Button>
        </a>
      );
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.innerContainer}>
        <article className="text-center self-end ">
          <h1 className="text-fluid-title font-bold leading-none text-shadow-md">Hackafor</h1>
          <p className="max-sm:text-fluid-base text-fluid-lg font-semibold text-shadow-sm">Una hackaton de programación</p>
          <div className="flex justify-center mb-4 gap-4 mt-4 xl:mt-8 xl:mb-0 xl:gap-18">
            <Countdown />
          </div>
          {renderTwitchButton()}
        </article>
        <CTA className="text-center text-shadow-sm md:self-center" />
      </div>
    </section>
  );
};
