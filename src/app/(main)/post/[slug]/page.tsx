import Comments from "@/components/comments"
import { createClient } from "@/utils/supabase/client"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, users("email"), title, content')
    .eq('slug', params.slug)
    .single()

  if (!data || error) notFound()

  return (
    <section className="main">
      <span className="mb-1 text-zinc-600">{data.users?.email}</span>
      <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
      <p>{data.content}</p>
      
      <Comments postId={data.id} />
    </section>
  )
}
