'use server'

import { createClient } from "@/utils/supabase/server"

export const signUp = async (formData: FormData) => {
    const data = {
        email: formData.get('email') as string, // från name i form
        password: formData.get('password') as string
    }

    const supabase = createClient()
    const { data: {user}, error} = await supabase.auth.signUp(data) // supabase auth.users tabell

    if (user && user.email) {
        const {data, error} = await supabase.from('users').insert([{ id: user.id, email: user.email }])
        console.log({user, error})  
    }

    console.log({ user, error })
}