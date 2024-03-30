import { Button } from '@components';
import { VARIANT } from '../../common';

type CTAProps = {
  children: string;
};

export const CTA = ({ children }: CTAProps) => {
  return (
    <article className="relative z-10 flex flex-col gap-8 w-full h-full items-center">
      <p className="text-[26px]">{children}</p>
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
