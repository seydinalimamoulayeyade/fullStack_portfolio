import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "A_COMPLETER";
const SUPABASE_PUBLIC_KEY = "A_COMPLETER";

export const isSupabaseConfigured =
  SUPABASE_URL !== "A_COMPLETER" &&
  SUPABASE_PUBLIC_KEY !== "A_COMPLETER";

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)
  : null;
