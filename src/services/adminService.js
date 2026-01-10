import api from './api';

const adminService = {
  // ===== Analytics & Statistics =====
  
  /**
   * Get platform overview statistics
   * Includes users, licenses, revenue, sales, downloads
   */
  getAnalyticsOverview: async () => {
    const response = await api.get('/admin/analytics/overview');
    return response.data;
  },

  // ===== License Management =====
  
  /**
   * Get all licenses with optional filters
   * @param {Object} filters - { page, limit, status, bound, search }
   */
  getAllLicenses: async (filters = {}) => {
    const { page = 1, limit = 20, status, bound, search } = filters;
    const params = { page, limit };
    if (status) params.status = status;
    if (bound !== undefined) params.bound = bound;
    if (search) params.search = search;
    
    const response = await api.get('/admin/licenses', { params });
    return response.data;
  },

  /**
   * Get detailed information about a specific license
   * @param {string} licenseKey - License key
   */
  getLicenseDetails: async (licenseKey) => {
    const response = await api.get(`/admin/licenses/${licenseKey}`);
    return response.data;
  },

  /**
   * Reset device fingerprint for a license
   * @param {string} licenseKey - License key to reset
   */
  resetLicenseFingerprint: async (licenseKey) => {
    const response = await api.post(`/admin/licenses/${licenseKey}/reset-fingerprint`);
    return response.data;
  },

  /**
   * Activate a license
   * @param {string} licenseKey - License key to activate
   */
  activateLicense: async (licenseKey) => {
    const response = await api.post(`/admin/licenses/${licenseKey}/activate`);
    return response.data;
  },

  /**
   * Deactivate a license
   * @param {string} licenseKey - License key to deactivate
   */
  deactivateLicense: async (licenseKey) => {
    const response = await api.post(`/admin/licenses/${licenseKey}/deactivate`);
    return response.data;
  },

  // ===== User Management =====
  
  /**
   * Get all users with optional filters
   * @param {Object} filters - { page, limit, search }
   */
  getAllUsers: async (filters = {}) => {
    const { page = 1, limit = 20, search } = filters;
    const params = { page, limit };
    if (search) params.search = search;
    
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  /**
   * Get specific user's purchase history
   * @param {number} userId - User ID
   */
  getUserPurchases: async (userId) => {
    const response = await api.get(`/admin/users/${userId}/purchases`);
    return response.data;
  },

  /**
   * Grant admin privileges to a user
   * @param {number} userId - User ID to grant admin
   */
  grantAdminPrivileges: async (userId) => {
    const response = await api.post(`/admin/users/${userId}/make-admin`);
    return response.data;
  },

  /**
   * Revoke admin privileges from a user
   * @param {number} userId - User ID to revoke admin
   */
  revokeAdminPrivileges: async (userId) => {
    const response = await api.post(`/admin/users/${userId}/remove-admin`);
    return response.data;
  },

  // ===== System Monitoring =====
  
  /**
   * Check system health and database connectivity
   */
  getSystemHealth: async () => {
    const response = await api.get('/admin/system/health');
    return response.data;
  },
};

export default adminService;
