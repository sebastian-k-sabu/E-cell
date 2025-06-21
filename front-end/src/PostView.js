import React, { useState, useEffect } from 'react';
import { getPost } from './api';
import { useParams, useNavigate } from 'react-router-dom';

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await getPost(id);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="back-button"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found-container">
        <p>Post not found</p>
        <button 
          onClick={() => navigate('/')}
          className="back-button"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="post-view-container">
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        ← Back
      </button>

      <div className="post-card">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="post-content">
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default PostView;