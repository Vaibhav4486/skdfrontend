import axiosClient from './axiosClient';

export const getCaseByReferenceNumber = (referenceNumber) =>
  axiosClient.get(`/api/cases/${referenceNumber}`);

// admin
export const getAllCasesForAdmin = () => axiosClient.get('/api/admin/cases');
export const createCase = (data) => axiosClient.post('/api/admin/cases', data);
export const addStatusUpdate = (id, data) =>
  axiosClient.post(`/api/admin/cases/${id}/status-updates`, data);
