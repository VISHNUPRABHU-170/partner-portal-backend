import fs from "fs";
import path from "path";

class MailContentUtils {
  prepareWelcomeMailContent = (userID) => {
    const filePath = path.resolve("templates/welcomeEmailContent.html");
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace("[User Name]", userID);
    const mailContent = { to: userID, subject: "Welcome to our Portal", content };
    return mailContent;
  };

  prepareFeatureRequestEmailContent = (userID, ticketData) => {
    const filePath = path.resolve("templates/featureRequestEmailContent.html");
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace("[User Name]", userID);
    content = content.replace("[Feature Title]", ticketData.title);
    content = content.replace("[Feature Description]", ticketData.description);
    const mailContent = { to: userID, subject: "Feature Request Received", content };
    return mailContent;
  };

  prepareSupportRequestEmailContent = (userID, ticketData) => {
    const filePath = path.resolve("templates/supportRequestEmailContent.html");
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace("[User Name]", userID);
    content = content.replace("[Support Title]", ticketData.title);
    content = content.replace("[Support Description]", ticketData.description);
    const mailContent = { to: userID, subject: "Support Request Received", content };
    return mailContent;
  };
}

export default new MailContentUtils();
