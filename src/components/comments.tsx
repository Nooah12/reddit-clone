/* import { createClient } from '@/utils/supabase/client'
import getComments, { CommentsType } from '@/utils/supabase/queries'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const comments = ({initialComments}: {initialComments: CommentsType}) => {
    const {data: comments} = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const supabase = createClient()
            const {data, error} = await getComments(supabase)

            if (error) throw error
            return data
        },
        initialData: initialComments,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5, // 5min
    })
  return (
    <div>
        {comments.map(({id, comments}) => (
            
        ))}
    </div>
  )
}

export default comments */

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
      return <p>Cant load comments</p>
    }
    
    if (comments.length === 0) {
      return <p>No comments</p>
    }

  return (
    <div>
      {comments?.map(({ id, comment, users }) => (
        <div key={id}>
          <p><strong>{users?.email || 'anonymous'}:</strong>{comment}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments
