import axios from "axios";
import AuthService from './auth.service';

const baseDomain = 'http://localhost:3000';
const baseURL = `${baseDomain}/dev`;

const axiosInstance = axios.create({ baseURL });

const getAxios = () => {
  const token = AuthService.auth.getSignInUserSession().getIdToken().jwtToken;
  axiosInstance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
  });
  return axiosInstance;
}

export default getAxios;