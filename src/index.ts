import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import { nanoid } from "nanoid";

const id = nanoid();
console.log(id);
const secret = process.env.SECRET;
const app = express();
const PORT = process.env.PORT || 3030;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(compression());
app.use(cookieParser(secret));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`Vital Ai server listening on port ${PORT}`)
);

app.use("/", routes());
