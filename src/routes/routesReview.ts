import { addReview } from "../controllers/reviewController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { Router } from "express";

export default (router: Router) => {
  router.post("/review/id=:id", isAuthenticated, addReview);
};
