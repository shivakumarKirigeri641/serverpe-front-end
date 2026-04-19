import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:7777";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getQueryTypes = async () => {
  const response = await apiClient.get("/serverpe/platform/public/query-types");
  return response.data;
};

export const submitContactQuery = async (formData) => {
  const response = await apiClient.post(
    "/serverpe/platform/public/contact-us",
    formData,
  );
  return response.data;
};

export const getPrivacyPolicy = async () => {
  const response = await apiClient.get(
    "/serverpe/platform/public/privacy-policy",
  );
  return response.data;
};

export const getTermsAndConditions = async () => {
  const response = await apiClient.get(
    "/serverpe/platform/public/terms-and-conditions",
  );
  return response.data;
};

export default apiClient;
