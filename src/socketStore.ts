const connectedUsers = new Map();

export function addNewConnectedUser({ socketId, userId }) {
  connectedUsers.set(socketId, { userId });
  console.log("new users:");
  console.log(connectedUsers);
}

export function removeConnectedUser(socketId) {
  connectedUsers.has(socketId) && connectedUsers.delete(socketId);
  console.log("new connected users");
  console.log(connectedUsers);
}
