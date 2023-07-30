import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import { AuthUser } from "types/index.js";

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
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(compression());
app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

app.listen(PORT, () =>
  console.log(`Vital Ai server listening on port ${PORT}`)
);

app.use("/", routes());
