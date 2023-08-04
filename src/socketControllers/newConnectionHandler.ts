import { Server, Socket } from "socket.io";
import { addNewConnectedUser } from "../socketStore";

export async function newConnectionHandler(socket: Socket, io: Server) {
  const userDetails = socket.user;
  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.id,
  });
}
