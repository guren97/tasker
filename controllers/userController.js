import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import ErrorResponse from "../utils/errorResponse.js";

import User from "../models/UserSchema.js";

const setUser = asyncHandler(async (req, res, next) => {
  const { username, first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    // Check if user exists in database
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return next(new ErrorResponse(message, 401));
    }

    // create new user
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    if (user) {
      generateToken(user, 201, res); // Call generateToken function here
    }
  } catch (error) {
    return next(new ErrorResponse("Server error", 500)); // Send error response here
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    // if there are no users on database
    if (!users) {
      return next(new ErrorResponse("No users found", 404));
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return next(new ErrorResponse("Wrong password", 401));
    }

    if (user) {
      generateToken(user, 201, res); // Call generateToken function here
    }
  } catch (error) {
    console.error("Error in setUser:", error);
    return next(new ErrorResponse("Server error", 500)); // Use return statement to exit the function
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

export { setUser, getUsers, loginUser, logoutUser };
