import express from 'express';
import AuthController from "../controllers/authController.js";

const router = express.Router();

const authController = AuthController;

router.post("/login", authController.login);

router.post("/test", (req, res) => {
  res.send("Hello World!");
});

router.post('/register', authController.register);


export default router;
