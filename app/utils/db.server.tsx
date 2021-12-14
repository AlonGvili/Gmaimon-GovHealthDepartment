import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient({log: [
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'error', emit: 'event' },
  ]});

  db.$connect();

  db.$on('beforeExit', (e) => {
    console.log(e)
  })

} else {
  if (!global.__db) {
    global.__db = new PrismaClient({ log: [
      { level: 'warn', emit: 'stdout' },
      { level: 'info', emit: 'stdout' },
      { level: 'error', emit: 'event' },
    ]});
    
    global.__db.$connect();
  }
  db = global.__db;
  
}

export { db };
