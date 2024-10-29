import { createClient } from './client'
import {type QueryData} from '@supabase/supabase-js'

const getHomePosts = (supabase: ReturnType<typeof createClient>) => {
    return supabase
      .from('posts')
      .select('id, title, slug, users("email")') // vad vi vill hämta, lämna tom alt. ('*') = ta allt
      .order('created_at', {ascending: false}) // senaste högst upp
}
export type PostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getPostsByQuery = (query: string) => {
    const supabase = createClient()
    return supabase
    .from('posts')
    .select('id, title, slug')
    .textSearch('title', query.replace(/ /g, '+')) // söka med mellanrum
}
export default getHomePosts

const getComments = (supabase: ReturnType<typeof createClient>, postId: string) => {
    return supabase
      .from('comments')
      .select('id, comment, users("email")')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
}
export type CommentsType = QueryData<ReturnType<typeof getComments>>
  
