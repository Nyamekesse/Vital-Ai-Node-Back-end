import { isAuthenticated } from "../middlewares/isAuthenticated";
import { login, logout, register } from "../controllers/authentication";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", logout);
};
