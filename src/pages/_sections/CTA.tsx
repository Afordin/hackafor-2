import { ButtonSize, cn, ROUTE, useAuth, useBreakpoint, Variant } from '@common';
import { Button } from '@components';
import { useUserStore } from '@store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type CTAProps = {
  className?: string;
};

export const CTA = ({ className }: CTAProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const { signInWithDiscord } = useAuth();
  const user = useUserStore((state) => state.user);
  const handleButtonSize = isMobile ? ButtonSize.lg : ButtonSize.xl;

  const classes = {
    container: cn('relative z-10', className)
  };
  return (
    <article className={classes.container}>
      <p className="max-sm:text-fluid-sm text-fluid-base">
        {t(user ? 'home_hackathon_register_title' : 'home_hackathon_register_without_login_title')}
      </p>
      <Button
        onClick={() => {
          if (user) {
            navigate(ROUTE.registration);
            return;
          }
          signInWithDiscord();
        }}
        variant={Variant.primary}
        size={handleButtonSize}
        className="mt-6"
      >
        <div className="flex gap-2 items-center">
          {user ? <span className="i-bi-link-45deg text-xl"></span> : <span className="i-bi-discord"></span>}
          <span>{t(user ? 'home_hackathon_register_button' : 'home_hackathon_register_without_login_button')}</span>
        </div>
      </Button>
    </article>
  );
};
