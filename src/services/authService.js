import api from './api';

const authService = {
  // Subscription APIs
  sendSubscriptionOtp: async (userData) => {
    const response = await api.post('/serverpeuser/mystudents/subscription/send-otp', {
      user_name: userData.name,
      mobile_number: userData.mobile,
      email: userData.email,
      collegeid: userData.collegeId,
      stateid: userData.stateId,
    });
    return response.data;
  },

  verifySubscriptionOtp: async (otpData) => {
    const response = await api.post('/serverpeuser/mystudents/subscription/verify-otp', {
      mobile_number: otpData.mobile,
      email: otpData.email,
      mobile_otp: otpData.mobileOtp,
      email_otp: otpData.emailOtp,
    });
    return response.data;
  },

  // Login APIs
  sendLoginOtp: async (inputField) => {
    const response = await api.post('/serverpeuser/mystudents/login/send-otp', {
      input_field: inputField,
    });
    return response.data;
  },

  verifyLoginOtp: async (inputField, otp) => {
    const response = await api.post('/serverpeuser/mystudents/login/verify-otp', {
      input_field: inputField,
      otp: otp,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/serverpeuser/loggedinstudent/logout');
    return response.data;
  },

  // Get user profile
  getUserProfile: async () => {
    const response = await api.get('/serverpeuser/loggedinstudent/user-profile');
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    const response = await api.patch('/serverpeuser/loggedinstudent/user-profile', {
      user_name: userData.userName,
      fk_college_id: userData.collegeId,
      fk_state_id: userData.stateId,
    });
    return response.data;
  },
};

export default authService;
