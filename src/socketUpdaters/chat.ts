import { io } from "../socketServer";
import { Conversation } from "../db/conversation";
import { getActiveConnections } from "../socketStore";

export const updateChatHistory = async (
  conversationId: string,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
  });

  if (conversation) {
    if (toSpecifiedSocketId) {
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};
