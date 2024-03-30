import { Button } from '@components';
import { VARIANT } from '../../common';

type CTAProps = {
  children: string;
  className?: string;
};

export const CTA = ({ children, className }: CTAProps) => {
  return (
    <article className={`relative z-10 flex flex-col gap-5 w-full h-full items-center ${className}`}>
      <p className="text-[32px]">{children}</p>
      <Button
        onClick={() => {
          console.log('');
        }}
        variant={VARIANT.PRIMARY}
      >
        Accede con Discord
      </Button>
    </article>
  );
};
