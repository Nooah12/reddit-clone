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
    .select('id, users("email"), user_id, title, content, image')
    .eq('slug', params.slug)
    .single()

  if (!post || error) notFound()

  const {data: { user }} = await supabase.auth.getUser()
  const isAuthor = user && user.id === post.user_id
  //console.log(isAuthor, user, post.user_id)

  return (
    <main className="main">
      <article className="mb-4">
        <div className="p-2 border rounded-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="block mb-1 font-normal text-zinc-600">{post.users?.email}</span>
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            {isAuthor && (
              <div className="flex gap-2">
                <Link href={`/post/${params.slug}/edit`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <DeletePostButton postId={post.id} />
              </div>
            )}
          </div>
          {post.image && (
            <img src={post.image} alt={`${post.title} image`} className="mb-4 rounded-lg max-w-xs h-auto" />
          )}
          <p className="text-sm">{post.content}</p>
        </div>
      </article>

      <Comments postId={post.id} postAuthorId={post.user_id} currentUserId={user?.id} />
    </main>


  )
}
