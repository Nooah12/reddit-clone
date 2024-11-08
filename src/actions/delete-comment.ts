'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: string) => {
    const supabase = createClient()

    const {data: comment} = await supabase // utan måsvingar rename data till comment
        .from('comments')
        .select('user_id')
        .eq('id', commentId)
        .single() 
    
    const {data: {user}} = await supabase.auth.getUser()
    const isAuthor = user && user.id === comment?.user_id




    if (!isAuthor) {
        throw new Error('You re not allowed to delete this comment')
    }
    
    await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .throwOnError()

    revalidatePath('/')
}