import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5277', withCredentials: true});

let accessToken: string | null = null;

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});


// ✅ Interceptor để tự động refresh khi gặp 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // tránh lặp vô hạn

      try {
        const refreshResponse = await axios.post(
          "http://localhost:5277/api/auth/refresh-token",
          {},
          { withCredentials: true } // gửi refreshToken cookie
        );

        if (refreshResponse.status === 200) {
          // ✅ Nếu backend trả accessToken mới (vẫn trả về body), gắn lại vào header

          const accessToken = refreshResponse.data.accessToken;
          console.log("New access token:", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return API(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);      }
    }

    return Promise.reject(error);
  }
);

export default API;
