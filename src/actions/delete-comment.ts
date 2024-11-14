'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: string) => {
    const supabase = createClient()

    const {data: comment} = await supabase
        .from('comments')
        .select('user_id, post_id')
        .eq('id', commentId)
        .single() 

        if (!comment) {
            throw new Error('Comment not found')
        }

        const {data: post} = await supabase
        .from('posts')
        .select('user_id, slug')
        .eq('id', comment.post_id)
        .single()
    
    const {data: {user}} = await supabase.auth.getUser()
    const isAuthor = user && user.id === comment?.user_id 
    const isPostAuthor = user && user.id === post?.user_id
    //console.log({isAuthor, isPostAuthor, comment})

    if (!isAuthor && !isPostAuthor) {
        throw new Error('You re not allowed to delete this comment')
    }

    if (!post) {
        throw new Error("could not redirect");
    }
    
    await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .throwOnError()

    revalidatePath(`/post/${post.slug}`)
}