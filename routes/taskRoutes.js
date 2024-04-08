import express from "express";

const taskRouter = express.Router();

import {
  deleteTask,
  getTasks,
  setTask,
  updateTask,
} from "../controllers/taskController.js";

taskRouter.route("/").post(setTask);
taskRouter.route("/").get(getTasks);
taskRouter.route("/:id").put(updateTask);
taskRouter.route("/:id").delete(deleteTask);

export default taskRouter;
