/* eslint-disable no-console -- CLI script: progress is printed to stdout */
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");
  // Fails fast when the database is unreachable (`$connect()` doesn't open a connection with driver adapters).
  await prisma.$queryRaw`SELECT 1`;

  // Add your seed data here and run `{{ dkcutter.pkgManager }} run db:seed`. For example:
  // await prisma.post.createMany({
  //   data: [{ title: "Hello, world!" }, { title: "Welcome to TanStack Start" }],
  // });

  console.log("✅ Database seeded");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch((error: unknown) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  });
