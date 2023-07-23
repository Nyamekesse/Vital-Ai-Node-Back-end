import { getUsers } from "../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", getUsers);
};
