export const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;

  if (err instanceof Error) {
    statusCode = err.statusCode || 500;
    message = err.message || "Internal Server Error";
  }

  return res.status(statusCode).json({ message });
};
