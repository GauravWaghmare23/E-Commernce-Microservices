import logger from "../logger/logger.js";

export async function errorHandler(err, req, res, next) {
  logger.error("Error", {
    message: err.message,
    stack: err.stack,
    status: err.status,
    method: req.method,
    url: req.url,
  });
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
  next();
}
