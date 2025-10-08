import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast"; // pastikan path sesuai

const api = axios.create({
  baseURL: "https://sirsakapi.teknohole.com/api", // ganti sesuai API kamu
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Mengecek apakah token sudah kadaluarsa
 */
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true; // anggap expired jika gagal decode
  }
}

/**
 * Mencoba refresh access token
 */
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const res = await axios.post("https://sirsakapi.teknohole.com/api/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = res.data.access;
    const newRefreshToken = res.data.refresh || refreshToken;

    // Simpan token baru ke localStorage
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);

    console.info("Access token berhasil diperbarui otomatis.");
    return newAccessToken;
  } catch (err) {
    console.error("Gagal refresh token:", err);
    return null;
  }
}

/**
 * Menangani logout yang halus
 */
function handleLogoutSmooth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  toast({
    title: "Sesi berakhir",
    description: "Silakan login kembali untuk melanjutkan.",
    variant: "destructive",
  });

  // Delay sedikit agar toast sempat tampil sebelum redirect
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
}

/**
 * === REQUEST INTERCEPTOR ===
 * Cek apakah access_token sudah expired sebelum mengirim request
 */
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("access_token");

  // Jika token ada dan sudah expired → refresh dulu
  if (token && isTokenExpired(token)) {
    console.log("Access token expired, mencoba refresh...");
    token = await refreshAccessToken();

    if (!token) {
      handleLogoutSmooth();
      throw new Error("Sesi berakhir. Gagal refresh token.");
    }
  }

  // Tambahkan header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * === RESPONSE INTERCEPTOR ===
 * Tangani error 401 (Unauthorized) kalau muncul di response
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 401 dan belum dicoba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (newToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } else {
        handleLogoutSmooth();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
