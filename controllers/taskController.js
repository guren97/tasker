import asyncHandler from "express-async-handler";
import Task from "../models/TaskSchema.js";

/**
 *
 * Create a new task.
 *
 */
const setTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 *
 * Retrieve all tasks.
 *
 */
const getTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Task.find();
    // if there are no users on database
    if (!tasks) {
      return res.status(404).json({
        success: false,
        error: "No tasks found.",
      });
    }
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 *
 * Update a task.
 *
 */
const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    //  check if there is no task on database
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      updatedTask,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 *
 * Delete a task.
 *
 */
const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const tasks = await Task.findByIdAndDelete(taskId);
    // if there are no users on database
    if (!tasks) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Task ${taskId} deleted`,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export { setTask, getTasks, updateTask, deleteTask };
