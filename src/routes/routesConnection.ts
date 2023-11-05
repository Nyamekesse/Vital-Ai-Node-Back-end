import {
  addConnection,
  getAllConnections,
  removeConnection,
} from "../controllers/connectionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";

export default (router: Router) => {
  router.post("/new/connection/id=:id", isAuthenticated, addConnection);
  router.delete("/remove/connection/id=:id", isAuthenticated, removeConnection);
  router.get("/connections", isAuthenticated, getAllConnections);
};
