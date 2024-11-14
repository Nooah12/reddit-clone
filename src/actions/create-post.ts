'use server'

import { createClient } from "@/utils/supabase/server"
import { z } from "zod"
import { postSchema } from "./schemas"
import { slugify } from "@/utils/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadImage } from "@/utils/supabase/upload-image"

export const createPost = async (data: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(data)
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    // console.log("Current user:", user)  // Add this to debug
    if (!user) {
        throw Error('You must be logged in to create a post')
    }

    const imageFile = data.image?.get('image')
    if (!(imageFile instanceof File) && imageFile !== null) {
        throw new Error('malformed image')
    }

    const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null
    
    await supabase
        .from('posts')
        .insert([{
            title: parsedData.title,
            content: parsedData.content,
            image: imagePublicUrl, 
            user_id: user.id, 
            slug: slugify(parsedData.title)}])
        .throwOnError()

    revalidatePath('/')
    redirect('/')
}
