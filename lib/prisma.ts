// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma pour éviter la multiplication des connexions
 * en dev (Hot Reload). En prod, Next instancie une seule fois.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
