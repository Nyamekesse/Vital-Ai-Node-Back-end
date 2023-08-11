import { updateChatHistory } from "../socketUpdaters/chat";
import { Conversation } from "../db/conversation";
import { Server, Socket } from "socket.io";

interface Data {
  receiverId: string;
  message: string;
}

export const directChatHistoryController = async (
  socket: Socket,
  data: Data
) => {
  try {
    const { id: authorId } = socket.user;
    const { receiverId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [authorId, receiverId] },
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};
