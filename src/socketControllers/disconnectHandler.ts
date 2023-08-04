import { Socket } from "socket.io";
import { removeConnectedUser } from "../socketStore";

export async function disconnectHandler(socket: Socket) {
  removeConnectedUser(socket.id);
}
