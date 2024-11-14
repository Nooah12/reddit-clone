'use server'
import { createClient } from "@/utils/supabase/server"
import { logInSchema } from './schemas'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const signUp = async (data: z.infer<typeof logInSchema>) => {
    const supabase = createClient()
    const parsedData = logInSchema.parse(data)

    const { data: { user }, error } = await supabase.auth.signUp(parsedData)
    
      if (user && user.email) {
        const { id, email } = user
        await supabase.from
            ('users').insert([{ id, email }])
      }

    if (error) {
        throw error
    }
    
    redirect('/')
}