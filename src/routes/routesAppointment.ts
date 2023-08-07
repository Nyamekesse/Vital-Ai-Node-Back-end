import { isHealthProfessional } from "../middlewares/isHealthProfessional";
import {
  acceptAppointment,
  addNewAppointment,
  getAllAppointments,
  getAppointDetailsById,
  rejectAppointment,
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
  router.put(
    "/appointment/:id/details/accept",
    isAuthenticated,
    isHealthProfessional,
    acceptAppointment
  );
  router.put(
    "/appointment/:id/details/reject",
    isAuthenticated,
    isHealthProfessional,
    rejectAppointment
  );
};
