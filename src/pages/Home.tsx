import { Background } from '@components';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { CTA, FeatureProjects, Hero, Information, Ticket } from './_sections';
import { Contributors } from './_sections/Contributors';

export const Home = () => {
  const user = useUserStore((state) => state.user);

  return (
    <RootLayout>
      <Background />
      <main className="relative z-2 w-full max-w-7xl mx-auto gap-y-[72px] font-dmsans text-white px-5">
        <Hero />
        <Information />
        <CTA className="mt-20 text-center" />
        <FeatureProjects />
        <Ticket avatar={user?.user_metadata.avatar_url} name={user?.user_metadata.full_name} />
        <Contributors />
      </main>
    </RootLayout>
  );
};
