import { AuthService } from "../services/authService.js";

export class AuthController {

  authService = new AuthService();
  register = (req, res) => {
    this.authService.register();
  }
  
  login = (req, res) => {
    this.authService.login();
  }
}
