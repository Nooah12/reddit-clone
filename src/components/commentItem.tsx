import DeleteCommentButton from './buttons/deleteCommentButton';
import ReplyCommentForm from './buttons/replyCommentForm';
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
    <div className="mb-4"> {/* Base margin for each comment */}
      {/* Top-level comment */}
      <div className="rounded-md p-1 border">   {/*  border-l-2 border-gray-200 */}
        <div className='flex justify-between'>
          <p className="text-sm font-bold text-gray-600">{users?.email || 'anonymous'}</p>
          {(isCommentAuthor || isPostAuthor) && (
              <DeleteCommentButton commentId={id} />
            )}
        </div>
        <p className="text-sm text-gray-600 my-1">{commentText}</p>

        <div className="flex items-center gap-2 text-sm"> {/* reply form */}
          <ReplyCommentForm postId={postId} parentId={id} />
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="ml-4 md:ml-6 mt-4 space-y-4"> {/* Indent and style replies */}
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
