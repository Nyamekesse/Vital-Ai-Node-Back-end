import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  date: Date;
}

const messageSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

const Message = model<IMessage>("Message", messageSchema);

export { Message, IMessage };
