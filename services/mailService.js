import axios from "axios";

class MailService {
  sendMail = async (config) => {
    try {
      await axios(config);
    } catch (error) {
      console.error("Error in MailService.sendMail:", error);
      throw new Error(error.message || "Failed to send mail");
    }
  };
}

export default new MailService();
