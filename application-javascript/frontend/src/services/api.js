// src/services/api.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api'; // Ensure this matches your backend server URL

export const getAssets = () => axios.get(`${API_URL}/assets`);
export const createAsset = (asset) => axios.post(`${API_URL}/assets`, asset);
export const updateAsset = (id, asset) => axios.put(`${API_URL}/assets/${id}`, asset);
export const deleteAsset = (id) => axios.delete(`${API_URL}/assets/${id}`);
