import { getAllChats, getChatDetailsById } from "../controllers/chats";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export default (router: Router) => {
  router.get("/chats", isAuthenticated, getAllChats);
  router.get("/chat/:id/details", isAuthenticated, getChatDetailsById);
};
