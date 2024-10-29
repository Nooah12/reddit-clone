'use server'

import { createClient } from "@/utils/supabase/server"
import { z } from "zod"
import { createPostSchema } from "./schemas"
import { slugify } from "@/utils/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
    const parsedData = createPostSchema.parse(data)
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) {
        throw Error('Not authenticated')
    }
    
    await supabase
        .from('posts')
        .insert([{...parsedData, user_id: user.id, slug: slugify(parsedData.title)}]) // slugen baseras på titeln, därav blir även titeln unik! Lägg till username eller nåt för att få bort unik titel
        .throwOnError()

    revalidatePath('/')
    redirect('/')
}
