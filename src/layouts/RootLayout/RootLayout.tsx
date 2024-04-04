import { ReactNode } from 'react';
import { Footer, Nav } from '@components';

interface RootLayoutProps {
  /**
   * Children to render inside the layout
   */
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
