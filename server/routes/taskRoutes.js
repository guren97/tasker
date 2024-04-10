import express from "express";
const taskRouter = express.Router();

import protect from "../middleware/authMiddleware.js";

import {
  deleteTask,
  getTasks,
  getUserTasks,
  setTask,
  updateTask,
} from "../controllers/taskController.js";

taskRouter.route("/").post(protect, setTask);
taskRouter.route("/").get(protect, getTasks);
taskRouter.route("/mytasks").get(protect, getUserTasks);
taskRouter.route("/:id").put(protect, updateTask);
taskRouter.route("/:id").delete(protect, deleteTask);

export default taskRouter;
