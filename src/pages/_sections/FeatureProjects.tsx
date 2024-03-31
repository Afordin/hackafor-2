import { ButtonSize, ROUTE, VARIANT } from '@common';
import { Button, Carousel, SimpleCard } from '@components';
import { featureProjectsData } from '@data';
import { Link } from 'react-router-dom';

export const FeatureProjects = () => {
  const renderProject = () =>
    featureProjectsData.map(({ title, description, url }) => (
      <a key={title} href={url} className="hover:scale-105 transition-transform">
        <SimpleCard className="p-8 lg:p-8">
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{description}</p>
        </SimpleCard>
      </a>
    ));

  return (
    <section>
      <div className="container mx-auto my-20">
        <Carousel>{renderProject()}</Carousel>

        <article className="w-full flex justify-center mt-8">
          <Button size={ButtonSize.xl} variant={VARIANT.GHOST} onClick={() => console.log('Clicked')}>
            <Link to={ROUTE.projects} className="flex gap-2 items-center">
              <span>Ver todos los proyectos</span>

              {/* icon */}
              <div className="i-lucide:arrow-up-right  w-8 h-8 bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1]"></div>
            </Link>
          </Button>
        </article>
      </div>
    </section>
  );
};
