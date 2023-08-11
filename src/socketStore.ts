const connectedUsers = new Map();

export function addNewConnectedUser({ socketId, userId }) {
  connectedUsers.set(socketId, { userId });
  console.log(connectedUsers);
}

export function removeConnectedUser(socketId: string) {
  connectedUsers.has(socketId) && connectedUsers.delete(socketId);
  console.log(connectedUsers);
}

export function getActiveConnections(userId: string) {
  const activeConnections = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
}
