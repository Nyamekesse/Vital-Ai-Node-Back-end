import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  getAllOrganizations,
  registerHospitals,
  registerSpecialization,
} from "../controllers/organizations";
import { Router } from "express";

export default (router: Router) => {
  router.get("/organizations", getAllOrganizations);
  router.post("/register-new/organization", registerHospitals);
  router.post("/register-new/specialization", registerSpecialization);
};
