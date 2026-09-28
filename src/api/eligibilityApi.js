import axiosClient from './axiosClient';

export const checkEligibility = (data) => axiosClient.post('/api/eligibility/check', data);
