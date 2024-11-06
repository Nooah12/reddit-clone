import { Button } from "@/components/buttons/button"
import DeletePostButton from "@/components/buttons/deletePostButton"
import Comments from "@/components/comments"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, users("email"), user_id, title, content')
    .eq('slug', params.slug)
    .single()

  if (!post || error) notFound()

  const {data: { user }} = await supabase.auth.getUser()
  const isAuthor = user && user.id === post.user_id
  console.log(isAuthor, user, post.user_id)

  return (
    <main className="main">
      <article className="mb-4">
        <div className="flex-wrap flex items-start justify-between p-2 border rounded-xl bg-white">
          <div>
            <span className="mb-1 text-zinc-600">{post.users?.email}</span>
            <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
          </div>
          {isAuthor && 
          <Link href={`/post/${params.slug}/edit`} className="flex gap-2">
            <Button>Edit</Button>
            <DeletePostButton postId={post.id} />
          </Link>}
          <p className="text-sm">{post.content}</p>
        </div>
        
      </article>
      <Comments postId={post.id} />
    </main>
  )
}
