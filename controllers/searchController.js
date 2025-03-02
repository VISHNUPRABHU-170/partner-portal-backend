import featureService from "../services/featureService.js";
import supportService from "../services/supportService.js";

class SearchController {
  search = async (req, res) => {
    try {
      const { query } = req.query;
      const featureTickets = await featureService.search(query);
      const supportTickets = await supportService.search(query);
      res.status(200).json({
        success: true,
        data: { featureTickets, supportTickets}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Searching failed",
      });
    }
  };
}

export default new SearchController();
