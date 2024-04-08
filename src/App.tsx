import { useEffect } from 'react';
import { ROUTE, supabase } from '@common';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound/NotFound';
import { Projects } from '@pages/Projects/Projects';
import { Registration } from '@pages/Registration/Registration';
import { Route, Routes } from 'react-router-dom';
import { useUserStore } from './store/useUserStore';

function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
    });
  }, [setUser]);

  // const sendMessage = () => {
  //   fetch(`${import.meta.env.VITE_BASE_API_URL}/message`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       sender: userSession,
  //       receiver: {
  //         user_metadata: {
  //           provider_id: "267695749058396183",
  //         },
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  {
    /* <div className="flex flex-col gap-8">
    <button className="p-4" onClick={signInWithDiscord}>
      Connect Discord
    </button>
    <button className="p-4" onClick={sendMessage}>
      Conectar
    </button>
  </div> */
  }
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
