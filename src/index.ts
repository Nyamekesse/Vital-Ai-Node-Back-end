import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import { AuthUser } from "types/index.js";
import mongoose from "mongoose";
import { registerSocketServer } from "./socketServer.js";
import http from "http";
import Bree from "bree";
import path from "path";

declare module "socket.io" {
  interface Socket {
    user?: AuthUser;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

dotenv.config();
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be defined in .env\nEXITING.");
  process.exit(-1);
}
if (!process.env.SECRET) {
  console.error("SECRET must be defined in .env\nEXITING.");
  process.exit(-1);
}
if (!process.env.MULTI_AVATAR_API_KEY) {
  console.error("DATABASE_URL must be defined in .env\nEXITING.");
  process.exit(-1);
}

const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5001",
      "http://127.0.0.1:5001",
      "https://frontend-test-j1xl.onrender.com",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(compression());
app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
registerSocketServer(server);

const bree = new Bree({
  jobs: [
    {
      name: "checkAppointments",
      interval: "30m",
      path: path.join(__dirname, "jobs", "checkAppointments.js"),
    },
  ],
  root: false,
});
bree.start();

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => {
    server.listen(PORT, () =>
      console.log(`Vital Ai server listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Database Connection to MongoDB failed");
    console.error(err);
  });

app.use("/api", routes());

app.use(function (req, res, next) {
  res.status(405).send({
    error: "Method Not Allowed",
    message:
      "The method you are trying to use is not allowed for this resource.",
  });
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});
