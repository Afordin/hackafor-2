import { ButtonSize, ROUTE, Variant } from '@common';
import { Background, Button } from '@components';
import { RootLayout } from '@layouts';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <RootLayout>
      <Background />
      <main className="relative w-full z-10 text-cWhite font-dmsans">
        <section className="container mx-auto px-5 max-w-7xl mx-auto grid md:grid-cols-[1fr_.4fr] place-items-center place-content-center h-[100svh]">
          <article className="grid gap-4 text-shadow-md px-5">
            <h1 className="text-7xl font-semibold">Error 404</h1>
            <h2 className="text-4xl font-semibold">PÁGINA NO ENCONTRADA</h2>
            <p className="text-3xl">
              ¡Hola! Lo sentimos, pero no pudimos encontrar lo que buscabas. Verifica que la dirección URL sea correcta
            </p>
            <Link to={ROUTE.home}>
              <Button size={ButtonSize.xl} variant={Variant.ghost} onClick={() => {}} className="flex gap-2 items-center">
                <span>IR A INICIO</span>
                <div className="i-lucide:arrow-up-right  w-8 h-8 bg-gradient-to-rb from-primary-600 to-secondary-500" />
              </Button>
            </Link>
          </article>

          <article className="hidden md:block">
            {/* https://codepen.io/jkantner/pen/wvqeXrQ */}
            <div className="wheel-and-hamster" role="img" aria-label="Orange and tan hamster running in a metal wheel">
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
          </article>
        </section>
      </main>
      
      Better html structure, and fix a problem with the hamster animation
      </main>
    </RootLayout>
  );
};
