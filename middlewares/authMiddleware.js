import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

  const access_token = req.headers.access_token;
  if (access_token) {
    if (access_token === process.env.ACCESS_TOKEN) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ emailID: decodedToken.emailID });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
