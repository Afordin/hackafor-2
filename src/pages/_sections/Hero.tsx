import { CTA } from './CTA';

export const Hero = () => {
  return (
    <section>
      <div className="container mx-auto w-full relative z-1 grid place-items-center h-auto">
        <article className="text-center">
          <h1 className="text-[20vw] mt-24 md:text-[180px] md:mt-35 font-bold">Hackafor</h1>
          <p className="text-[6vw] mt-1 md:text-[38px] md:mt-[-70px] font-semibold">Una hackaton de programación</p>
        </article>
        <CTA className="mt-32 text-center md:mt-80">Para inscribirte inicia sesión con Discord</CTA>
      </div>
    </section>
  );
};
