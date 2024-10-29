import DeletePostButton from "@/components/buttons/deletePostButton"
import Comments from "@/components/comments"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, users("email"), user_id, title, content')
    .eq('slug', params.slug)
    .single()

  if (!data || error) notFound()

  const {data: { user }} = await supabase.auth.getUser()
  const isAuthor = user && user.id === data.user_id
  console.log(isAuthor, user, data.user_id)

  return (
    <main className="main">
      <article className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="mb-1 text-zinc-600">{data.users?.email}</span>
            <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
          </div>
          {isAuthor && <DeletePostButton postId={data.id} />}
        </div>
        <p>{data.content}</p>
      </article>
      <Comments postId={data.id} />
    </main>
  )
}
