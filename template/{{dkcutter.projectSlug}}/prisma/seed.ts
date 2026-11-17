import { prisma } from "../src/lib/prisma";

// Add your seed data here and run `{{ dkcutter.pkgManager }} run db:seed`. For example:
// await prisma.post.create({ data: { title: "Hello, world!" } });

await prisma.$disconnect();
