import { authRepo } from './auth.repo';

const TOKEN = 'Token';
const USERNAME = 'User';

class AuthService {
  loginUser(payload) {
    return authRepo.loginUser(payload);
  }
  checkLoginStatus() {
    return !!sessionStorage.getItem(TOKEN);
  }
  setUser(user) {
    sessionStorage.setItem(USERNAME, user);
  }
  getUser() {
    return sessionStorage.getItem(USERNAME);
  }
  removeUser() {
    sessionStorage.removeItem(USERNAME);
  }
  setToken(token) {
    sessionStorage.setItem(TOKEN, token);
  }
  removeToken() {
    sessionStorage.removeItem(TOKEN);
  }
  getToken() {
    return sessionStorage.getItem(TOKEN);
  }
}

export const authService = new AuthService();
