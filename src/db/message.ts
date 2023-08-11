import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  author: string;
  content: string;
  date: Date;
}

const messageSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

const Message = model<IMessage>("Message", messageSchema);

export { Message, IMessage };
