import jwt from 'jsonwebtoken';
import AuthService from "../services/authService.js";

class AuthController {
  register = async (req, res) => {
    try {
      await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Registration failed"
      });
    }
  };

  login = async (req, res) => {
    try {
      const user = await AuthService.login(req.body);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Incorrect UserName or Password."
        });
      }
      const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME });
      return res.status(200).json({
        success: true,
        message: "User authenticated successfully",
        token: token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Login failed"
      });
    }
  };
}

export default new AuthController();
