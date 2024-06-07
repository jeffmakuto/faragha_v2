import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define a custom Axios request config type
interface InternalAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  headers: any; // Make headers required
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure headers exist and add Authorization header
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/api/login'; // Redirect to your login page
    }
    return Promise.reject(error);
  }
);

export default api;
