import ErrorResponse from "../utils/errorResponse.js";

const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err); // Pass the error to the next error-handling middleware
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export { notFound, errorHandler };
