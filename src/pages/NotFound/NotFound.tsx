import { ButtonSize, ROUTE, Variant } from '@common';
import { Background, Button } from '@components';
import { RootLayout } from '@layouts';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <RootLayout>
      <Background />
      <main className="relative z-2 w-full max-w-7xl mx-auto px-5 flex flex-col justify-center items-center h-[87svh] text-cWhite font-dmsans gap-16">
        <article className="space-y-lg text-shadow-md">
          <h1 className="text-7xl font-semibold">Error 404</h1>
          <h2 className="text-4xl font-semibold">PÁGINA NO ENCONTRADA</h2>
          <p className="text-3xl">
            ¡Hola! Lo sentimos, pero no pudimos encontrar lo que buscabas. Verifica que la dirección URL sea correcta
          </p>
        </article>
        <article className="flex justify-center mt-8">
          <Button size={ButtonSize.xl} variant={Variant.ghost} onClick={() => {}}>
            <Link to={ROUTE.home} className="flex gap-2 items-center">
              <span>IR A INICIO</span>
              <div className="i-lucide:arrow-up-right  w-8 h-8 bg-gradient-to-rb from-primary-600 to-secondary-500" />
            </Link>
          </Button>
        </article>
      </main>
    </RootLayout>
  );
};
