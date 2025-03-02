import express from 'express';
import authRoutes from './authRoutes.js';
import featureRoutes from './featureRoutes.js';
import supportRoutes from "./supportRoutes.js";
import SearchController from "../controllers/searchController.js";

const router = express.Router();

const searchController = SearchController;

router.use('/auth', authRoutes);

router.use("/feature", featureRoutes);

router.use("/support", supportRoutes);

router.use("/search", searchController.search);

export default router;
