import React, { useState, useEffect } from 'react';
import { createPost, updatePost, getPost } from './api';
import { useParams, useNavigate } from 'react-router-dom';

function PostForm() {
  const [post, setPost] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const { data } = await getPost(id);
          setPost(data);
          setIsEditing(true);
        } catch (err) {
          console.error("Error fetching post:", err);
          navigate('/');
        }
      };
      fetchPost();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updatePost(id, post);
      } else {
        await createPost(post);
      }
      navigate('/');
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <p>{isEditing ? 'Update your existing post' : 'Write something amazing!'}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter a captivating title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            required
            rows={15}
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;