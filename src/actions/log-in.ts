'use server'
import { createClient } from '@/utils/supabase/server'
import { logInSchema } from './schemas'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const logIn = async (data: z.infer<typeof logInSchema>) => { // formData skickar data från form??
    const supabase = createClient()
    
    /*     const data = {
        email: formData.get('email'),
        password: formData.get('password')
    } */

    const parsedData = logInSchema.parse(data)

    const {error} = await supabase.auth.signInWithPassword(parsedData)
    if (error) {
        throw error
    }

    redirect('/')
}

export default logIn