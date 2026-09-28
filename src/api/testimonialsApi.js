import axiosClient from './axiosClient';

export const getApprovedTestimonials = (serviceUsed) =>
  axiosClient.get('/api/testimonials', { params: serviceUsed ? { serviceUsed } : {} });

export const submitTestimonial = (data) => axiosClient.post('/api/testimonials', data);

// admin
export const getAllTestimonialsForAdmin = () => axiosClient.get('/api/admin/testimonials');
export const approveTestimonial = (id) => axiosClient.patch(`/api/admin/testimonials/${id}/approve`);
