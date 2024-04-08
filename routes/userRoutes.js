import express from "express";
const userRouter = express.Router();
import protect from "../middleware/authMiddleware.js";

import {
  getUsers,
  loginUser,
  logoutUser,
  setUser,
} from "../controllers/userController.js";

userRouter.route("/").post(setUser);
userRouter.route("/").get(protect, getUsers);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

// userRouter.route("/login").post(loginUser);
// userRouter.route("/logout").post(logoutUser);

// ## PROTECT - Protect route using auth middleware
// userRouter.route("/current").get(getCurrentUser);

export default userRouter;
