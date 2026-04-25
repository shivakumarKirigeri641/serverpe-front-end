import axios from "axios";
import CryptoJS from "crypto-js";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:7777";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

function decryptResponse(payload) {
  const key = CryptoJS.SHA256(SECRET_KEY);
  const iv = CryptoJS.enc.Base64.parse(payload.iv);
  const decrypted = CryptoJS.AES.decrypt(payload.data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.encrypted) {
      response.data = decryptResponse(response.data);
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.encrypted
    ) {
      error.response.data = decryptResponse(error.response.data);
    }
    return Promise.reject(error);
  },
);

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

export const getProjectPricings = async () => {
  const response = await apiClient.get(
    "/serverpe/platform/public/project-pricings",
  );
  return response.data;
};

export default apiClient;
