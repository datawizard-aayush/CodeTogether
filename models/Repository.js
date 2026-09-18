const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    isPrivate: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    language: { type: String, default: "JavaScript" },
    projectColor: { type: String, default: "#f7df1e" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repository", repositorySchema);
