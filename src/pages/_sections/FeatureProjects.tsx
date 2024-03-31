import { ButtonSize, cn, ROUTE, VARIANT } from '@common';
import { Button, Carousel, SimpleCard } from '@components';
import { featureProjectsData } from '@data';
import { Link } from 'react-router-dom';

interface FeatureProjectsProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const FeatureProjects = ({ className }: FeatureProjectsProps) => {
  const classes = {
    container: cn('my-20', className)
  };
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
    <section className={classes.container}>
      <div className="container mx-auto">
        <Carousel>{renderProject()}</Carousel>

        <div className="w-full flex justify-center mt-8">
          {/* TODO: Ghost button styles reset if you use the className Props, fix this */}
          <Button size={ButtonSize.xl} variant={VARIANT.GHOST} onClick={() => console.log('Clicked')}>
            <Link to={ROUTE.projects} className="flex gap-2 items-center">
              <span>Ver todos los proyectos</span>

              {/* icon */}
              <div className="i-lucide:arrow-up-right  w-8 h-8 bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1]" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};