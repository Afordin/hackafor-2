import { CTA } from './CTA'
import { Carousel } from './Carousel'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Background } from './Hero/Background'
import { Information } from './Information'
import { Ticket } from './Ticket'

export const Home = () => {
  return (
    <main>
      <Background />
      <article className="w-full overflow-auto max-w-7xl mx-auto gap-y-[72px] font-dmsans flex flex-col text-white items-center">
        <Hero />
        <Information />
        <CTA>Para inscribirte inicia sesión con Discord</CTA>
        <Carousel />
        <Ticket />
        <Footer />
      </article>
    </main>
  )
}
