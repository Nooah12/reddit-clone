import DeleteCommentButton from './buttons/deleteCommentButton';
import ReplyCommentForm from './forms/replyCommentForm';
import { Comment } from './comments';

type CommentProps = {
  comment: Comment;
  postId: string;
  postAuthorId: string;
  currentUserId: string | undefined;
};

const CommentItem = ({ comment, postId, postAuthorId, currentUserId }: CommentProps) => {
  const { id, comment: commentText, users, user_id, replies } = comment;
  const isCommentAuthor = user_id === currentUserId;
  const isPostAuthor = postAuthorId === currentUserId;

  return (
    <div className="mb-4">
      <div className="rounded-2xl p-1 shadow-lg">   {/*  border-l-2 border-gray-200 */}
        <div className='flex justify-between'>
          <p className="text-sm font-bold text-gray-600">{users?.email || 'anonymous'}</p>
          {(isCommentAuthor || isPostAuthor) && (
              <DeleteCommentButton commentId={id} />
            )}
        </div>
        <p className="text-sm text-gray-600 my-1">{commentText}</p>
        
        <ReplyCommentForm postId={postId} parentId={id} />
      </div>

      {replies.length > 0 && (
        <div className="ml-4 md:ml-6 mt-2 space-y-4">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              postAuthorId={postAuthorId}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 



export default CommentItem;
