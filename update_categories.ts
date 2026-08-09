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

  // Update 'vietnam' -> 'Trong nước'
  await prisma.tour.updateMany({
    where: { category: 'vietnam' },
    data: { category: 'Trong nước' }
  });

  // Update 'southeast-asia' -> 'Quốc tế'
  await prisma.tour.updateMany({
    where: { category: 'southeast-asia' },
    data: { category: 'Quốc tế' }
  });

  // Update 'international' -> 'Quốc tế'
  await prisma.tour.updateMany({
    where: { category: 'international' },
    data: { category: 'Quốc tế' }
  });

  console.log('Successfully updated tour categories.');
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
