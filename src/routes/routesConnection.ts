import { addConnection } from "../controllers/connectionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";

export default (router: Router) => {
  router.post("/new/connection/id=:id", isAuthenticated, addConnection);
};
