import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const edaService = {
  // Get health status
  getHealth: async () => {
    const response = await apiClient.get('/health/');
    return response.data;
  },

  // Get filter options
  getFilterOptions: async () => {
    const response = await apiClient.get('/filters/');
    return response.data;
  },

  // Get all dashboard data
  getDashboardData: async (filters = {}) => {
    const response = await apiClient.post('/dashboard/', { filters });
    return response.data;
  },

  // Get sales by year
  getSalesByYear: async (filters = {}) => {
    const response = await apiClient.post('/sales-by-year/', { filters });
    return response.data;
  },

  // Get volume by year
  getVolumeByYear: async (filters = {}) => {
    const response = await apiClient.post('/volume-by-year/', { filters });
    return response.data;
  },

  // Get monthly trend
  getMonthlyTrend: async (filters = {}) => {
    const response = await apiClient.post('/monthly-trend/', { filters });
    return response.data;
  },

  // Get market share
  getMarketShare: async (filters = {}, metric = 'sales') => {
    const response = await apiClient.post('/market-share/', { filters, metric });
    return response.data;
  },

  // Get summary statistics
  getSummary: async (filters = {}) => {
    const response = await apiClient.post('/summary/', { filters });
    return response.data;
  },
};

export default apiClient;
