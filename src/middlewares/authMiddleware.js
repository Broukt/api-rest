const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { jwtSecret } = require("../config/env");

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You're not allowed for this operation", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Expired token", 401));
    }
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = protect;
