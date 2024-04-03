import { cn, useContributors } from '@common';

export const Contributors = () => {
  const { contributors, isLoading } = useContributors();

  const classes = {
    contributors: `overflow-x-auto mt-5`
  };

  return (
    <section className="text-center mt-40 mb-30">
      <h4 className="text-[30px]">Quienes han contribuido en el desarrollo</h4>
      <div className={cn('contributors', classes.contributors)}>
        {contributors.map((contributor) => (
          <a
            href={`https://github.com/${contributor.username}`}
            key={contributor.username}
            className="contributor"
            aria-label={`Contributor: ${contributor.username}`}
          >
            {isLoading ? (
              <div className="w-12 h-12 bg-cGray" />
            ) : (
              <img key={contributor.username} src={contributor.avatarUrl} alt={contributor.username} />
            )}
          </a>
        ))}
      </div>
    </section>
  );
};
