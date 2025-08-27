import bcrypt from "bcrypt";
import { prisma } from "../connections/client";
import { signToken } from "../utils/jwt";

export async function registerUser(
  email: string,
  password: string,
  imageUrl: string
) {
  if (!email.match(/@/) || password.length < 6) {
    throw new Error("Invalid email or password");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, imageUrl },
  });

  return { id: user.id, password: user.password, imageUrl: user.imageUrl };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = signToken({ id: user.id, role: user.role });

  return { token };
}

export async function resetUser(email: string, newPassword: string) {
  const hashed = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: {
      password: hashed,
    },
  });
}
