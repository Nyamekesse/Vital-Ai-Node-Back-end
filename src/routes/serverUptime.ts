import { getUptimeStatus } from "../controllers/serverUptimeController";
import { Router } from "express";

export default (router: Router) => {
  router.get("/server-uptime", getUptimeStatus);
};
