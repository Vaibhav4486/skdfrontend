import axiosClient from './axiosClient';

export const getAllServices = () => axiosClient.get('/api/services');
export const getServiceBySlug = (slug) => axiosClient.get(`/api/services/${slug}`);

// admin
export const createService = (data) => axiosClient.post('/api/admin/services', data);
export const updateService = (id, data) => axiosClient.put(`/api/admin/services/${id}`, data);
export const deleteService = (id) => axiosClient.delete(`/api/admin/services/${id}`);
