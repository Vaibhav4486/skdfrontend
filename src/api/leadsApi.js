import axiosClient from './axiosClient';

export const createLead = (data) => axiosClient.post('/api/leads', data);

// admin
export const getAllLeads = (status) =>
  axiosClient.get('/api/admin/leads', { params: status ? { status } : {} });
export const updateLeadStatus = (id, value) =>
  axiosClient.patch(`/api/admin/leads/${id}/status`, null, { params: { value } });
