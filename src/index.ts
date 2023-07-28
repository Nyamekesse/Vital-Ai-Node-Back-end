import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

const secret = process.env.SECRET;
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(compression());
app.use(cookieParser(secret));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/", routes());
