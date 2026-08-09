const dotenv = require('dotenv');
dotenv.config();

const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const adapter = new PrismaLibSql({ url, authToken });
  const prisma = new PrismaClient({ adapter });

  const tours = await prisma.tour.findMany({
    select: { id: true, title: true, category: true }
  });
  
  console.log("Current tours and their categories:");
  tours.forEach((t: any) => {
    console.log(`- ${t.title}: "${t.category}"`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
