import { updateChatHistory } from "../socketUpdaters/chat";
import { Conversation } from "../db/conversation";
import { Message } from "../db/message";
import { Server, Socket } from "socket.io";

interface Data {
  receiverId: string;
  message: string;
}

export const directMessageController = async (socket: Socket, data: Data) => {
  try {
    const { id: authorId } = socket.user;
    const { receiverId, message } = data;
    const newMessage = await Message.create({
      author: authorId,
      content: message,
      date: new Date(),
    });
    const conversation = await Conversation.findOne({
      participants: { $all: [authorId, receiverId] },
    });

    if (conversation) {
      conversation.messages.push(newMessage._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [newMessage._id],
        participants: [authorId, receiverId],
      });

      // perform and update to sender and receiver if is online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
