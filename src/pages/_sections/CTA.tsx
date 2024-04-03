import { ButtonSize, cn, ROUTE, useAuth, useBreakpoint, VARIANT } from '@common';
import { Button } from '@components';
import { useUserStore } from '@store';
import { useNavigate } from 'react-router-dom';

type CTAProps = {
  className?: string;
};

export const CTA = ({ className }: CTAProps) => {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const { signInWithDiscord } = useAuth();
  const user = useUserStore((state) => state.user);
  const handleButtonSize = isMobile ? ButtonSize.lg : ButtonSize.xl;

  const text = {
    logged: {
      message: '¿Quieres participar en la hackaton? ¡Inscríbete!',
      button: 'Inscribirme ahora'
    },
    notLogged: {
      message: 'Para inscribirte inicia sesión con Discord',
      button: 'Accede con Discord'
    }
  };

  const classes = {
    container: cn('relative z-10', className)
  };
  return (
    <article className={classes.container}>
      <p className="max-sm:text-fluid-sm text-fluid-base">{user ? text.logged.message : text.notLogged.message}</p>
      <Button
        onClick={() => {
          if (user) {
            navigate(ROUTE.registration);
            return;
          }
          signInWithDiscord();
        }}
        variant={VARIANT.PRIMARY}
        size={handleButtonSize}
        className="mt-6"
      >
        <div className="flex gap-2 items-center">
          {user ? <span className="i-bi-link-45deg text-xl"></span> : <span className="i-bi-discord"></span>}
          <span>{user ? text.logged.button : text.notLogged.button}</span>
        </div>
      </Button>
    </article>
  );
};
