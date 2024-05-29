export const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({
    message: message,
    status: statusCode,
  });
};
