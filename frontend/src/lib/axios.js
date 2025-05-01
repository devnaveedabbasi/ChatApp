import axios from 'axios';

export const axiosIntance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // Send cookies (access & refresh tokens)
});

// ✅ Axios Interceptor for Auto Refresh Token
axiosIntance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;


    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.message === "jwt expired"
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh token API
        await axiosIntance.post('/auth/refresh-token');
        return axiosIntance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
