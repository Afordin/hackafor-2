import { VARIANT } from '@common';
import { Button } from '@components';

type CTAProps = {
  children: string;
  className?: string;
};

export const CTA = ({ children, className }: CTAProps) => {
  return (
    <article className={`relative z-10 flex flex-col gap-5 w-full h-full items-center ${className}`}>
      <p className="text-[5vw] md:text-[32px]">{children}</p>
      <Button
        onClick={() => {
          console.log('');
        }}
        variant={VARIANT.PRIMARY}
      >
        <div className="flex gap-2 items-center">
          <span className="i-bi-discord"></span>
          <span>Accede con Discord</span>
        </div>
      </Button>
    </article>
  );
};
