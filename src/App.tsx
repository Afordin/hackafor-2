import { useEffect } from 'react';
import { ROUTE } from '@common';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound/NotFound';
import { Projects } from '@pages/Projects/Projects';
import { Registration } from '@pages/Registration';
import { useTicketStore, useUserStore } from '@store';
import { apiClient, getUserTicket } from '@utils';
import { Route, Routes } from 'react-router-dom';

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const setTicket = useTicketStore((state) => state.setTicket);

  useEffect(() => {
    apiClient.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      if (!session?.user) return;
      setUser(session.user);

      if (_event == 'INITIAL_SESSION') {
        getUserTicket(session.user.id)
          .then((ticket) => {
            setTicket(ticket);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [setUser, setTicket]);

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
