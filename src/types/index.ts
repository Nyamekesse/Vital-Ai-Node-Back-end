import { Document } from "mongoose";

export interface AuthUser {
  id: string;
  userType: string;
  profileCompleted: boolean;
}

export interface Data {
  receiverId: string;
  message: string;
}

export interface IConversation extends Document {
  participants: string[];
  messages: string[];
}
