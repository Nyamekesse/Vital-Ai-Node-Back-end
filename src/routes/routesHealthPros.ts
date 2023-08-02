import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";
import {
  fetchAllHealthProfessionals,
  fillProfileHealthProfessional,
  getDetailsById,
} from "../controllers/healthProsController";
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
  router.get(
    "/details/health-professional/id=:id",
    isAuthenticated,
    getDetailsById
  );
};
