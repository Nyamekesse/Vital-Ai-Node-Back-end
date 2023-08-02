import express from "express";
import authentication from "./authentication";
import users from "./users";
import patients from "./care-recipient";
import healthProfessionals from "./health-professionals";
import organization from "./organization";
import review from "./review";
import connection from "./connection";

const router = express.Router();
export default (): express.Router => {
  authentication(router);
  users(router);
  patients(router);
  healthProfessionals(router);
  organization(router);
  review(router);
  connection(router);
  return router;
};
