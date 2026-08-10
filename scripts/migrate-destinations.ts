import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Load .env
dotenv.config()

const url = process.env.DATABASE_URL?.trim()
const authToken = process.env.TURSO_AUTH_TOKEN?.trim()

if (!url) throw new Error("DATABASE_URL missing")

const adapter = new PrismaLibSql({ url, authToken })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Adding new columns to Turso database...");
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Destination" ADD COLUMN "content" TEXT;`);
    console.log("Added content column");
  } catch(e: any) {
    console.log("content column might already exist", e.message);
  }
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Destination" ADD COLUMN "images" TEXT;`);
    console.log("Added images column");
  } catch(e: any) {
    console.log("images column might already exist", e.message);
  }
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Destination" ADD COLUMN "highlights" TEXT;`);
    console.log("Added highlights column");
  } catch(e: any) {
    console.log("highlights column might already exist", e.message);
  }
  
  console.log("Migration complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
