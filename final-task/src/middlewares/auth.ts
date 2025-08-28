import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw { status: 401, message: "Unauthorized" };
    }

    const decoded = verifyToken(token);
    (req as any).user = decoded as any;
    next();
  } catch (error) {
    throw { status: 401, message: "Invalid token" };
  }
}

export function authorize(
  role: "user" | "admin",
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = verifyToken(token);
    (req as any).user = decoded as any;

    if (decoded.role !== role) {
      throw {
        status: 403,
        message: "You are not allowed to access this resource with your role",
      };
    }
    next();
  } catch (error) {
    throw { status: 403, message: error.message };
  }
}
