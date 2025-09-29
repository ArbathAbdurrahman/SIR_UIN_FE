// src/api.js
import axios from "axios";

const API_URL = "https://sirsakapi.teknohole.com/api"; // ganti sesuai backend kamu

// Simpan / ambil token dari localStorage
const getAccessToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

const setAccessToken = (token) => localStorage.setItem("access", token);
const setTokens = (access, refresh) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

// Axios instance
const axiosAuth = axios.create({
  baseURL: API_URL,
});

// Tambahkan access token di setiap request
axiosAuth.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Middleware untuk refresh token kalau access token expired
axiosAuth.interceptors.response.use(
  (response) => response, // kalau sukses, langsung return
  async (error) => {
    const originalRequest = error.config;

    // Cek kalau error 401 dan request belum pernah diulang
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        if (!refresh) throw new Error("No refresh token");

        // Minta access token baru
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh,
        });

        const newAccess = response.data.access;
        setAccessToken(newAccess);

        // Update header Authorization untuk request ulang
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // Ulangi request yang gagal
        return axiosAuth(originalRequest);
      } catch (err) {
        console.error("Refresh token expired atau invalid. Harus login ulang.");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // redirect ke login
      }
    }

    return Promise.reject(error);
  }
);

export { axiosAuth, setTokens };
