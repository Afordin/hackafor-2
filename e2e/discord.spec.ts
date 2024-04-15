import { test } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

if (!process.env.VITE_PROJECT_URL || !process.env.VITE_API_KEY) {
  throw new Error('`VITE_PROJECT_URL` and `VITE_API_KEY` need to be set in the environment');
}
const client = createClient(process.env.VITE_PROJECT_URL, process.env.VITE_API_KEY);

const login = async () => {
  if (!process.env.AFORDIN_E2E_PASSWORD) {
    throw new Error('`AFORDIN_E2E_PASSWORD` needs to be set in the environment');
  }

  const {
    data: { session }
  } = await client.auth.signInWithPassword({
    email: 'marcostesting@gmail.com',
    password: process.env.AFORDIN_E2E_PASSWORD
  });

  if (!session) {
    throw new Error('No session found');
  }

  localStorage.setItem(
    'supabase.auth.token',
    JSON.stringify({
      session,
      expiresAt: session.expires_at
    })
  );
};

test('logs in', async ({ page }) => {
  await login();
});
