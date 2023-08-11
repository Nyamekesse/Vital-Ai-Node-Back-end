import { newConnectionHandler } from "./socketControllers/newConnectionHandler";
import { Server } from "socket.io";
import { isSocketAuthenticated } from "./middlewares/isSocketAuthenticated";
import { disconnectHandler } from "./socketControllers/disconnectHandler";
import { directMessageController } from "./socketControllers/directMessageController";
import { directChatHistoryController } from "./socketControllers/directChatHistoryController";

export let io: Server;
export const registerSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5001", "http://127.0.0.1:5001"],
      credentials: true,
      methods: ["GET", "POST"],
    },
    path: "/s",
  });

  io.use(isSocketAuthenticated);

  io.on("connection", (socket) => {
    newConnectionHandler(socket, io);
    socket.on("direct-message", (data) => {
      directMessageController(socket, data);
    });
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
    socket.on("direct-chat-history", (data) => {
      directChatHistoryController(socket, data);
    });
  });
};
