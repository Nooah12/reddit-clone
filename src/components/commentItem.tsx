import DeleteCommentButton from './buttons/deleteCommentButton';
import ReplyCommentForm from './buttons/replyCommentForm';
import { type Comment } from './comments';

type CommentProps = {
  comment: Comment;
  postId: string;
  postAuthorId: string;
  currentUserId?: string;
};

const CommentItem = ({ comment, postId, postAuthorId, currentUserId }: CommentProps) => {
  const { id, comment: text, users, user_id, replies } = comment;
  const isCommentAuthor = user_id === currentUserId;
  const isPostAuthor = postAuthorId === currentUserId;

  return (
    <div className="ml-4 mt-4 border-l pl-4"> {/* Indented styling for replies */}
      <p className='text-sm'>
        <strong>{users?.email || 'anonymous'}:</strong> {text}
      </p>

      {currentUserId && (
        <>
          {(isCommentAuthor || isPostAuthor) && (
            <DeleteCommentButton commentId={id} />
          )}
          <ReplyCommentForm postId={postId} parentId={id} />
        </>
      )}

      {replies.length > 0 && (
        <div className="ml-4"> {/* Nested comments */}
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
