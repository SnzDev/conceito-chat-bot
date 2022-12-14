import express from "express";
import { routes } from "./routes/routes";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import { handleError } from "./Error";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(handleError);

export { app };
