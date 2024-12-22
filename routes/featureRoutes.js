import express from "express";
import featureController from "../controllers/featureController.js";

const router = express.Router();

router.get("/ticketStatus", featureController.getTicketStatus);

router.get("/tickets", featureController.getTickets);

// router.get("/:id", featureController.getByID);

router.post("/", featureController.create);

// router.put("/:id", featureController.edit);

// router.delete("/:id", featureController.delete);

export default router;
