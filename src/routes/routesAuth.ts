import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", logout);
  router.get("/auth/check-authentication", checkAuth);
};
