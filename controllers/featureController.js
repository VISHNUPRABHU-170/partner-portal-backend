import featureService from "../services/featureService.js";

class FeatureController {
  getAll = async (_, res) => {
    try {
      const tickets = await featureService.getAll();
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
      const ticketData = await featureService.getTicketStatus();
      const responseData = { awsTickets: 0, azureTickets: 0, gcpTickets: 0, othersTickets: 0, totalTickets: 0,};
      ticketData.forEach((ticket) => {
        switch (ticket._id) {
          case "AWS":
            responseData.awsTickets = ticket.ticketCounts;
            break;
          case "AZURE":
            responseData.azureTickets = ticket.ticketCounts;
            break;
          case "GCP":
            responseData.gcpTickets = ticket.ticketCounts;
            break;
          default:
            responseData.othersTickets += ticket.ticketCounts;
        }
      });
      responseData.totalTickets = responseData.awsTickets + responseData.azureTickets + responseData.gcpTickets + responseData.othersTickets;
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

  getByID = async (req, res) => {
    try {
      const ticket = await featureService.getByID(req.params.id);
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
      await featureService.create(req.body);
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
      const updatedTicket = await featureService.edit(req.params.id, req.body);
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
      await featureService.delete(req.params.id);
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
      const tickets = await featureService.getTickets(req.query);
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

export default new FeatureController();
