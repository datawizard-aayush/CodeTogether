const express = require("express");
const Repository = require("../models/Repository");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const repos = await Repository.find({ members: req.user.id })
    .populate("owner", "name email avatarColor")
    .populate("members", "name email avatarColor")
    .sort({ createdAt: -1 });

  res.json(repos);
});

router.post("/", protect, async (req, res) => {
  const { name, description, isPrivate, language, projectColor } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Repository name is required" });
  }

  const repository = await Repository.create({
    name,
    description: description || "",
    isPrivate: typeof isPrivate === "boolean" ? isPrivate : true,
    language: language || "JavaScript",
    projectColor: projectColor || "#f7df1e",
    owner: req.user.id,
    members: [req.user.id],
  });

  res.status(201).json(repository);
});

router.get("/:id", protect, async (req, res) => {
  const repo = await Repository.findById(req.params.id)
    .populate("owner", "name email avatarColor")
    .populate("members", "name email avatarColor isOnline");

  if (!repo) return res.status(404).json({ message: "Repository not found" });

  const isMember = repo.members.some((member) => member._id.toString() === req.user.id);
  if (!isMember) return res.status(403).json({ message: "You are not a member of this repository" });

  res.json(repo);
});

router.post("/:id/join", protect, async (req, res) => {
  const repo = await Repository.findById(req.params.id);
  if (!repo) return res.status(404).json({ message: "Repository not found" });

  if (repo.members.includes(req.user.id)) {
    return res.status(400).json({ message: "Already a member" });
  }

  repo.members.push(req.user.id);
  await repo.save();

  res.json({ message: "Joined repository successfully" });
});

router.get("/:id/members", protect, async (req, res) => {
  const repo = await Repository.findById(req.params.id).populate("members", "name email avatarColor isOnline");
  if (!repo) return res.status(404).json({ message: "Repository not found" });
  res.json(repo.members);
});

module.exports = router;
