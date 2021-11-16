import { authRepo } from './auth.repo';
class AuthService {
  loginUser(payload) {
    return authRepo.loginUser(payload);
  }
  checkLoginStatus() {
    return !!sessionStorage.getItem('Token');
  }
}

export const authService = new AuthService();
