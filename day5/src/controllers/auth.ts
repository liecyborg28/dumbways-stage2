import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, resetUser } from "../services/auth";
import { loginSchema, registerSchema, resetSchema } from "../validation/auth";
import { signToken } from "../utils/jwt";
import { prisma } from "../connections/client";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const user = await registerUser(email, password);
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
