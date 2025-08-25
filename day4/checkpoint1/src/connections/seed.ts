import { PrismaClient } from "../../generated/prisma";

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { id: "1", name: "User 1", email: "user1@gmail.com", points: 1500 },
      { id: "2", name: "User 2", email: "user2@gmail.com", points: 500 },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      { id: "1", name: "product 1", price: 5000 },
      { id: "2", name: "product 2", price: 2000 },
      { id: "3", name: "product 3", price: 7000 },
      { id: "4", name: "product 4", price: 9000 },
      { id: "5", name: "product 5", price: 10000 },
    ],
  });

  const suppliers = await prisma.supplier.createMany({
    data: [
      { id: "1", productId: "1", stock: 10 },
      { id: "2", productId: "1", stock: 20 },
      { id: "3", productId: "1", stock: 30 },
      { id: "4", productId: "2", stock: 10 },
      { id: "5", productId: "2", stock: 20 },
      { id: "6", productId: "2", stock: 10 },
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
