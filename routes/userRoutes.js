import express from "express";
const userRouter = express.Router();

import protect from "../middleware/authMiddleware.js";

import {
  getCurrentUser,
  getUsers,
  loginUser,
  logoutUser,
  setUser,
} from "../controllers/userController.js";

userRouter.route("/").post(setUser); // Register a new user
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

// Protected Routes
userRouter.route("/").get(protect, getUsers);
userRouter.route("/current").get(protect, getCurrentUser);

export default userRouter;
