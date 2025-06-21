import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Get all posts
export const getPosts = () => axios.get(`${API_BASE}/posts`);

// Get single post
export const getPost = (id) => axios.get(`${API_BASE}/posts/${id}`);

// Create post
export const createPost = (postData) => axios.post(`${API_BASE}/posts`, postData);

// Update post
export const updatePost = (id, postData) => axios.put(`${API_BASE}/posts/${id}`, postData);

// Delete post
export const deletePost = (id) => axios.delete(`${API_BASE}/posts/${id}`);