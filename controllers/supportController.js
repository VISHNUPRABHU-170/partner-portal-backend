import supportService from "../services/supportService.js";

class SupportController {
  getAll = async (_, res) => {
    try {
      const tickets = await supportService.getAll();
      res.status(200).json({
        success: true,
        data: tickets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch tickets.",
      });
    }
  };

  getTicketStatus = async (_, res) => {
    try {
      const ticketData = await supportService.getTicketStatus("$status");
      const responseData = { "to-do": 0, "in-progress": 0, completed: 0, tickets: 0 };
      ticketData.forEach((ticket) => {
        switch (ticket._id) {
          case "to-do":
            responseData["to-do"] = ticket.ticketCounts;
            break;
          case "in-progress":
            responseData["in-progress"] = ticket.ticketCounts;
            break;
          case "completed":
            responseData["completed"] = ticket.ticketCounts;
            break;
        }
      });
      responseData.tickets = responseData["to-do"] + responseData["in-progress"] + responseData["completed"];
      res.status(200).json({
        success: true,
        data: responseData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch tickets.",
      });
    }
  };

  getTicketPriorityStatus = async (_, res) => {
    try {
      const ticketData = await supportService.getTicketStatus("$priority");
      const responseData = { high: 0, medium: 0, low: 0 };
      ticketData.forEach((ticket) => {
        switch (ticket._id) {
          case "high":
            responseData.high = ticket.ticketCounts;
            break;
          case "medium":
            responseData.medium = ticket.ticketCounts;
            break;
          case "low":
            responseData.low = ticket.ticketCounts;
            break;
        }
      });
      res.status(200).json({
        success: true,
        data: responseData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch ticket priority status.",
      });
    }
  };

  getByID = async (req, res) => {
    try {
      const ticket = await supportService.getByID(req.params.id);
      res.status(200).json({
        success: true,
        data: ticket,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch the ticket.",
      });
    }
  };

  create = async (req, res) => {
    try {
      await supportService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Ticket created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create the ticket.",
      });
    }
  };

  edit = async (req, res) => {
    try {
      const updatedTicket = await supportService.edit(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Ticket updated successfully.",
        data: updatedTicket,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update the ticket.",
      });
    }
  };

  delete = async (req, res) => {
    try {
      await supportService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Ticket deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete the ticket.",
      });
    }
  };

  getTickets = async (req, res) => {
    try {
      const tickets = await supportService.getTickets(req.query);
      res.status(200).json({
        success: true,
        data: tickets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete the ticket.",
      });
    }
  };
}

export default new SupportController();
