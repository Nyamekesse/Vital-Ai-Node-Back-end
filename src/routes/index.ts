import express from "express";
import authRoutes from "./routesAuth";
import userRoutes from "./routesUser";
import patientRoutes from "./routesCareRecipient";
import healthProfessionalRoutes from "./routesHealthPros";
import organizationRoutes from "./routesOrganization";
import reviewRoutes from "./routesReview";
import connectionRoutes from "./routesConnection";
import appointmentRoutes from "./routesAppointment";
import notificationRoutes from "./routesNotification";

const router = express.Router();
export default (): express.Router => {
  authRoutes(router);
  userRoutes(router);
  patientRoutes(router);
  healthProfessionalRoutes(router);
  organizationRoutes(router);
  reviewRoutes(router);
  connectionRoutes(router);
  appointmentRoutes(router);
  notificationRoutes(router);
  return router;
};
