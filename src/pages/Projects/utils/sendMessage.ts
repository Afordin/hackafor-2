import { User } from '@supabase/supabase-js';

export const sendMessage = (sender: User, receiver: User) => {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/message`, {
    method: 'POST',
    body: JSON.stringify({
      sender: sender,
      receiver: {
        user_metadata: {
          provider_id: receiver
        }
      }
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
