'use client'
import getPosts, { PostsType } from "@/utils/supabase/queries"
import { Post } from "../Post/Post"
import { useQuery } from "@tanstack/react-query"

export const PostList = ({initialPosts}: {initialPosts: PostsType}) => {
  const {data: posts} = useQuery({
    queryKey: ['home-posts'],
    queryFn: async () => {
      const {data, error} = await getPosts()

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
