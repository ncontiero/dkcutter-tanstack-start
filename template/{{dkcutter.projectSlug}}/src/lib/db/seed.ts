/* eslint-disable no-console -- CLI script: progress is printed to stdout */
import { db } from "./index";

async function main() {
  console.log("🌱 Seeding database...");
  // Fails fast when the database is unreachable (the pool connects on the first query).
  await db.execute("SELECT 1");

  // Add your seed data here and run `{{ dkcutter.pkgManager }} run db:seed`. For example:
  // await db.insert(post).values([
  //   { title: "Hello, world!" },
  //   { title: "Welcome to TanStack Start" },
  // ]);

  console.log("✅ Database seeded");
}

main()
  .finally(async () => {
    await db.$client.end();
  })
  .catch((error: unknown) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  });
