import { createClient } from '@/utils/supabase/server'
import getHomePosts from '@/utils/supabase/queries'
import { Post } from "@/components/Post";

// export const dynamic = 'force-dynamic' // stänger av cashe helt på denna sida
export const revalidate = 60 * 15 // 15 min

export default async function Home() { // server component
  const supabase = createClient()
  const { data: posts, error } = await getHomePosts(supabase)

  return (
    <main className='main space-y-12'>
      <h1 className='text-lg underline'>Latest posts</h1> 
      {error || posts.length === 0 ? (
        <div>no posts found mf</div>
      ) : ( 
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
      )}
    </main>
  )
}
