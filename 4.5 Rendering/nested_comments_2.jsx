// Full version from the presenter's notes of slide 18 (memoized Comment component defined outside the main component).
// CommentSystem.css is the code from the presenter's note on slide 19; the import below is not shown in the notes.
import './CommentSystem.css';
import React, { useState, useCallback, memo } from "react";

/* ---------- Pure helpers (immutable) ---------- */

const addReplyToComments = (comments, parentId, reply) => {
  return comments.map(c => {
    if (c.id === parentId) {
      return { ...c, replies: [...(c.replies || []), reply] };
    }
    if (c.replies && c.replies.length > 0) {
      return { ...c, replies: addReplyToComments(c.replies, parentId, reply) };
    }
    return c;
  });
};

const updateLikesInComments = (comments, targetId) => {
  return comments.map(c => {
    if (c.id === targetId) {
      return { ...c, likes: (c.likes || 0) + 1 };
    }
    if (c.replies && c.replies.length > 0) {
      return { ...c, replies: updateLikesInComments(c.replies, targetId) };
    }
    return c;
  });
};

const removeCommentFromComments = (comments, targetId) => {
  // Return a new array without the target comment (search recursively)
  return comments
    .map(c => {
      // If this comment has replies, process them immutably
      if (c.replies && c.replies.length > 0) {
        return { ...c, replies: removeCommentFromComments(c.replies, targetId) };
      }
      return c;
    })
    .filter(c => c.id !== targetId);
};

/* ---------- Small util ---------- */

const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

/* ---------- Comment render component (memoized) ---------- */

const Comment = memo(function Comment({
  comment,
  depth = 0,
  onReplyClick,
  replyingTo,
  replyValue,
  onReplyChange,
  onPostReply,
  onCancelReply,
  onLike,
  onDelete
}) {
  return (
    <div
      className="comment"
      style={{
        marginLeft: `${depth * 20}px`,
        borderLeft: depth > 0 ? '2px solid #eee' : 'none',
        paddingLeft: depth > 0 ? '10px' : '0',
        marginBottom: '8px'
      }}
    >
      <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{comment.author}</strong>
          <div style={{ fontSize: '12px', color: '#666' }}>{formatTime(comment.timestamp)}</div>
        </div>
        <div>
          <button onClick={() => onLike(comment.id)}>👍 {comment.likes || 0}</button>
          <button onClick={() => onReplyClick(comment.id)}>Reply</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
      </div>

      <div className="comment-content">
        <p style={{ marginTop: 6 }}>{comment.content}</p>
      </div>

      {replyingTo === comment.id && (
        <div className="reply-form" style={{ marginTop: 6 }}>
          <textarea
            value={replyValue || ''}
            onChange={(e) => onReplyChange(comment.id, e.target.value)}
            placeholder="Write a reply..."
            rows="2"
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: 4 }}>
            <button onClick={() => onPostReply(comment.id)}>Post Reply</button>
            <button onClick={() => onCancelReply()}>Cancel</button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies" style={{ marginTop: 8 }}>
          {comment.replies.map(r => (
            <Comment
              key={r.id}
              comment={r}
              depth={depth + 1}
              onReplyClick={onReplyClick}
              replyingTo={replyingTo}
              replyValue={replyValue}
              onReplyChange={onReplyChange}
              onPostReply={onPostReply}
              onCancelReply={onCancelReply}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
});

/* ---------- Main component ---------- */

function CommentsSystem() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a great post!',
      timestamp: new Date('2024-01-15T10:30:00').toISOString(),
      likes: 5,
      replies: [
        {
          id: 2,
          author: 'Jane Smith',
          content: 'I totally agree!',
          timestamp: new Date('2024-01-15T11:00:00').toISOString(),
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: 3,
      author: 'Bob Wilson',
      content: 'Thanks for sharing this information.',
      timestamp: new Date('2024-01-15T12:00:00').toISOString(),
      likes: 3,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContents, setReplyContents] = useState({}); // { [commentId]: 'text' }

  const addComment = useCallback(() => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Current User',
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  }, [newComment]);

  const addReply = useCallback((parentId) => {
    const content = (replyContents[parentId] || '').trim();
    if (!content) return;

    const reply = {
      id: Date.now(),
      author: 'Current User',
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(prev => addReplyToComments(prev, parentId, reply));
    setReplyContents(prev => {
      const copy = { ...prev };
      delete copy[parentId];
      return copy;
    });
    setReplyingTo(null);
  }, [replyContents]);

  const likeComment = useCallback((commentId) => {
    setComments(prev => updateLikesInComments(prev, commentId));
  }, []);

  const deleteComment = useCallback((commentId) => {
    setComments(prev => removeCommentFromComments(prev, commentId));
    // close reply form if it targeted the deleted comment
    setReplyingTo(prev => (prev === commentId ? null : prev));
    setReplyContents(prev => {
      const copy = { ...prev };
      delete copy[commentId];
      return copy;
    });
  }, []);

  const handleReplyChange = useCallback((id, text) => {
    setReplyContents(prev => ({ ...prev, [id]: text }));
  }, []);

  const handleReplyClick = useCallback((id) => {
    setReplyingTo(id);
    // ensure we at least have an entry in replyContents for focus stability
    setReplyContents(prev => prev[id] !== undefined ? prev : { ...prev, [id]: '' });
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  return (
    <div className="comments-system" style={{ maxWidth: 700 }}>
      <h3>Comments ({comments.length})</h3>

      <div className="new-comment" style={{ marginBottom: 12 }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          style={{ width: '100%' }}
        />
        <button onClick={addComment} style={{ marginTop: 6 }}>Post Comment</button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              depth={0}
              onReplyClick={handleReplyClick}
              replyingTo={replyingTo}
              replyValue={replyingTo ? replyContents[replyingTo] : ''}
              onReplyChange={handleReplyChange}
              onPostReply={addReply}
              onCancelReply={handleCancelReply}
              onLike={likeComment}
              onDelete={deleteComment}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentsSystem;
