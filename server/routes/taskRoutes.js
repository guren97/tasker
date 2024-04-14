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

taskRouter.route("/new").post(protect, setTask);
taskRouter.route("/tasks").get(protect, getTasks);
taskRouter.route("/mytasks").get(protect, getUserTasks);
taskRouter.route("/task/:id").put(protect, updateTask);
taskRouter.route("/task/:id").delete(protect, deleteTask);

export default taskRouter;
