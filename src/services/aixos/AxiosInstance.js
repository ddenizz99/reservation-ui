import axios from 'axios';
import { store } from '../../store';
import { logout } from '../../store/authStore'
import { authLogout } from '../AuthService';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Genel hata yönetimi
  if (error.message === 'Network Error' || error.message.includes('ERR_CONNECTION_REFUSED')) {
    return Promise.reject(new Error('Sunucuya bağlanırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.'));
  }

  if (error.response) {
    if (error.response.status === 401) {
      console.error('Oturum süresi doldu!');
      authLogout();
      store.dispatch(logout());
      toast.success('Oturum süresi doldu!');
    } else {
      console.error('API Hatası:', error.response.data.error || error.response.statusText);
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
