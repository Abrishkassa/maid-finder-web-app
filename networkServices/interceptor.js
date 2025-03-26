import axiosInstance from "./api/backendApi";
import { useAuthStore } from "./store/auth/auth";

const authStore = useAuthStore();
const MAX_RETRIES = 2;
const PUBLIC_ENDPOINTS = ["/auth/login", "/maids/list", "/maids/details"];

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const setup = () => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (authStore.accessToken && isTokenExpired(authStore.accessToken)) {
        try {
          const rs = await axiosInstance.get(`auth/refresh`, {
            headers: {
              Authorization: `Bearer ${authStore.refreshToken}`,
            },
          });
          authStore.setRefreshed(rs.data.accessToken, rs.data.refreshToken);
          config.headers["Authorization"] = "Bearer " + rs.data.accessToken;
        } catch (_error) {
          authStore.logout();
          return Promise.reject(_error);
        }
      } else if (authStore.accessToken) {
        config.headers["Authorization"] = "Bearer " + authStore.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (res) => {
      console.log("Request successful:", res.config.url);
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      console.error(
        "Request failed:",
        originalConfig.url,
        err.response?.status
      );

      if (!PUBLIC_ENDPOINTS.includes(originalConfig.url) && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = originalConfig._retry || 0;

          if (originalConfig._retry < MAX_RETRIES) {
            originalConfig._retry += 1;
            console.log("Attempting token refresh...");

            try {
              const rs = await axiosInstance.get(`auth/refresh`, {
                headers: {
                  Authorization: `Bearer ${authStore.refreshToken}`,
                },
              });

              console.log("Token refresh successful");
              authStore.setRefreshed(rs.data.accessToken, rs.data.refreshToken);
              return axiosInstance(originalConfig);
            } catch (_error) {
              console.error("Token refresh failed:", _error);
              authStore.logout();
              return Promise.reject(_error);
            }
          } else {
            authStore.logout();
            return Promise.reject(err);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
