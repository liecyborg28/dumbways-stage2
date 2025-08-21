import { PrismaClient } from "@prisma/client/extension";

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.comment.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { name: "user 1", email: "user1@gmail.com" },
      { name: "user 2", email: "user2@gmail.com" },
    ],
  });

  const posts = await prisma.post.createMany({
    data: [
      { userId: 1, title: "title 1", content: "content 1", category: "tech" },
      { userId: 1, title: "title 2", content: "content 2", category: "tech" },
      {
        userId: 2,
        title: "title 3",
        content: "content 1",
        category: "education",
      },
      {
        userId: 2,
        title: "title 4",
        content: "content 2",
        category: "education",
      },
    ],
  });

  const comments = await prisma.comment.createMany({
    data: [
      { userId: 1, postId: 1, content: "Comment 1" },
      { userId: 2, postId: 1, content: "Comment 2" },
      { userId: 1, postId: 2, content: "Comment 3" },
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
