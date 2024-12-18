import express from 'express';
import authRoutes from './authRoutes.js';
import featureRoutes from './featureRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/feature", featureRoutes);

export default router;
