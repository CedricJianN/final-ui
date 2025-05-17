import { useState } from 'react';
import { updatePost, deletePost } from '../api';

function PostItem({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [updatedImageUrl, setUpdatedImageUrl] = useState(post.imageUrl);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      content: updatedContent,
      imageUrl: updatedImageUrl,
      author: post.author,
    };
    await updatePost(post.id, updatedPost);
    setIsEditing(false);
    window.location.reload();
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(post.id);
      window.location.reload();
    }
  };

  const handleAddComment = () => {
    if (commentInput.trim() !== '') {
      setComments([...comments, commentInput]);
      setCommentInput('');
    }
  };

  return (
    <>
      <div className="post-item">
        <strong>{post.author}</strong>
        <p>{post.content}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
        
        <div className="post-actions">
          <button onClick={handleLike} className="action-button">
            <span className="icon">{liked ? '❤️' : '🤍'}</span> Like ({likesCount})
          </button>
          <button onClick={() => setShowCommentBox(!showCommentBox)} className="action-button">
            <span className="icon">💬</span> Comment
          </button>
          <button onClick={() => setIsEditing(true)} className="action-button">
            <span className="icon">✏️</span> Edit
          </button>
          {post.imageUrl && (
            <button onClick={() => setShowFullscreen(true)} className="action-button">
              <span className="icon">🔍</span> Fullscreen
            </button>
          )}
          <button onClick={handleDelete} className="action-button delete-button">
            <span className="icon">🗑️</span> Delete
          </button>
        </div>

        {showCommentBox && (
          <div className="comment-section">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        )}

        {comments.length > 0 && (
          <div className="comments-list">
            {comments.map((comment, index) => (
              <p key={index}><strong>You:</strong> {comment}</p>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsEditing(false)}>×</button>
            <h3>Edit Post</h3>
            <form onSubmit={handleEdit} className="edit-form">
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                required
              />
              <input
                type="text"
                value={updatedImageUrl}
                onChange={(e) => setUpdatedImageUrl(e.target.value)}
                placeholder="New Image URL (optional)"
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFullscreen && (
        <div className="modal-overlay" onClick={() => setShowFullscreen(false)}>
          <div className="fullscreen-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowFullscreen(false)}>×</button>
            <strong>{post.author}</strong>
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Fullscreen" className="fullscreen-image" />}
            
            <div className="post-actions">
              <button onClick={handleLike} className="action-button">
                <span className="icon">{liked ? '❤️' : '🤍'}</span> Like ({likesCount})
              </button>
              <button onClick={() => setShowCommentBox(!showCommentBox)} className="action-button">
                <span className="icon">💬</span> Comment
              </button>
              <button onClick={() => { setIsEditing(true); setShowFullscreen(false); }} className="action-button">
                <span className="icon">✏️</span> Edit
              </button>
              <button onClick={handleDelete} className="action-button delete-button">
                <span className="icon">🗑️</span> Delete
              </button>
            </div>

            {showCommentBox && (
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button onClick={handleAddComment}>Post</button>
              </div>
            )}

            {comments.length > 0 && (
              <div className="comments-list">
                {comments.map((comment, index) => (
                  <p key={index}><strong>You:</strong> {comment}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PostItem;