import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";

import type { Database } from "../db/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
