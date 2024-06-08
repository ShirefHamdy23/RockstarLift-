module.exports = ErrorHandlingMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.isOperational = err.isOperational || false;
  res.statusCode = err.statusCode || res.statusCode;
  if (process.env.NODE_ENV === "development") {
    sendErrorForDevelopmentMode(err, res);
  } else {
    sendErrorForProductionMode(err, res);
  }
};
const sendErrorForDevelopmentMode = (err, res) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    validation: err.errors,
    isOperational: err.isOperational,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProductionMode = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
