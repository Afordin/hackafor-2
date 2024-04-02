import { ButtonSize, cn, useBreakpoint, VARIANT } from '@common';
import { Button } from '@components';

type CTAProps = {
  children: string;
  className?: string;
};

export const CTA = ({ children, className }: CTAProps) => {
  const { isMobile } = useBreakpoint();
  const handleButtonSize = isMobile ? ButtonSize.lg : ButtonSize.xl;

  const classes = {
    container: cn('relative z-10', className)
  };
  return (
    <article className={classes.container}>
      <p className="max-sm:text-fluid-sm text-fluid-base">{children}</p>
      <Button
        onClick={() => {
          console.log('');
        }}
        variant={VARIANT.PRIMARY}
        size={handleButtonSize}
        className="mt-6"
      >
        <div className="flex gap-2 items-center">
          <span className="i-bi-discord"></span>
          <span>Accede con Discord</span>
        </div>
      </Button>
    </article>
  );
};
