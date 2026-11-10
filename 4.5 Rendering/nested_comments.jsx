// NOTE: CommentSystem.css (slide 19) is imported here; the slide does not show the import line.
import './CommentSystem.css';
import { useState } from 'react';

function CommentsSystem() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a great post!',
      timestamp: new Date('2024-01-15T10:30:00'),
      likes: 5,
      replies: [
        {
          id: 2,
          author: 'Jane Smith',
          content: 'I totally agree!',
          timestamp: new Date('2024-01-15T11:00:00'),
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: 3,
      author: 'Bob Wilson',
      content: 'Thanks for sharing this information.',
      timestamp: new Date('2024-01-15T12:00:00'),
      likes: 3,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Current User',
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        replies: []
      };

      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  const addReply = (parentId) => {
    if (replyContent.trim()) {
      const reply = {
        id: Date.now(),
        author: 'Current User',
        content: replyContent,
        timestamp: new Date(),
        likes: 0,
        replies: []
      };

      const addReplyToComment = (comments) => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, reply] };
          } else if (comment.replies.length > 0) {
            return { ...comment, replies: addReplyToComment(comment.replies) };
          }
          return comment;
        });
      };

      setComments(prev => addReplyToComment(prev));
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const likeComment = (commentId) => {
    const updateLikes = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: updateLikes(comment.replies) };
        }
        return comment;
      });
    };

    setComments(prev => updateLikes(prev));
  };

  // FIX: the slide assigns "comment.replies = ..." inside filter, which changes the old state object in place.
  // State must be updated immutably (lesson 4.2), so new objects are returned with filter + map instead.
  const deleteComment = (commentId) => {
    const removeComment = (comments) => {
      return comments
        .filter(comment => comment.id !== commentId)
        .map(comment => ({ ...comment, replies: removeComment(comment.replies) }));
    };

    setComments(prev => removeComment(prev));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // KNOWN LIMITATION (as on the slide): CommentComponent is defined inside CommentsSystem, so React sees a
  // new component on every render and the reply textarea loses focus after each keystroke.
  // The presenter's-notes version (09b-nested-comments-presenter-notes.jsx) defines it outside and avoids this.
  const CommentComponent = ({ comment, depth = 0 }) => (
    <div
      className="comment"
      style={{
        marginLeft: `${depth * 20}px`,
        borderLeft: depth > 0 ? '2px solid #eee' : 'none',
        paddingLeft: depth > 0 ? '10px' : '0'
      }}
    >
      <div className="comment-header">
        <strong>{comment.author}</strong>
        <span className="timestamp">{formatTime(comment.timestamp)}</span>
      </div>

      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

      <div className="comment-actions">
        <button onClick={() => likeComment(comment.id)}>
          👍 {comment.likes}
        </button>
        <button onClick={() => setReplyingTo(comment.id)}>
          Reply
        </button>
        <button onClick={() => deleteComment(comment.id)}>
          Delete
        </button>
      </div>

      {replyingTo === comment.id && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            rows="2"
          />
          <div>
            <button onClick={() => addReply(comment.id)}>
              Post Reply
            </button>
            <button onClick={() => setReplyingTo(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="comments-system">
      <h3>Comments ({comments.length})</h3>

      <div className="new-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />
        <button onClick={addComment}>Post Comment</button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentsSystem;
