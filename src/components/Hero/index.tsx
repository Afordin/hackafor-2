import { CTA } from '../CTA'
import { Nav } from '../Nav'

export const Hero = () => {
  return (
    <article className=" z-1 py-[36px] flex flex-col justify-between w-full h-[900px] items-center">
      <Nav />
      <div className="flex flex-col items-center justify-center font-bold">
        <h1 className="text-[180px]">Hackafor</h1>
        <h2 className="text-[38px] mt-[-70px]">Una hackaton de programación</h2>
      </div>
      <CTA>Para inscribirte inicia sesión con Discord</CTA>
    </article>
  )
}
