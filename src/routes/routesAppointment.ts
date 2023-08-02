import {
  addNewAppointment,
  getAllAppointments,
  getAppointDetailsById,
} from "../controllers/appointmentController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";

export default (router: Router) => {
  router.get("/all/appointments", isAuthenticated, getAllAppointments);
  router.get(
    "/appointment/:id/details",
    isAuthenticated,
    getAppointDetailsById
  );
  router.post("/new/appointment", isAuthenticated, addNewAppointment);
};
