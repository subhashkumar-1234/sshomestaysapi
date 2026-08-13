const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(`[SERVER ERROR 500] ${req.method} ${req.originalUrl}:`, error);
  } else {
    console.warn(`[CLIENT ERROR ${statusCode}] ${req.method} ${req.originalUrl}: ${error.message}`);
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;