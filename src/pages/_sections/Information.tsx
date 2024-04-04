import { ORIENTATION } from '@common';
import { Countdown, SimpleCard } from '@components';

const InformationCards = [
  {
    title: 'Participantes por equipo',
    description: (
      <>
        <span className="w-10 i-material-symbols-groups-outline-sharp" />
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
        <SimpleCard orientation={ORIENTATION.HORIZONTAL}>
          <img className="h-full w-full max-w-36 max-h-48" src="./images/hackafor_year.webp" alt="Hackafor 2024 Announcement Logo" />

          {/* BUG: The usage of '!important' is a temporary fix to override the 'text-fluid-lg' class, which undesirably resets the 'line-height' to 1, interfering with our desired text layout. This issue arises due to the 'text-fluid-lg' class having higher specificity and applying a line-height that doesn't align with our design. Investigate a more scalable solution that can address the specificity issue without relying on '!important'. This may involve refactoring the 'text-fluid-lg' class or implementing a more flexible typography system within UNOCSS to ensure text styles can be customized without conflict. */}
          <p className="text-fluid-lg md:text-fluid-base !leading-normal max-md:mt-8">
            La hackafor es un evento de programación hecha para desarrolladores. Puedes demostrar tu talento participado solo/a o en equipo
            y ganar premios creando las aplicaciones del futuro.
          </p>
        </SimpleCard>
        <ul className="grid md:grid-cols-3 gap-4 mt-4 place-items-stretch">
          {InformationCards.map(({ title, description }) => (
            <li key={title}>
              <SimpleCard
                className="w-full h-full p-8"
                innerContainerClassName="grid gap-4 h-full place-content-stretch max-md:place-items-center max-md:text-center max-md:py-6"
              >
                <p className="text-2xl">{title}</p>
                <div className="flex items-center font-bold gap-4  text-fluid-2xl md:text-fluid-lg self-end">{description}</div>
              </SimpleCard>
            </li>
          ))}
        </ul>
      </div>
      <SimpleCard className="mx-auto flex flex-wrap justify-center items-center gap-24">
          <Countdown />
      </SimpleCard>
    </section>
  );
}
