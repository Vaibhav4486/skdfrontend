import axiosClient from './axiosClient';

export const getPublishedFaqs = (category) =>
  axiosClient.get('/api/faqs', { params: category ? { category } : {} });

// admin
export const getAllFaqsForAdmin = () => axiosClient.get('/api/admin/faqs');
export const createFaq = (data) => axiosClient.post('/api/admin/faqs', data);
export const updateFaq = (id, data) => axiosClient.put(`/api/admin/faqs/${id}`, data);
export const setFaqPublished = (id, value) =>
  axiosClient.patch(`/api/admin/faqs/${id}/publish`, null, { params: { value } });
export const deleteFaq = (id) => axiosClient.delete(`/api/admin/faqs/${id}`);
