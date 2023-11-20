import { Router } from "express";
import { fetchAllSpecializations } from "../controllers/specializationController";

export default (router: Router) => {
  router.get("/all/specialization", fetchAllSpecializations);
};
