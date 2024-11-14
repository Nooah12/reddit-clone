'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deletePost = async (postId: string) => {
    const supabase = createClient()

    const {data: post} = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single() 
    
    const {data: {user}} = await supabase.auth.getUser()
    const isAuthor = user && user.id === post?.user_id
    
    if (!isAuthor) {
        throw new Error('You re not allowed to delete this post')
    }
    
    await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .throwOnError()

    revalidatePath('/')
    redirect('/')
}