export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || "Server error";

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === 11000) {
    statusCode = 409;
    const fields = Object.keys(err.keyPattern || {}).join(", ");
    message = fields ? `Duplicate value for ${fields}` : "Duplicate record";
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 413;
    message = "File size must be 5MB or less";
  }

  if (message.includes("Only PDF, DOC, or DOCX") || message.includes("Only image files")) {
    statusCode = 422;
  }

  if (err.name === "ValidationError") {
    statusCode = 422;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};
