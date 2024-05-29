import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next(errorHandler(res, 401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(errorHandler(res, 403, "Forbidden"));

    const currentTime = Date.now() / 1000;
    if (decoded.exp <= currentTime) {
      return next(errorHandler(res, 401, "Token expired"));
    }

    req.user = decoded.user;
    next();
  });
};