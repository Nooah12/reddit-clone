import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "./database.types";

export const createClient = () => { // string | undefined, då det är hemligt känner den inte av null?
    return createBrowserClient<Database>( // type Databaser
        process.env.NEXT_PUBLIC_SUPABASE_URL!, // ! = kan bara va string ?
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
