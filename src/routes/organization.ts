import {
  registerHospitals,
  registerSpecialization,
} from "../controllers/organizations";
import { Router } from "express";

export default (router: Router) => {
  router.post("/register-new/organization", registerHospitals);
  router.post("/register-new/specialization", registerSpecialization);
};
