import dotenv from "dotenv";
import express from "express";
import connectToDb from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

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
