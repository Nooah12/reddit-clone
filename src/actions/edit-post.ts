'use server'

import { z } from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server"
import { slugify } from "@/utils/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const editPost = async ({postId, data}: {postId: string, data: z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.parse(data)
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        throw new Error('not authenticated')
    }

    const {data: post} = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single()

    if (!post) {
        throw new Error("post not found");
    }

    const isAuthor = user && user.id === post.user_id

    if (!isAuthor) {
        throw new Error("You re not allowed to edit this post mf");
    }

    const {data: updatePost} = await supabase
        .from('posts')
        .update({...parsedData, slug: slugify(parsedData.title)}) // error ??
        .eq('id', postId)
        .select('slug')
        .single()
        .throwOnError()

        if (!updatePost) {
            throw new Error("could not redirect");
            
        }

        revalidatePath('/')
        redirect(`/post/${updatePost.slug}`)
        // update slug
        //pro: url matches new title
        //con: old link wont work
}