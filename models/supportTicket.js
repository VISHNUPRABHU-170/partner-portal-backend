import mongoose from "mongoose";

const supportTicketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    cloudProvider: {
      type: String,
      require: true,
    },
    priority: {
      type: String,
      require: true,
    },
    deadLine: {
      type: String,
      require: true,
    },
    fileUpload: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("support-ticket", supportTicketSchema);
