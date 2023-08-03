import { Socket } from "socket.io";

export const isSocketAuthenticated = async (
  socket: Socket,
  next: (err?: any) => void
) => {
  const user = socket.handshake.auth?.user;

  if (!user) {
    return next(new Error("Authentication failed. No cookie found."));
  }
  socket.user = user;
  next();
};
