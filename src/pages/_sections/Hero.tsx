import { CTA } from './CTA'

export const Hero = () => {
  return (
    <section>
      <div className="container mx-auto w-full relative z-1 grid place-items-center h-[90svh]">
        <article className="text-center">
          <h1 className="text-[180px] mt-30">Hackafor</h1>
          <p className="text-[38px] mt-[-70px]">Una hackaton de programación</p>
        </article>
        {/* TODO: Add className to CTA to delete this div*/}
        <div className="mt-auto mb-10">
          <CTA>Para inscribirte inicia sesión con Discord</CTA>
        </div>
      </div>
    </section>
  )
}
