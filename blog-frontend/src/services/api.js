// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const getBlogs = async () => {
  return await axios.get(`${API_URL}blogs/`);
};

export const createBlog = async (blog) => {
  return await axios.post(`${API_URL}blogs/`, blog);
};

export const updateBlog = async (id, blog) => {
  return await axios.put(`${API_URL}blogs/${id}/`, blog);
};

export const deleteBlog = async (id) => {
  return await axios.delete(`${API_URL}blogs/${id}/`);
};

export const getPosts = async () => {
  return await axios.get(`${API_URL}posts/`);
};

export const createPost = async (post) => {
  return await axios.post(`${API_URL}posts/`, post);
};

export const updatePost = async (id, post) => {
  return await axios.put(`${API_URL}posts/${id}/`, post);
};

export const deletePost = async (id) => {
  return await axios.delete(`${API_URL}posts/${id}/`);
};
