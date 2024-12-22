import mongoose from "mongoose";
import Ticket from "../models/featureTicket.js";

class FeatureService {
  getAll = async () => {
    try {
      const tickets = await Ticket.find({ active: true });
      return tickets;
    } catch (error) {
      console.error("Error in featureService.getAll:", error);
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
      console.error("Error in featureService.getByID:", error);
      throw new Error(error.message || "Get ticket failed");
    }
  };

  create = async (ticketData) => {
    try {
      const existingTicket = await Ticket.findOne({ title: ticketData.title });
      if (existingTicket) throw new Error("Ticket already exists with this title");

      const newTicket = new Ticket(ticketData);
      await newTicket.save();
      return newTicket;
    } catch (error) {
      console.error("Error in featureService.create:", error);
      throw new Error(error.message || "Ticket creation failed");
    }
  };

  edit = async (id, ticketData) => {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, { $set: ticketData }, { new: true });
      if (!updatedTicket) throw new Error("Ticket not found for update");
      return updatedTicket;
    } catch (error) {
      console.error("Error in featureService.edit:", error);
      throw new Error(error.message || "Ticket update failed");
    }
  };

  delete = async (id) => {
    try {
      const deletedTicket = await Ticket.findByIdAndUpdate(id, { active: false }, { new: true });
      if (!deletedTicket) throw new Error("Ticket not found for deletion");
      return deletedTicket;
    } catch (error) {
      console.error("Error in featureService.delete:", error);
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
      console.error("Error in featureService.getTickets:", error);
      throw new Error(error.message || "Fetch failed");
    }
  };
}

export default new FeatureService();
