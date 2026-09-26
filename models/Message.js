const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    repository: { type: mongoose.Schema.Types.ObjectId, ref: "Repository", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    fileRef: { type: String, default: "" },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
