import { createClient } from '@/utils/supabase/client';
import CreateCommentForm from './forms/createCommentForm';
import CommentItem from './commentItem';

export const revalidate = 60 * 15;

export type Comment = {
  id: string;
  comment: string;
  user_id: string;
  users: { email: string };
  parent_id: string | null;
  replies: Comment[];
};

type CommentFromDB = Omit<Comment, 'replies'>;

function nestComments(comments: CommentFromDB[]): Comment[] {
  const commentMap: { [key: string]: Comment } = {};

  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Build nested structure
  const nestedComments: Comment[] = [];
  comments.forEach(comment => {
    if (comment.parent_id) {
      commentMap[comment.parent_id]?.replies.push(commentMap[comment.id]);
    } else {
      nestedComments.push(commentMap[comment.id]);
    }
  });

  return nestedComments;
}

const Comments = async ({ postId, postAuthorId, currentUserId }: { postId: string, postAuthorId: string, currentUserId?: string }) => {
  const supabase = createClient();

  const { data: comments, error } = await supabase
    .from('comments')
    .select('id, comment, user_id, users(email), parent_id')
    .eq('post_id', postId)
    .order('created_at', { ascending: true }) as { 
      data: CommentFromDB[] | null, 
      error: any 
    };

  if (error) {
    return <div>Failed to load comments</div>;
  }

  const nestedComments = nestComments(comments || []);

  return (
    <>
      {currentUserId && <CreateCommentForm postId={postId} />}
      {nestedComments.length === 0 ? (
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
        <section className='flex flex-col'> {/* gap-4 md:gap-6 ok ta bort gap helt? */}
        {nestedComments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            postAuthorId={postAuthorId}
            currentUserId={currentUserId}
          />
        ))}
      </section>
      )}
    </>
  );
};

export default Comments;