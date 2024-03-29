import { useEffect, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_PROJECT,
  import.meta.env.VITE_APIKEY
);

function App() {
  const [userSession, setUserSession] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session?.user ?? null);
    });
  }, []);

  console.log(userSession);

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
    <main className="w-screen h-screen font-dmsans flex justify-center items-center text-white bg-cBackground">
      {/* <div className="flex flex-col gap-8">
        <button className="p-4" onClick={signInWithDiscord}>
          Connect Discord
        </button>
        <button className="p-4" onClick={sendMessage}>
          Conectar
        </button>
      </div> */}
    </main>
  );
}

export default App;
