import axiosInstance from "./api/backendApi";
import { useAuthStore } from '@/store/auth/auth'

const authStore = useAuthStore()

const setup = () => {
    //REQUEST
    axiosInstance.interceptors.request.use(
        (config) => {
            if (authStore.accessToken !== null || authStore.accessToken !== '') {
                config.headers["Authorization"] = 'Bearer ' + authStore.accessToken;

                // config.headers = {
                //     'Authorization': `Bearer ${authStore.accessToken}`,
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // }
            }
            return config
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    //RESPONSE
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== "/auth/login" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axiosInstance.get(`auth/refresh`, {
                            headers: {
                                Authorization: `Bearer ${authStore.refreshToken}`
                            }
                        });

                        authStore.setRefreshed(rs.data.accessToken, rs.data.refreshToken)
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        authStore.logout()
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};

// const axios = require('axios');
// const axiosApiInstance = axios.create();
// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const value = await redisClient.get(rediskey)
//     const keys = JSON.parse(value)
//     config.headers = { 
//       'Authorization': `Bearer ${keys.access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });
// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();            
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

export default setup;