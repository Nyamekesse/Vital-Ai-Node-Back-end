import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getUserById, getUsers } from "../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getUsers);
  router.get("/user/me", isAuthenticated, getUserById);
};
