// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { name: "user 1", email: "user1@gmail.com" },
      { name: "user 2", email: "user2@gmail.com" },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      { name: "product 1", price: 5000, stock: 10 },
      { name: "product 2", price: 2000, stock: 10 },
      { name: "product 3", price: 7000, stock: 10 },
      { name: "product 4", price: 9000, stock: 10 },
      { name: "product 5", price: 10000, stock: 10 },
    ],
  });

  const orders = await prisma.order.createMany({
    data: [
      { userId: 11, productId: 18, qty: 1 },
      { userId: 12, productId: 19, qty: 2 },
      { userId: 11, productId: 18, qty: 1 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed 👍");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
