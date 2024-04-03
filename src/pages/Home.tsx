import { Background, Footer, Nav } from '@components';
import { CTA, FeatureProjects, Hero, Information, Ticket } from './_sections';
import { Contributors } from './_sections/Contributors';

export const Home = () => {
  return (
    <>
      <Nav />
      <Background />
      <main className="relative z-2 w-full max-w-7xl mx-auto gap-y-[72px] font-dmsans text-white px-5">
        <Hero />
        <Information />
        <CTA className="mt-20 text-center">Para inscribirte inicia sesión con Discord</CTA>
        <FeatureProjects />
        <Ticket />
        <Contributors />
      </main>
      <Footer />
    </>
  );
};
