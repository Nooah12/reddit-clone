/* 'use client'
import { createClient } from '@/utils/supabase/client' // client and not server??
import CreateComment from './createComment'

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
      return (
        <div className='flex'>
          <div className='basis-12 mr-4'>
            <img src="/thinking-snoo.png" alt="snoo-logo" className='w-auto' />
          </div>
          <div className='basis-full'>
            <p className='text-lg font-semibold mb-4'>Be the first to comment</p>
            <p className='text-sm font-light'>
              Nobody's responded to this post yet.<br />
              Add your thoughts and get the conversation going.
            </p>
          </div>
        </div>
      )
    }

  return (
    <>
      <CreateComment postId={postId} />
      {comments?.map(({ id, comment, users }) => (
        <div key={id}>
          <p><strong>{users?.email || 'anonymous'}:</strong> {comment}</p>
        </div>
      ))}
    </>
  )
}

export default Comments */


// comments.tsx

import { createClient } from '@/utils/supabase/client';
import CreateComment from './createComment';

export const revalidate = 60 * 15;

const Comments = async ({ postId }: { postId: string }) => {
  const supabase = createClient();
  const { data: comments, error } = await supabase
    .from('comments')
    .select('id, comment, users("email")')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Failed to load comments</div>;
  }

  return (
    <div>
      <CreateComment postId={postId} />
      {comments.length === 0 ? (
        <div className='flex mt-8'>
          <div className='basis-12 mr-4'>
            <img src="/thinking-snoo.png" alt="snoo-logo" className='w-auto' />
          </div>
          <div className='basis-full'>
            <p className='text-lg font-semibold mb-4'>Be the first to comment</p>
            <p className='text-sm font-light'>
              Nobody's responded to this post yet.<br />
              Add your thoughts and get the conversation going.
            </p>
          </div>
        </div>
      ) : (
        comments.map(({ id, comment, users }) => (
          <div key={id}>
            <p><strong>{users?.email || 'anonymous'}:</strong> {comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;

