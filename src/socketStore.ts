const connectedUsers = new Map();

export function addNewConnectedUser({ socketId, userId }) {
  connectedUsers.set(socketId, { userId });
  console.log(connectedUsers);
}

export function removeConnectedUser(socketId) {
  connectedUsers.has(socketId) && connectedUsers.delete(socketId);
  console.log(connectedUsers);
}
