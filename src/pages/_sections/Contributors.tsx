import { cn, Contributor, useContributors } from '@common';

export const Contributors = () => {
  const { contributors, isLoading } = useContributors();
  const platinumContributors = contributors.slice(0, 3);
  const goldContributors = contributors.slice(3, 10);
  const silverContributors = contributors.slice(10);

  const classes = {
    contributors: `overflow-x-auto mt-5`
  };

  const renderContributors = (contributorList: Contributor[]) => {
    return contributorList.map((contributor) => (
      <a
        href={`https://github.com/${contributor.username}`}
        key={contributor.username}
        className="contributor"
        aria-label={`Contributor: ${contributor.username}`}
      >
        {isLoading ? (
          <div className="w-12 h-12 bg-cGray" />
        ) : (
          <img src={contributor.avatarUrl} alt={`Contribuidor: ${contributor.username}`} />
        )}
      </a>
    ));
  };

  return (
    <section className="text-center my-10">
      <h4 className="text-3xl">Quienes han contribuido en el desarrollo</h4>
      <div className="mt-10">
        {platinumContributors.length > 0 && (
          <>
            <h5 className="text-2xl font-bold text-center translate-y-10">Platinum</h5>
            <div
              className={cn('contributors', classes.contributors)}
              style={{ '--contributor-count': 3, '--contributor-size': '4.5rem' } as any}
            >
              {renderContributors(platinumContributors)}
            </div>
          </>
        )}
        {goldContributors.length > 0 && (
          <>
            <h5 className="text-2xl font-bold text-center translate-y-10">Gold</h5>
            <div
              className={cn('contributors', classes.contributors)}
              style={{ '--contributor-count': 7, '--contributor-size': '4rem' } as any}
            >
              {renderContributors(goldContributors)}
            </div>
          </>
        )}
        {silverContributors.length > 0 && (
          <>
            <h5 className="text-2xl font-bold text-center translate-y-10">Silver</h5>
            <div className={cn('contributors', classes.contributors)} style={{ '--contributor-count': 9 } as any}>
              {renderContributors(silverContributors)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
