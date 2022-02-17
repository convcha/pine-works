import { prisma } from "database";

let db: prisma.PrismaClient;

declare global {
  // noinspection JSUnusedGlobalSymbols,ES6ConvertVarToLetConst
  var __db: prisma.PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new prisma.PrismaClient();
  db.$connect();
} else {
  if (!global.__db) {
    global.__db = new prisma.PrismaClient();
    global.__db.$connect();
  }
  db = global.__db;
}

export { db };