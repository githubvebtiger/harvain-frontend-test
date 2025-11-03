import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://admin.bttrades.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
export interface IResponse {
  data: any;
  error: any;
}

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
  // Можно добавить токен или другие настройки для каждого запроса
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Обработка ошибок
  if (error.response && error.response.status === 401) {
    // Например, редирект на страницу логина
    window.location.href = '/';
  }
  return Promise.reject(error);
});

export default axiosClient;
