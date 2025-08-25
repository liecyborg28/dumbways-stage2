import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded as any;
    console.log("decoded", decoded);
    if (decoded.role !== "supplier") {
      res.status(401).json({ message: "Role not have permission" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}
