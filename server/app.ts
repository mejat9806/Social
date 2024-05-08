import express from "express";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/authRoutes";
import cors from "cors";

import morgan from "morgan";
import { globalErrorHandler } from "./controllers/errorController";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", authRouter);

app.use(globalErrorHandler);

export default app;
