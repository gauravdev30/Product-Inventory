import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchCategories = () => API.get('/categories');
export const addProduct = (data) => API.post('/products', data);
export const fetchProducts = (params) => API.get('/products', { params });
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
