import { addReview } from "../controllers/reviews";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { Router } from "express";

export default (router: Router) => {
  router.post("/review/id=:id", isAuthenticated, addReview);
};
