const connectedUsers = new Map();

export function addNewConnectedUser({ socketId, userId }) {
  connectedUsers.set(socketId, { userId });
}
