import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    emailID: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema); 
