import { Schema, model } from "mongoose";
import { IConversation } from "../types";

const conversationSchema = new Schema({
  participants: [
    {
      type: String,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Conversation = model<IConversation>("Conversation", conversationSchema);

export { Conversation, IConversation };
