import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import ErrorResponse from "../utils/errorResponse.js";

import User from "../models/UserSchema.js";

/**
 * Middleware to register a new user
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const setUser = asyncHandler(async (req, res, next) => {
  // Extracting user data from request body
  const { username, first_name, last_name, email, password } = req.body;

  try {
    // Check if user with same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return next(new ErrorResponse(message, 401));
    }

    // Create new user
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    if (user) {
      // Generate token for the newly registered user
      generateToken(user, 201, res);
    }
  } catch (error) {
    // Send server error response
    return next(new ErrorResponse("Server error", 500));
  }
});

/**
 * Middleware to fetch all users
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    if (!users) {
      // Send error response if no users found
      return next(new ErrorResponse("No users found", 404));
    }
    // Send success response with users data
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // Send server error response
    next(new ErrorResponse("Server error", 500));
  }
});

/**
 * Middleware to fetch the current user
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve the user ID from the decoded JWT token
    const userId = req.user.id;

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    // Check if the user exists
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Send the user data in the response
    res.status(200).json({ user });
  } catch (error) {
    // Handle server errors
    return next(new ErrorResponse("Server Error", 500));
  }
});

/**
 * Middleware to authenticate user login
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {Promise<void>} - Promise representing the completion of the operation
 */
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email and select password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // Send error response if user not found
      return next(new ErrorResponse("User not found", 404));
    }

    // Compare passwords
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      // Send error response if password is incorrect
      return next(new ErrorResponse("Wrong password", 401));
    }

    if (user) {
      // Generate token for the authenticated user
      generateToken(user, 201, res);
    }
  } catch (error) {
    console.error("Error in setUser:", error);
    // Send server error response
    return next(new ErrorResponse("Server error", 500));
  }
});

/**
 * Middleware to logout user
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {void} - Void function
 */
const logoutUser = asyncHandler(async (req, res, next) => {
  // Clear JWT cookie and send success message
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

export { setUser, getUsers, getCurrentUser, loginUser, logoutUser };
