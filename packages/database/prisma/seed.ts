import { randFullName, randUserName } from "@ngneat/falso";
import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const getUsers = (): Prisma.UserCreateInput[] => {
  return Array(100)
    .fill(0)
    .map(() => ({
      username: randUserName(),
      name: randFullName(),
    }));
};

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    })
  );
}

seed();
