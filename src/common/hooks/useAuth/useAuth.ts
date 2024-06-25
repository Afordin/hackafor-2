import { apiClient } from '@utils';

export const useAuth = () => {
  function signInWithDiscord() {
    apiClient.auth.signInWithOAuth({
      provider: 'discord'
    });
  }

  function signOut() {
    apiClient.auth
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
