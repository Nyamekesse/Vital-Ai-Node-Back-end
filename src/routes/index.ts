import express from "express";
import authentication from "./authentication";
import users from "./users";
import patients from "./patients";
import healthProfessionals from "./health-professionals";

const router = express.Router();
export default (): express.Router => {
  authentication(router);
  users(router);
  patients(router);
  healthProfessionals(router);
  return router;
};
