import { getAllChatsByUserId } from "../controllers/chats";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export default (router: Router) => {
  router.get("/chats", isAuthenticated, getAllChatsByUserId);
};
