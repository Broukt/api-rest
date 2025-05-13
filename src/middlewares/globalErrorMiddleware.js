const { env } = require("../config/env");
const { logger } = require("../utils/logger");

const handleSQLiteError = (err) => {
  if (err.code === "P2002") {
    // Unique constraint violation
    const targets = Array.isArray(err.meta?.target) ? err.meta.target : [];
    const fields = targets.join(", ");
    return {
      statusCode: 400,
      status: "fail",
      message: `The object already exists in the database. Duplicate field(s): ${fields}.`,
    };
  }

  if (err.code === "P2025") {
    return {
      statusCode: 404,
      status: "fail",
      message: "The object does not exist in the database.",
    };
  }

  return {
    statusCode: 500,
    status: "error",
    message:
      "Server internal error while processing the request. Please try again later.",
  };
};

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    msg: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    // Errores controlados
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  } else {
    // Errores desconocidos: sólo mensaje genérico y log en servidor
    logger.error(
      { err, url: req.originalUrl, method: req.method },
      "Unhandled error"
    );
    res.status(500).json({
      status: "error",
      msg: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  // Valores por defecto
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (env === "development") {
    sendErrorDev(err, req, res);
  } else {
    // Clonamos para no mutar el error original
    let error = { ...err };
    error.message = err.message;

    // Si es un error de Prisma que conocemos, lo traducimos
    if (err.code === "P2002" || err.code === "P2025") {
      const sqliteErr = handleSQLiteError(err);
      error.statusCode = sqliteErr.statusCode;
      error.status = sqliteErr.status;
      error.message = sqliteErr.message;
      error.isOperational = true;
    }

    sendErrorProd(error, req, res);
  }
};
