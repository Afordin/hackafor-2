import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { CTA } from './components/CTA'
import { Carousel } from './components/Carousel'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Background } from './components/Hero/Background'
import { Information } from './components/Information'
import { Ticket } from './components/Ticket'

// const supabase = createClient(
// import.meta.env.VITE_PROJECT_URL,
// import.meta.env.VITE_API_KEY
// );

function App() {
  const [userSession] = useState<User | null>(null)

  useEffect(() => {
    // supabase.auth.onAuthStateChange((_event, session) => {
    // setUserSession(session?.user ?? null);
    // });
  }, [])

  console.log(userSession)

  // function signInWithDiscord() {
  //   supabase.auth.signInWithOAuth({
  //     provider: "discord",
  //   });
  // }

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

  return (
    <>
      <Background />
      <main className="w-full overflow-auto max-w-[1439px] mx-auto gap-y-[72px] font-dmsans flex flex-col text-white items-center">
        <Hero />
        <Information />
        <CTA>Para inscribirte inicia sesión con Discord</CTA>
        <Carousel />
        <Ticket />
        <Footer />
        {/* <div className="flex flex-col gap-8">
        <button className="p-4" onClick={signInWithDiscord}>
          Connect Discord
        </button>
        <button className="p-4" onClick={sendMessage}>
          Conectar
        </button>
      </div> */}
      </main>
    </>
  )
}

export default App
