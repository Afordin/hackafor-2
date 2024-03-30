import { Card } from '@components';
import { MdOutlineGroups2 } from 'react-icons/md';

const InformationCards = [
  {
    title: 'Participantes por equipo',
    description: (
      <>
        <MdOutlineGroups2 className="w-10" />
        <span className="font-bold">4</span>
      </>
    )
  },
  {
    title: 'Temática',
    description: 'Por definir'
  },
  {
    title: 'Fecha',
    description: '20 NOV'
  }
];

export function Information() {
  return (
    <section className="flex flex-col gap-8">
      <div className="container mx-auto">
        <Card isMainCard>
          <img className="w-36 h-48" src="./images/hackafor_year.webp" alt="Hackafor 2024 Announcement Logo" />
          <p className="text-lg lg:text-2xl lg:max-w-3/4">
            La hackafor es un evento de programación hecha para desarrolladores. Puedes demostrar tu talento participado solo/a o en equipo
            y ganar premios creando las aplicaciones del futuro.
          </p>
        </Card>
        <ul className="flex flex-col gap-4 md:flex-row md:items-center mt-4">
          {InformationCards.map(({ title, description }) => (
            <li key={title} className="w-full">
              <Card>
                <p className="md:text-lg">{title}</p>
                <div className="flex items-center font-bold gap-1 text-3xl">{description}</div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
