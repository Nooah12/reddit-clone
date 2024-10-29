'use client'
import getPosts, { PostsType } from "@/utils/supabase/queries"
import { Post } from "../Post/Post"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"

export const PostList = ({initialPosts}: {initialPosts: PostsType}) => {
  const {data: posts} = useQuery({
    queryKey: ['postlist'], // home-posts / Gör denna?
    queryFn: async () => {
      const supabase = createClient()
      const {data, error} = await getPosts(supabase)

      if (error) throw error
      return data
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5min
  })

  return (
    <section className='flex flex-col items-center gap-4'>
      {posts.map(({id, title, slug, users}) => (
        <Post
          key={id}
          title={title}
          slug={slug}
          author={users?.email || 'anonymous'}
          />
      ))}
    </section>
  )
}
