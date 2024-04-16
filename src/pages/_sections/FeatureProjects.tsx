import { ButtonSize, cn, ROUTE, useProjects, Variant } from '@common';
import { Button, Carousel, SimpleCard, Spinner } from '@components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FeatureProjectsProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}
export const FeatureProjects = ({ className }: FeatureProjectsProps) => {
  const { projects, isLoading } = useProjects();
  const { t } = useTranslation();

  const projectsSlice = [...projects].sort(() => 0.5 - Math.random()).slice(0, 4);
  const classes = {
    container: cn('my-20', className)
  };

  const renderProject = () =>
    projectsSlice.map(({ id, name, description, repositoryUrl }) => (
      <a key={id} href={repositoryUrl as string} className="hover:scale-110 transition-transform duration-300">
        <SimpleCard className="p-8 lg:p-8 relative | carousel-custom-border  min-w-sm min-h-xs">
          <h2 className="text-xl font-bold">{name}</h2>
          <p>{description}</p>
          <div className="carousel-glows" />
        </SimpleCard>
      </a>
    ));

  const renderLoading = () => {
    return (
      <div className="absolute inset-0 mx-auto mt-20 grid place-items-center gap-4">
        <p>{t('page_loading')}</p>
        <Spinner />
      </div>
    );
  };

  return (
    <section className={classes.container}>
      <div className="container mx-auto">
        {isLoading ? renderLoading() : <Carousel>{renderProject()}</Carousel>}

        <div className="w-full flex justify-center mt-8">
          {/* TODO: Ghost button styles reset if you use the className Props, fix this */}
          <Button size={ButtonSize.xl} variant={Variant.ghost} onClick={() => console.log('Clicked')}>
            <Link to={ROUTE.projects} className="flex gap-2 items-center">
              <span>{t('feature_projects_button')}</span>

              {/* icon */}
              <div className="i-lucide:arrow-up-right  w-8 h-8 bg-gradient-to-rb from-primary-600 to-secondary-500" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
