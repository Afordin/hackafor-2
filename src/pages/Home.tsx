import { Carousel, Footer, Background, Nav } from '@components'
import { Ticket, Hero, Information, CTA } from './_sections'

export const Home = () => {
  return (
    <>
      <Nav />
      <Background />
      <main className="w-full max-w-7xl mx-auto gap-y-[72px] font-dmsans  text-white">
        <Hero />
        <Information />
        <CTA>Para inscribirte inicia sesión con Discord</CTA>
        <Carousel />
        <Ticket />
      </main>
      <Footer />
    </>
  )
}
