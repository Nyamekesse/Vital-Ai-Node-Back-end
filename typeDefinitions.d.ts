import { IncomingMessage } from "http";
declare module "socket.io" {
  interface Socket {
    request: IncomingMessage;
  }
}
