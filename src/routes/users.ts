import { isAuthenticated } from "../middlewares/isAuthenticated";
import {  getUsers } from "../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/user/me", isAuthenticated, getUsers);
};
