import { newConnectionHandler } from "./socketControllers/newConnectionHandler";
import { Server } from "socket.io";
import { isSocketAuthenticated } from "./middlewares/isSocketAuthenticated";
import { disconnectHandler } from "./socketControllers/disconnectHandler";
import { directMessageController } from "./socketControllers/directMessageController";
import { directChatHistoryController } from "./socketControllers/directChatHistoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { Request, Response, NextFunction } from "express";

export let io: Server;
export const registerSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5001",
        "http://127.0.0.1:5001",
        "https://vital-ai-web.onrender.com",
      ],
      credentials: true,
      methods: ["GET", "POST"],
    },
    path: "/s",
  });

  io.engine.use((req: Request, res: Response, next: NextFunction) => {
    isAuthenticated;
    next();
  });

  io.use(isSocketAuthenticated);

  io.on("connection", (socket) => {
    newConnectionHandler(socket, io);
    socket.on("direct-message", (data) => {
      directMessageController(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryController(socket, data);
    });

   

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
};
