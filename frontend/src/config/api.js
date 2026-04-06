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
  ADMINS: `${API_BASE_URL}/api/auth/admins`,
  SESSIONS: `${API_BASE_URL}/api/auth/sessions`,
  
  // Admin Management
  ADMIN_USERS: `${API_BASE_URL}/api/admin`,
  
  // About
  ABOUT: `${API_BASE_URL}/api/about`,
  
  // Donations
  DONATIONS: `${API_BASE_URL}/api/donations`,
  DONATIONS_STATS: `${API_BASE_URL}/api/donations/stats/summary`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Dashboard
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  
  // M-Pesa
  MPESA_STK: `${API_BASE_URL}/api/mpesa/stk-push`,
  
  // Test
  TEST: `${API_BASE_URL}/test`
};

export default API_BASE_URL;
