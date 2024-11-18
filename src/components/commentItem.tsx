/* import DeleteCommentButton from './buttons/deleteCommentButton';
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
    <div className="pl-4"> {/* comment div
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
        <div className='mt-2 md:mt-3 border-l'>
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

export default CommentItem; */


// vscode
/* import DeleteCommentButton from './buttons/deleteCommentButton';
import ReplyCommentForm from './buttons/replyCommentForm';
import { type Comment } from './comments';

type CommentProps = {
  comment: Comment;
  postId: string;
  postAuthorId: string;
  currentUserId?: string;
  isReply?: boolean;
};

const CommentItem = ({ 
  comment, 
  postId, 
  postAuthorId, 
  currentUserId,
  isReply = false 
}: CommentProps) => {
  const { id, comment: text, users, user_id, replies } = comment;
  const isCommentAuthor = user_id === currentUserId;
  const isPostAuthor = postAuthorId === currentUserId;

  return (
    <div className={`${isReply ? 'pl-4 border-l border-gray-300 ml-4' : 'border-b border-gray-200'} py-2`}>
      {/* Comment Content 
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">
            {users?.email || 'anonymous'} </span>
          
          {isPostAuthor && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              OP
            </span>
          )}
        </div>
        <p className='text-sm text-gray-800'>{text}</p>
      </div>

      {/* Comment Actions 
      {currentUserId && (
        <div className="flex items-center gap-2 mt-2">
          {(isCommentAuthor || isPostAuthor) && (
            <DeleteCommentButton commentId={id} />
          )}
          <ReplyCommentForm postId={postId} parentId={id} />
        </div>
      )}

      {/* Nested Replies 
      {replies.length > 0 && (
        <div className='mt-3 space-y-3'>
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              postAuthorId={postAuthorId}
              currentUserId={currentUserId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem; */





// chatgpt

import DeleteCommentButton from './buttons/deleteCommentButton';
import ReplyCommentForm from './buttons/replyCommentForm';
import { Comment } from './comments';

type CommentProps = {
  comment: Comment;
  postId: string;
  postAuthorId: string;
  currentUserId: string | undefined;
};

const CommentItem: React.FC<CommentProps> = ({ comment, postId, postAuthorId, currentUserId }) => {
  const { id, comment: commentText, users, user_id, replies } = comment;
  const isCommentAuthor = user_id === currentUserId;
  const isPostAuthor = postAuthorId === currentUserId;

  return (
    <div className="mb-4"> {/* Base margin for each comment */}
      {/* Top-level comment */}
      <div className="p-4 rounded-md border bg-white shadow-sm">
        <div className='flex justify-between'>
          <p className="text-sm font-semibold text-gray-800">{users?.email || 'anonymous'}</p>
          {(isCommentAuthor || isPostAuthor) && (
              <DeleteCommentButton commentId={id} />
            )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{commentText}</p>

        <div className="flex items-center gap-2 mt-2 text-sm text-blue-500">
       
          <ReplyCommentForm postId={postId} parentId={id} />
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4 space-y-4"> {/* Indent and style replies */}
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
