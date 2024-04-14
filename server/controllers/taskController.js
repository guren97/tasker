import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";

import Task from "../models/TaskSchema.js";

/**
 * Middleware to create a new task.
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const setTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const user = req.user.id;

  try {
    // Create a new task with the provided title, description, and user ID
    const task = await Task.create({ title, description, author: user });
    if (task) {
      // Send success response with the created task
      res.status(201).json({
        success: true,
        task,
      });
    }
  } catch (error) {
    // Handle server error
    return next(new ErrorResponse("Server Error", 500));
  }
});

/**
 * Middleware to retrieve all tasks.
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const getTasks = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    // Check if tasks exist
    if (!tasks || tasks.length === 0) {
      return next(new ErrorResponse("No tasks found", 404));
    }

    // Send success response with the retrieved tasks
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    // Handle server error
    return next(new ErrorResponse("Server Error", 500));
  }
});

/**
 * Middleware to retrieve tasks of a specific user.
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const getUserTasks = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  try {
    // Retrieve tasks associated with the specified user
    const tasks = await Task.find({ author: user });
    // Check if tasks exist
    if (!tasks || tasks.length === 0) {
      return next(new ErrorResponse("No tasks found", 404));
    }
    // Send success response with the retrieved tasks
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    // Handle server error
    return next(new ErrorResponse("Server Error", 500));
  }
});

/**
 * Middleware to update a task
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // Find the task by ID
    const task = await Task.findById(taskId);

    // Check if the task exists
    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }
    // Check if the task belongs to the authenticated user
    if (task.author.toString() !== userId) {
      return next(new ErrorResponse("User not authorized to update", 401));
    }
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );
    // Check if the task was successfully updated
    if (!updatedTask) {
      return next(new ErrorResponse("Task not found", 404));
    }
    // Send success response with the updated task
    res.status(200).json({
      success: true,
      updatedTask,
    });
  } catch (error) {
    // Handle server error
    return next(new ErrorResponse("Server Error", 500));
  }
});

/**
 * Middleware to delete a task.
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(taskId);

    // Check if the task exists
    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    // Check if the task belongs to the authenticated user
    if (task.author.toString() !== userId) {
      return next(new ErrorResponse("User not authorized to delete", 401));
    }

    // Send success response if the task is successfully deleted
    res.status(200).json({
      success: true,
      message: `Task ${taskId} deleted`,
    });
  } catch (error) {
    // Handle server error
    return next(new ErrorResponse("Server Error", 500));
  }
});

export { setTask, getTasks, getUserTasks, updateTask, deleteTask };
