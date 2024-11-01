import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { EditPostForm } from "./form"

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const supabase = createClient()

    const {data: post, error} = await supabase
        .from('posts')
        .select('id, user_id, title, content')
        .eq('slug', params.slug)
        .single()

    const {data: {user}} = await supabase.auth.getUser()
    const isAuthor = user && user.id === post?.user_id

    if (error || !post || !isAuthor) notFound()
        
    return (
        <main className="main">
            <h1 className='mb-8 pl-2 text-2xl font-bold'>Edit post</h1>
            <EditPostForm defaultValues={{title: post.title, content: post.content}} postId={post.id} />
        </main>
    )
}