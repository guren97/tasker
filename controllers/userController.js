import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

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
      return res.status(400).json({
        success: false,
        message,
      });
    }

    // create new user
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    //return created user
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    // if there are no users on database
    if (!users) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // return server connection error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json({
        success: false,
        error: "Wrong password",
      });
    }

    res.status(200).json({
      success: true,
      message: `Hello ${user.first_name}, you are logged in.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export { setUser, getUsers, loginUser };
