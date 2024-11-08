import { createClient } from '@/utils/supabase/client';
import CreateComment from './createComment';
import DeleteCommentButton from './buttons/deleteCommentButton';

export const revalidate = 60 * 15;

const Comments = async ({ postId, postAuthorId, currentUserId }: { postId: string, postAuthorId: string, currentUserId: string | undefined }) => {
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
  //const isPostAuthor = user && user.id === postAuthorId;
  //const currentUserId = user?.id;
  console.log({user})

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
          {comments.map(({ id, comment, users, user_id }) => {
            // Check if current user is either comment author or post author ??
            const isCommentAuthor = user_id === currentUserId;
            const isPostAuthor = postAuthorId === currentUserId;
           // console.log({isCommentAuthor, isPostAuthor})

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
