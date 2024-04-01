import { Children, Fragment, type ReactNode } from 'react';
import { CAROUSEL_CONFIG, cn, useCarouselEffect } from '@common';

interface CarouselProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * Elements to display inside the Carousel.
   */
  children: Array<ReactNode>;
}

export const Carousel = ({ className, children }: CarouselProps) => {
  useCarouselEffect('carousel-container', CAROUSEL_CONFIG);

  const classes = {
    container: cn(
      'carousel-container',
      'h-[30rem] mx-auto max-md:max-w-[35rem] md:w-full',
      'grid place-items-center',
      'relative overflow-hidden ',

      // Left Fade Out
      'before:absolute before:top-0 before:left-0 ',
      'before:h-full before:w-1/6 before:z-10 before:pointer-events-none',
      'before:bg-gradient-to-r before:content-[""]',
      'before:from-cBackground before:via-transparent before:to-transparent',

      // Right Fade out
      'after:absolute after:top-0 after:-right-1 after:rotate-180',
      'after:h-full after:w-1/6 after:z-10 after:pointer-events-none',
      'after:bg-gradient-to-r after:via-transparent after:to-transparent after:content-[""]',
      'after:from-cBackground',
      className
    ),
    // NOTE: If you add more projects to the carousel, please update the width
    innerContainer: cn('w-[150rem] md:w-[200rem] flex justify-between gap-10', 'animate-carousel')
  };

  const logos = Children.toArray(children);
  const renderChildren = logos.map((logo, index) => <Fragment key={index}>{logo}</Fragment>);

  return (
    <div id="carousel-container" className={classes.container}>
      <div className={classes.innerContainer}>
        {/**
         * renderChildren is called twice to enable a continuous loop
         * of logos in the carousel, avoiding blank spaces at the end of
         * the loop. The duplication ensures an uninterrupted visual flow,
         * making the transition from the last logo back to the first
         * seamless.
         */}
        {renderChildren}
        {renderChildren}
      </div>
    </div>
  );
};
