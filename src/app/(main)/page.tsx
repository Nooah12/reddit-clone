import {PostList} from "@/components/PostList/PostList";
import { createClient } from '@/utils/supabase/server'
import getHomePosts from '@/utils/supabase/queries'

// export const dynamic = 'force-dynamic' // stänger av cashe helt på denna sida

export default async function Home() { // server component
  const supabase = createClient()
  const { data: posts, error } = await getHomePosts(supabase)

  return (
    <main className='main space-y-12 self-center'>
      <h1>Latest Posts</h1> 
      {error || posts.length === 0 ? (
        <div>no posts found mf</div>
      ) : ( 
      <PostList initialPosts={posts} />
      )}
    </main>
  )
}
