const express = require("express");
const Message = require("../models/Message");
const Repository = require("../models/Repository");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:repoId", protect, async (req, res) => {
  const repo = await Repository.findById(req.params.repoId);
  if (!repo) return res.status(404).json({ message: "Repository not found" });

  const isMember = repo.members.some((member) => member.toString() === req.user.id);
  if (!isMember) return res.status(403).json({ message: "Not authorized to access this repository chat" });

  const messages = await Message.find({ repository: req.params.repoId })
    .populate("sender", "name email avatarColor")
    .sort({ createdAt: 1 });

  res.json(messages);
});

router.post("/:repoId", protect, async (req, res) => {
  const { text, fileRef } = req.body;
  const repo = await Repository.findById(req.params.repoId);

  if (!repo) return res.status(404).json({ message: "Repository not found" });

  const isMember = repo.members.some((member) => member.toString() === req.user.id);
  if (!isMember) return res.status(403).json({ message: "You must be a member of this repository" });

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Message text is required" });
  }

  const message = await Message.create({
    repository: req.params.repoId,
    sender: req.user.id,
    text: text.trim(),
    fileRef: fileRef || "",
  });

  const populatedMessage = await message.populate("sender", "name email avatarColor");
  res.status(201).json(populatedMessage);
});

module.exports = router;
