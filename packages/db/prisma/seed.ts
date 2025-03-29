import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: "123",
      rooms: {
        create: {
          slug: "cohort-1",
        },
      },
      // chat: {
      //   create: [{ message: "Hi my name is alice! what's your", roomId: 1 }],
      // }
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      password: "123",
      rooms: {
        create: [
          {
            slug: "cohort-2",
          },
          {
            slug: "cohort-3",
          },
        ],
      },
      // chat: {
      //   create: [
      //     { message: "Hi my name is bob", roomId: 1 },
      //     { message: "what are yu doing today", roomId: 2 },
      //   ],
      // },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
