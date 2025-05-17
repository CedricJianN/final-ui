import axios from 'axios';

const API_URL = 'https://final-api-ntkv.onrender.com/api/posts';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/posts';

export const getPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (post) => {
  const res = await axios.post(API_URL, post);
  return res.data;
};

export const updatePost = async (id, post) => {
  const res = await axios.put(`${API_URL}/${id}`, post);
  return res.data;
};

export const likePost = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/like`);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
