import { Server } from "socket.io";

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    },
  });
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
  });
};
