import axios from 'axios';
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
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.toJSON());
  }
);

// api.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response.status === 401) {
//       return (api.defaults.URL = 'http://192.168.0.30:3000');
//     }
//   }
// );

// http.interceptors.response.use(
//   (response: any) => response,
//   function (error) {
//     return Promise.reject(error.response)
//   }
// )
