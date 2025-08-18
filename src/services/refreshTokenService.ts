import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({baseURL: 'http://localhost:5277', withCredentials: true});

// let accessToken: string = ""
// API.interceptors.request.use((config) => {
//   if (accessToken){
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// })

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post("http://localhost:5277/api/auth/refresh-token", {}, { withCredentials: true })
        return API(originalRequest); // Retry request
      } catch (refreshError) {
        console.error("Refresh token failed");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
