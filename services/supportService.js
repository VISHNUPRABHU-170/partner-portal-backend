import mongoose from "mongoose";
import Ticket from "../models/supportTicket.js";
import mailTemplate from "../utils/mailContentUtils.js";
import jwtUtils from "../utils/jwtUtils.js";
import mailService from "./mailService.js";

class SupportService {
  getAll = async () => {
    try {
      const tickets = await Ticket.find({ active: true });
      return tickets;
    } catch (error) {
      console.error("Error in supportService.getAll:", error);
      throw new Error(error.message || "Get all tickets failed");
    }
  };

  getByID = async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const ticket = await Ticket.findById(objectId);
      if (!ticket) throw new Error("Ticket not found");
      return ticket;
    } catch (error) {
      console.error("Error in supportService.getByID:", error);
      throw new Error(error.message || "Get ticket failed");
    }
  };

  getTicketStatus = async (id) => {
    try {
      const ticket = await Ticket.aggregate([{ $match: { active: true } }, { $group: { _id: id, ticketCounts: { $sum: 1 } } }]);
      return ticket;
    } catch (error) {
      console.error("Error in featureService.getTicketStatus:", error);
      throw new Error(error.message || "Get Ticket status failed");
    }
  };

  create = async (req) => {
    try {
      const ticketData = req.body;
      const existingTicket = await Ticket.findOne({ title: ticketData.title });
      if (existingTicket) throw new Error("Ticket already exists with this title");

      const newTicket = new Ticket(ticketData);
      await newTicket.save();
      // Get user email from JWT token
      const token = req.headers.authorization;
      const { decodedPayload } = jwtUtils.decodeJWT(token);
      // Get email content
      const mailContent = mailTemplate.prepareSupportRequestEmailContent(decodedPayload.emailID, newTicket);
      // Send email notification
      await mailService.sendMail(mailContent);
      return newTicket;
    } catch (error) {
      console.error("Error in supportService.create:", error);
      throw new Error(error.message || "Ticket creation failed");
    }
  };

  update = async (id, ticketData) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const updatedTicket = await Ticket.findByIdAndUpdate(objectId, { $set: ticketData }, { new: true });
      if (!updatedTicket) throw new Error("Ticket not found for update");
      return updatedTicket;
    } catch (error) {
      console.error("Error in supportService.edit:", error);
      throw new Error(error.message || "Ticket update failed");
    }
  };

  delete = async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const deletedTicket = await Ticket.findByIdAndUpdate(objectId, { active: false }, { new: true });
      if (!deletedTicket) throw new Error("Ticket not found for deletion");
      return deletedTicket;
    } catch (error) {
      console.error("Error in supportService.delete:", error);
      throw new Error(error.message || "Ticket deletion failed");
    }
  };

  getTickets = async (query) => {
    try {
      const { page, limit } = query;
      console.log(page, limit);
      const pageNumber = Number(page);
      const limitNumber = Number(limit, 10);
      const tickets = await Ticket.find({ active: true })
        .skip(pageNumber * limitNumber)
        .limit(limitNumber);
      const totalTickets = await Ticket.countDocuments();
      if (!tickets) throw new Error("Tickets not found");
      return {
        tickets: tickets,
        totalTickets: totalTickets,
      };
    } catch (error) {
      console.error("Error in supportService.getTickets:", error);
      throw new Error(error.message || "Fetch failed");
    }
  };
}

export default new SupportService();
