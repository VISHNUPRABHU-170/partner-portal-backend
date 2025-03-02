import express from "express";
import supportController from "../controllers/supportController.js";
import AuthSession from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/ticketStatus", AuthSession, supportController.getTicketStatus);

router.get("/priorityStatus", AuthSession, supportController.getTicketPriorityStatus);

router.get("/tickets", AuthSession, supportController.getTickets);

router.get("/:id", AuthSession, supportController.getByID);

router.post("/", AuthSession, supportController.create);

router.put("/:id", supportController.update);

router.delete("/:id", supportController.delete);

export default router;
