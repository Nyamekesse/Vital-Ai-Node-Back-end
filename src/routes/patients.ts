import { fillProfilePatient } from "../controllers/care-recipient";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Router } from "express";

export default (router: Router) => {
  router.post("/patient/profile/me", isAuthenticated,fillProfilePatient)

};
