import axios from 'axios';
import { toast } from '../components/Toast';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://admin.harvain.com',
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
  if (error.response) {
    const { status, data } = error.response;

    // Handle 400 validation errors
    if (status === 400) {
      let errorMessage = 'Validation error';

      if (data) {
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (typeof data === 'object') {
          // Handle field-specific errors like { "email": ["This field is required."] }
          const errors = Object.entries(data)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`;
              }
              return `${field}: ${messages}`;
            })
            .join('; ');
          if (errors) {
            errorMessage = errors;
          }
        }
      }

      toast.error(errorMessage);
    }

    // Handle 401 unauthorized
    if (status === 401) {
      // Не редиректим если это ошибка авторизации (пользователь вводит неправильные данные)
      const isAuthEndpoint = error.config?.url?.includes('/token/') ||
                            error.config?.url?.includes('/login') ||
                            error.config?.url?.includes('/register');

      if (!isAuthEndpoint) {
        // Очищаем невалидный токен из localStorage
        // Защищённые роуты (ProtectedRoute) сами сделают редирект если нужно
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Уведомляем AuthProvider об изменении (storage event не срабатывает в той же вкладке)
        window.dispatchEvent(new Event('auth-change'));
        // НЕ делаем редирект - пусть приложение само решит
        // Публичные страницы останутся доступны, защищённые - редиректнут
      }
    }

    // Handle 403 forbidden (blocked satellite)
    if (status === 403) {
      const message = data?.detail || 'Access denied';
      // Проверяем, заблокирован ли сателлит
      if (message.toLowerCase().includes('blocked')) {
        toast.error(message);
        // Очищаем только данные сателлита, оставляем токены клиента
        localStorage.removeItem('loginId');
        localStorage.removeItem('satellite');
        // Редиректим на список сателлитов (уровень клиента)
        window.location.href = '/satellites';
      }
    }

    // Handle 500 server errors
    if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection.');
  }

  return Promise.reject(error);
});

export default axiosClient;
