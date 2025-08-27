import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, resetUser } from "../services/auth";
import { loginSchema, registerSchema, resetSchema } from "../validation/auth";
import { signToken, verifyToken } from "../utils/jwt";
import { prisma } from "../connections/client";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "no file uploaded" });
    }

    const { email, password } = req.body;
    const imageUrl = req.file?.filename;

    const user = await registerUser(email, password, imageUrl);
    res.status(201).json({ message: "User registered", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true, // supaya gak bisa diakses via JS
      secure: process.env.NODE_ENV === "production", // true kalau pakai HTTPS
      sameSite: "strict", // mencegah CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    next(error);
  }
}

export async function handleReset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error } = resetSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const updateUser = await resetUser(email, newPassword);
    res.status(201).json({ message: "User updated", updateUser });
  } catch (error) {
    next(error);
  }
}

export const uploadProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (!req.file) {
      res.status(400).json({ message: "no file uploaded" });
    }

    const imageUrl = req.file?.filename;

    const decoded = verifyToken(token);
    (req as any).user = decoded as any;

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { imageUrl },
    });

    res.status(201).json({ message: "User updated", user });
  } catch (error) {
    next(error);
  }
};
