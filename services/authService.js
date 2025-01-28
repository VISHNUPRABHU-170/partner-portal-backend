import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

class AuthService {
  register = async (newUserData) => {
    try {
      const existingUser = await User.findOne({ emailID: newUserData.emailID });
      if (existingUser) throw new Error("User already exists with this Email ID");

      const hashedPassword = await bcrypt.hash(newUserData.password, Number(process.env.SALT_ROUNDS));
      const newUser = new User({ ...newUserData, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error in AuthService.register:", error);
      throw new Error(error.message || "Failed to register user");
    }
  };

  login = async (userData) => {
    try {
      const user = await User.findOne({ emailID: userData.emailID });
      if (!user) return user;
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);
      if (!isPasswordValid) return null;
      return user;
    } catch (error) {
      console.error("Error in AuthService.login:", error);
      throw new Error(error.message || "Login failed");
    }
  };
}

export default new AuthService();
