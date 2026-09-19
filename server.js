const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets");
const authRoutes = require("./routes/authRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");
const messageRoutes = require("./routes/messageRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "CodeTogether API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/repos", repositoryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

initSocket(server);

server.listen(PORT, () => {
  console.log(`CodeTogether server running on port ${PORT}`);
});
