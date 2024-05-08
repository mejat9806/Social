import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("server connected"))
  .catch(() => console.log("server connection failed"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server listening on port" + port);
});
