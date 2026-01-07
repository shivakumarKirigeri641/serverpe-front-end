export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8888";

export const ENDPOINTS = {
  STATES: "/serverpeuser/mystudents/states",
  PROJECT_LIST: "/serverpeuser/mystudents/project-list",
  DISCLAIMER_LIST: "/serverpeuser/mystudents/disclaimer-before-buy-list",
  CONTACT_CATEGORIES: "/serverpeuser/mystudents/contact-categories",
  CONTACT_US: "/serverpeuser/mystudents/contact-categories", // POST
  LOGIN_SEND_OTP: "/serverpeuser/mystudents/login/send-otp",
  LOGIN_VERIFY_OTP: "/serverpeuser/mystudents/login/verify-otp",
  LOGOUT: "/serverpeuser/loggedinstudent/logout",
  USER_PROFILE: "/serverpeuser/loggedinstudent/user-profile", // GET & PATCH
  PURCHASE_DETAILS: (id) => `/serverpeuser/loggedinstudent/purchase-details/${id}`,
  PURCHASE_HISTORY: "/serverpeuser/loggedinstudent/purchase-history",
  PURCHASED_ORDER_DETAILS: (orderId) => `/serverpeuser/loggedinstudent/purchased-details/${orderId}`,
  SUBSCRIPTION_SEND_OTP: "/serverpeuser/mystudents/subscription/send-otp",
  SUBSCRIPTION_VERIFY_OTP: "/serverpeuser/mystudents/subscription/verify-otp",
};
