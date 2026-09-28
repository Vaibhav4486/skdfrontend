import axiosClient from './axiosClient';

export const getAdminDashboardStats = () => axiosClient.get('/api/admin/dashboard');
export const getCustomerDashboard = () => axiosClient.get('/api/customer/dashboard');
