import { CTA } from "../CTA";
import { Nav } from "../Nav";
import { Background } from "./Background";


export const Hero = () => {

  return (
    <article className="relative py-[36px] flex flex-col justify-between  w-full h-full min-h-[100vh] items-center">
      <Background />
      <Nav />
      <div className="flex flex-col items-center justify-center font-bold">
        <h1 className="text-[200px]">Hackafor</h1>
        <h2 className="text-[48px] mt-[-70px]">
          Una hackaton de programación
        </h2>
      </div>
      <CTA>Para inscribirte inicia sesión con Discord</CTA>
    </article>
  );
};