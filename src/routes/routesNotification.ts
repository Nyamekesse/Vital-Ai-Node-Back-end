import {
  createNotification,
  getNotifications,
  markNotificationRead,
} from "../controllers/notificationController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { Router } from "express";

export default (router: Router) => {
  router.get("/notifications", isAuthenticated, getNotifications);
  router.put("/notification/view/:id", isAuthenticated, markNotificationRead);
  router.post("/notification/new", isAuthenticated, createNotification);
};
