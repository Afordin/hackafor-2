import { supabase } from '@utils';

export const useAuth = () => {
  function signInWithDiscord() {
    supabase.auth.signInWithOAuth({
      provider: 'discord'
    });
  }

  function signOut() {
    supabase.auth
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  }

  return { signInWithDiscord, signOut };
};
