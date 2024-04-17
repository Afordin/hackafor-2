import { useEffect } from 'react';
import { ROUTE } from '@common';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound/NotFound';
import { Projects } from '@pages/Projects/Projects';
import { Registration } from '@pages/Registration';
import { apiClient } from '@utils';
import { Route, Routes } from 'react-router-dom';
import { useUserStore } from './store/useUserStore';

import '@config/i18n';

function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    apiClient.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) return;
      setUser(session.user);
    });
  }, [setUser]);

  return (
    <>
      <Routes>
        <Route path={ROUTE.home} element={<Home />} />
        <Route path={ROUTE.projects} element={<Projects />} />
        <Route path={ROUTE.registration} element={<Registration />} />
        <Route path={ROUTE.notFound} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
