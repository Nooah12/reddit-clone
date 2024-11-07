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

/* import { createClient } from '@/utils/supabase/client';
import CreateComment from './createComment';
import DeleteCommentButton from './buttons/deleteCommentButton';

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
        <section className=''>
          {comments.map(({ id, comment, users }) => (
            <div key={id} className="mb-4">
              <p className='text-sm'><strong>{users?.email || 'anonymous'}:</strong> {comment}</p>
              {isCommentAuthor || isPostAuthor ? (
                <DeleteCommentButton commentId={id} />
              ) : null}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Comments; */






import { createClient } from '@/utils/supabase/client';
import CreateComment from './createComment';
import DeleteCommentButton from './buttons/deleteCommentButton';

export const revalidate = 60 * 15;

const Comments = async ({ postId, postAuthorId }: { postId: string, postAuthorId: string }) => {
  const supabase = createClient();

  const { data: comments, error } = await supabase
    .from('comments')
    .select('id, comment, user_id, users(email)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Failed to load comments</div>;
  }

  const { data: { user } } = await supabase.auth.getUser();
  //const currentUserId = user?.id;
  const isPostAuthor = user?.id === postAuthorId;

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
        <section>
          {comments.map(({ id, comment, users }) => {
            // Check if current user is either comment author or post author ??
            const isCommentAuthor = user?.id === users?.id;
            //const isCommentAuthor = user_id === currentUserId;
            //const isPostAuthor = postAuthorId === currentUserId;

            return (
              <div key={id} className="mb-4">
                <p className='text-sm'>
                  <strong>{users?.email || 'anonymous'}:</strong> {comment}
                </p>
                {(isCommentAuthor || isPostAuthor) && (
                  <DeleteCommentButton commentId={id} />
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Comments;
