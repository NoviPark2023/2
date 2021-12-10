import { api } from 'api/api';

const loginUser = payload => {
  return api.post('/api/token/', payload);
};

export const authRepo = { loginUser };
