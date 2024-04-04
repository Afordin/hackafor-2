import { createClient, SupabaseClient } from '@supabase/supabase-js';

const projectUrl: string = import.meta.env.VITE_PROJECT_URL;
const apiKey: string = import.meta.env.VITE_API_KEY;

if (!projectUrl || !apiKey) {
  throw new Error('Supabase URL or API key is missing in environment variables');
}

export const supabase: SupabaseClient = createClient(projectUrl, apiKey);
