import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  getUserById,
  getUsers,
  updateUserProfile,
  uploadImage,
} from "../controllers/userController";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getUsers);
  router.get("/user/me", isAuthenticated, getUserById);
  router.patch("/user/profile", isAuthenticated, updateUserProfile);
  router.post("/user/image-upload", isAuthenticated, uploadImage);
};
