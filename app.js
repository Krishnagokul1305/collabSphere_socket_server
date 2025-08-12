require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // change to your frontend URL for production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ New socket connected:", socket.id);

  socket.on("join-room", ({ userId, projectId }) => {
    socket.join(projectId);
    socket.to(projectId).emit("user_joined", { userId });
  });

   socket.on("typing", ({ projectId, user }) => {
    socket.to(projectId).emit("user_typing", { user });
  });

   socket.on("stop-typing", ({ projectId, user }) => {
    socket.to(projectId).emit("user_stop_typing", { user });
  });

  socket.on("message", (msg) => {
    io.to(msg.projectId).emit("message", msg);
  });

  socket.on("delete-message", ({ messageId, projectId }) => {
    io.to(projectId).emit("message-deleted", { messageId });
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO Express Server Running 🚀");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
