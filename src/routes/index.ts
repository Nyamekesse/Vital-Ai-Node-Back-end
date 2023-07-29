import express from "express";
import authentication from "./authentication";
import users from "./users";
import patients from "./patients";
import healthProfessionals from "./health-professionals";
import organization from "./organization";

const router = express.Router();
export default (): express.Router => {
  authentication(router);
  users(router);
  patients(router);
  healthProfessionals(router);
  organization(router);
  return router;
};
