import { useState } from 'react';
import { createPost } from '../api';

function PostForm({ onClose }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState(''); // New state for author input

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !author) return; // Require both content and author
    await createPost({ content, imageUrl, author });
    setContent('');
    setImageUrl('');
    setAuthor('');
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Create New Post</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit" className="post-submit-button">Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;