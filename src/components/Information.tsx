import { Card } from './common/Card'
import { MdOutlineGroups2 } from 'react-icons/md'

const InformationCards = [
  {
    title: 'Participantes',
    description: (
      <>
        <MdOutlineGroups2 className="w-10" />
        <span>4</span>
      </>
    ),
  },
  {
    title: 'Tematica',
    description: 'TBD',
  },
  {
    title: 'Fecha',
    description: '20 NOV',
  },
]

export function Information() {
  return (
    <section className="flex flex-col gap-8 mt-10 px-10">
      <Card isMainCard>
        <img
          className="w-36 h-48"
          src="./images/hackafor_year.webp"
          alt="Hackafor 2024 Announcement Logo"
        />
        <p className="text-lg lg:text-2xl lg:max-w-3/4">
          La hackafor es un evento de programación hecha para desarrolladores.
          Puedes demostrar tu talento participado solo/a o en equipo y ganar
          premios creando las aplicaciones del futuro.
        </p>
      </Card>
      <ul className="flex flex-col gap-4 md:flex-row md:items-center">
        {InformationCards.map(({ title, description }) => (
          <li key={title} className="w-full">
            <Card>
              <p className="md:text-lg">{title}</p>
              <div className="flex items-center gap-1 text-3xl">
                {description}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
