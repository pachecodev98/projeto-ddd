import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  const existing = await prisma.user.findUnique({ where: { email: "admin@projeto-ddd.local" }});
  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@projeto-ddd.local",
        password,
        role: UserRole.ADMIN
      }
    });
    console.log("Admin seed criado: admin@projeto-ddd.local / admin123");
  } else {
    console.log("Admin já existe");
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
