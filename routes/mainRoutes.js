import express from 'express';
import authRoutes from './authRoutes.js';
import featureRoutes from './featureRoutes.js';
import supportRoutes from "./supportRoutes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/feature", featureRoutes);
router.use("/support", supportRoutes);

export default router;
