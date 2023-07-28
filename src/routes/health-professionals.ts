import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";
import { fillProfileHealthProfessional } from "../controllers/health-professionals";
import { isHealthProfessional } from "../middlewares/isHealthProfessional";

export default (router: Router) => {
  router.post("/health-professional/profile/me", isAuthenticated,isHealthProfessional,fillProfileHealthProfessional)
};
