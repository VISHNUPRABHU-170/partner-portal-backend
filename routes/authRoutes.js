import express from 'express';
import AuthController from "../controllers/authController.js";

const router = express.Router();

const authController = AuthController;

router.post("/login", authController.login);

router.get("/test", (req, res) => {
  res.status(200).json({status: "success"});
});

router.post('/register', authController.register);


export default router;
