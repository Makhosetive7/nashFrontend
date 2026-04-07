import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = () => api.get('/get_products.php');
export const getProduct = (id) => api.get(`/get_products.php?id=${id}`);
export const createProduct = (formData) => {
  return axios.post(`${API_BASE_URL}/create_product.php`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updateProduct = (id, data) => api.put(`/update_products.php?id=${id}`, data);
export const deleteProduct = (id) => api.delete(`/delete_product.php?id=${id}`);

// Sales API
export const getSales = () => api.get('/get_sales.php');
export const createSale = (data) => api.post('/create_sale.php', data);
export const updateSale = (id, data) => api.put(`/update_sale.php?id=${id}`, data);
export const deleteSale = (id) => api.delete(`/delete_sale.php?id=${id}`);

// Dashboard API
export const getDashboard = () => api.get('/dashboard.php');

export default api;