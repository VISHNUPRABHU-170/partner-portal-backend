import express from "express";
import featureController from "../controllers/featureController.js";
import AuthSession from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/ticketStatus", AuthSession, featureController.getTicketStatus);

router.get("/tickets", AuthSession, featureController.getTickets);

router.get("/:id", AuthSession, featureController.getByID);

router.post("/", AuthSession, featureController.create);

// router.put("/:id", featureController.edit);

// router.delete("/:id", featureController.delete);

export default router;
