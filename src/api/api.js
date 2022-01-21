import axios from 'axios';
import { toast } from 'react-toastify';
import getToken from 'utils/getToken';

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_PATH,
  timeout: 30000,
  headers: { Authorization: `Bearer ${getToken()}` },
};

export const api = axios.create(axiosConfig);

api.interceptors.request.use(config => {
  config.headers.Authorization = getToken();
  return config;
});

api.interceptors.response.use(
  response => {
    console.log(response);
    if (response && response.status && response.status === 200) {
      toast.success('sss');
      if (response && response.data && response.data.message) {
        toast.success('sss');
      }
    }
    //
    return response;
  },
  error => {
    console.log(error, 'ssssssssss');
    return Promise.reject(error.toJSON());
  }
);
