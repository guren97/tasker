import express from "express";
const userRouter = express.Router();

import protect from "../middleware/authMiddleware.js";

import {
  deleteUser,
  getCurrentUser,
  getUsers,
  loginUser,
  logoutUser,
  setUser,
  updateUser,
} from "../controllers/userController.js";

userRouter.route("/").post(setUser); // Register a new user
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

// Protected Routes
userRouter.route("/").get(protect, getUsers);
userRouter.route("/current").get(protect, getCurrentUser);
userRouter.route("/update/:id").put(protect, updateUser);
userRouter.route("/delete/:id").delete(protect, deleteUser);

export default userRouter;
