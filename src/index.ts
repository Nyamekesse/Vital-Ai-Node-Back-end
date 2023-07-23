import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true }));

app.use(compression());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
