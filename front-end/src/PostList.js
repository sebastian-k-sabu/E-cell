import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from './api';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="post-list-container">
      <h2 className="section-title">Blog Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <Link to={`/post/${post._id}`} className="post-link">
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <p className="post-preview">{post.content.substring(0, 100)}...</p>
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <div className="post-actions">
              <button 
                onClick={() => handleDelete(post._id)}
                className="delete-button"
              >
                Delete
              </button>
              <Link 
                to={`/edit/${post._id}`} 
                className="edit-button"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
