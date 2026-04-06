// API Configuration
export const API_BASE_URL = 'https://shareserve-backend.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Programs
  PROGRAMS: `${API_BASE_URL}/api/programs`,
  PROJECTS: `${API_BASE_URL}/api/projects`,
  
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
  // Admin
  ADMINS: `${API_BASE_URL}/api/admin`,
  
  // M-Pesa
  MPESA_STK: `${API_BASE_URL}/api/mpesa/stk-push`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Test
  TEST: `${API_BASE_URL}/test`
};

export default API_BASE_URL;
