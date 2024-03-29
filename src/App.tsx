import { useEffect, useState } from 'react'
import { createClient, User } from '@supabase/supabase-js'
import { Nav } from './components/Nav'
import { Header } from './components/Header'
import { CTA } from './components/CTA'
import { Information } from './components/Information'
import { Carousel } from './components/Carousel'
import { Ticket } from './components/Ticket'
import { Footer } from './components/Footer'
import { Background } from './components/Background'

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_API_KEY,
)

function App() {
  const [userSession, setUserSession] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session?.user ?? null)
    })
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
    <div className="grid w-full overflow-auto font-dmsans text-white bg-[#060606]">
      <main className="z-10 row-start-1 row-end-2 col-start-1 col-end-2 flex flex-col items-center gap-y-[72px]">
        <Nav />
        <Header />
        <CTA>Para inscribirte inicia sesión con Discord</CTA>
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
      <div className="row-start-1 row-end-2 col-start-1 col-end-2">
        <Background />
      </div>
    </div>
  )
}

export default App
