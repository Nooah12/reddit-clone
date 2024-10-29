'use client'
import { createClient } from '@/utils/supabase/client'

export const revalidate = 60 * 15

const Comments = async ({ postId }: { postId: string }) => {
  const supabase = createClient()
  const {data: comments, error} = await supabase
    .from('comments')
    .select('id, comment, users("email")')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

    if (error) {
      return <div>Failed to load comments</div>
    }

    if (comments.length === 0) {
      return <div>No comments yet</div>
    }

  return (
    <>
      {comments?.map(({ id, comment, users }) => (
        <div key={id}>
          <p><strong>{users?.email || 'anonymous'}:</strong>{comment}</p>
        </div>
      ))}
    </>
  )
}

export default Comments
