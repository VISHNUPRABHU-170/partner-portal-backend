import fs from "fs";
import path from "path";

class EmailTemplates {
  getWelcomeMailConfig = (userID) => {
    const filePath = path.resolve("templates/welcomeEmailContent.html");
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace("[User Name]", userID);
    const emailContent = { to: userID, subject: "Welcome to our Portal", content };
    const emailConfig = {
      method: "post",
      url: process.env.MAIL_SERVICE,
      headers: {
        "access-key": process.env.ACCESS_TOKEN,
      },
      data: emailContent,
    };
    return emailConfig;
  };
}

export default new EmailTemplates();
