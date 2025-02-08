import axios from "axios";

class MailService {
  sendMail = async (mailContent) => {
    try {
      const config = {
        method: "post",
        url: process.env.MAIL_SERVICE,
        headers: {
          "access-key": process.env.ACCESS_TOKEN,
        },
        data: mailContent,
      };
      await axios(config);
    } catch (error) {
      console.error("Error in MailService.sendMail:", error);
      throw new Error(error.message || "Failed to send mail");
    }
  };
}

export default new MailService();
