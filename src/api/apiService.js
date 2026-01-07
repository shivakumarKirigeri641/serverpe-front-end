import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

const apiService = {
  // Public
  fetchStates: () => axiosInstance.get(ENDPOINTS.STATES),
  fetchProjects: () => axiosInstance.get(ENDPOINTS.PROJECT_LIST),
  fetchDisclaimer: () => axiosInstance.get(ENDPOINTS.DISCLAIMER_LIST),
  fetchContactCategories: () => axiosInstance.get(ENDPOINTS.CONTACT_CATEGORIES),
  submitContactForm: (data) => axiosInstance.post(ENDPOINTS.CONTACT_US, data),
  
  // Auth - Login
  loginSendOtp: (inputField) => axiosInstance.post(ENDPOINTS.LOGIN_SEND_OTP, { input_field: inputField }),
  loginVerifyOtp: (inputField, otp) => axiosInstance.post(ENDPOINTS.LOGIN_VERIFY_OTP, { input_field: inputField, otp }),
  
  // Auth - Subscription
  subscriptionSendOtp: (data) => axiosInstance.post(ENDPOINTS.SUBSCRIPTION_SEND_OTP, data),
  subscriptionVerifyOtp: (data) => axiosInstance.post(ENDPOINTS.SUBSCRIPTION_VERIFY_OTP, data),
  
  // Protected
  logout: () => axiosInstance.post(ENDPOINTS.LOGOUT),
  fetchUserProfile: () => axiosInstance.get(ENDPOINTS.USER_PROFILE),
  updateUserProfile: (data) => axiosInstance.patch(ENDPOINTS.USER_PROFILE, data),
  fetchPurchaseDetails: (id) => axiosInstance.get(ENDPOINTS.PURCHASE_DETAILS(id)),
  fetchPurchaseHistory: () => axiosInstance.get(ENDPOINTS.PURCHASE_HISTORY),
  fetchPurchasedOrderDetails: (orderId) => axiosInstance.get(ENDPOINTS.PURCHASED_ORDER_DETAILS(orderId)),
};

export default apiService;
