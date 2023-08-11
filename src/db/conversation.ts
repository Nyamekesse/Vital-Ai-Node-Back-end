import { Schema, model, Document } from "mongoose";

interface IConversation extends Document {
  participants: string[];
  messages: string[];
}

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
