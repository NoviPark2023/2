import axios from 'axios';
import getToken from 'utils/getToken';

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_PATH,
  timeout: 30000,
  headers: { Authorization: `JWT ${getToken()}` },
};

export const api = axios.create(axiosConfig);

api.interceptors.request.use(config => {
  config.headers.Authorization = getToken();
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.toJSON());
  }
);
