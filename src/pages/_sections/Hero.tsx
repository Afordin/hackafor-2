import { CTA } from './CTA';

export const Hero = () => {
  return (
    <section>
      <div className="container mx-auto w-full relative z-1 grid place-items-center h-auto">
        <article className="text-center">
          <h1 className="text-[180px] mt-35 font-bold">Hackafor</h1>
          <p className="text-[38px] mt-[-70px] font-semibold">Una hackaton de programación</p>
        </article>
        <CTA className="mt-40">Para inscribirte inicia sesión con Discord</CTA>
      </div>
    </section>
  );
};
