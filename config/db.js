import mongoose from "mongoose";

export default function connectDB() {
  const MONGODB_URL = process.env.MONGODB_URL;
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
}
