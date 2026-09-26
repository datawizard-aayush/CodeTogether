const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-repo", (repoId) => {
      if (!repoId) return;
      socket.join(repoId);
      socket.emit("joined-repo", repoId);
    });

    socket.on("typing", ({ repoId, userName }) => {
      if (!repoId) return;
      socket.to(repoId).emit("typing", { userName });
    });

    socket.on("send-message", ({ repoId, message }) => {
      if (!repoId || !message) return;
      io.to(repoId).emit("new-message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = { initSocket };
