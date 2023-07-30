import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";
import {
  fetchAllHealthProfessionals,
  fillProfileHealthProfessional,
} from "../controllers/health-professionals";
import { isHealthProfessional } from "../middlewares/isHealthProfessional";

export default (router: Router) => {
  router.get(
    "/health-professionals",
    isAuthenticated,
    fetchAllHealthProfessionals
  );
  router.post(
    "/health-professional/profile/me",
    isAuthenticated,
    isHealthProfessional,
    fillProfileHealthProfessional
  );
};
