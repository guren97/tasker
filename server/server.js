import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorHandlerMiddleware.js";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot start server");
  }
};

startServer();
