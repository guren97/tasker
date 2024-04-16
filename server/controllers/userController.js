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
      const isExists =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return next(new ErrorResponse(isExists, 401));
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
      generateToken(user, 201, res);
      res.status(201).json({
        _id: user.id,
        username: user.username,
        user_role: user.user_role,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
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
    // Verify if user exists in the request object
    if (!req.user || !req.user.id) {
      return next(new ErrorResponse("User not found in request", 404));
    }

    // Retrieve the user ID from the decoded JWT token
    const userId = req.user.id;

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    // Check if the user exists
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Send the user data in the response
    res.status(200).json({ loggedin_user: user });
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

    if (user.email !== email) {
      return next(new ErrorResponse("User not found", 404));
    }

    if (!user) {
      // Send error response if user not found
      return next(new ErrorResponse("Invalid email", 401));
    }

    // Compare passwords
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      // Send error response if password is incorrect
      return next(new ErrorResponse("Wrong password", 401));
    }

    // Proceed logging in user if the passwords matched
    // Generate token for the authenticated user
    if (user) {
      generateToken(user, 201, res);
      res.status(201).json({
        _id: user.id,
        username: user.username,
        user_role: user.user_role,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  } catch (error) {
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

/**
 * Middleware to update a user
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {void} - Void function
 */
const updateUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email } = req.body;
  const userId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    if (user._id.toString() !== currentUserId) {
      return next(
        new ErrorResponse("User not authorized to update this profile", 401)
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    return next(new ErrorResponse("Server error", 500));
  }
});

/**
 * Middleware to delete a user
 * param {object} req - Express request object
 * param {object} res - Express response object
 * param {function} next - Express next function
 * returns {void} - Void function
 */
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    if (user._id.toString() !== currentUserId) {
      return next(
        new ErrorResponse("User not authorized to delete this profile", 401)
      );
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    if (deleteUser) {
      res.status(201).json({
        success: true,
        message: "User deleted",
      });
    }
  } catch (error) {
    return next(new ErrorResponse("Server error", 500));
  }
});

export {
  setUser,
  getUsers,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
};
