import { updateChatHistory } from "../socketUpdaters/chat";
import { Conversation } from "../db/conversation";
import { Message } from "../db/message";
import { Socket } from "socket.io";

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

      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [newMessage._id],
        participants: [authorId, receiverId],
      });

      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
