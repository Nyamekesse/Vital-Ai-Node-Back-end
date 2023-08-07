import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  getAllOrganizationTeam,
  getAllOrganizations,
  registerHospitals,
  registerSpecialization,
} from "../controllers/organizationController";
import { Router } from "express";

export default (router: Router) => {
  router.get("/organizations", getAllOrganizations);
  router.get("/organization/id=:id/staff", getAllOrganizationTeam);
  router.post("/register-new/organization", registerHospitals);
  router.post("/register-new/specialization", registerSpecialization);
};
