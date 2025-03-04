import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userCount = process.argv[2] ? parseInt(process.argv[2]) : 5;

async function main() {
  console.log(`Seeding the database with ${userCount} users...`);

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
    },
  });

  console.log(`Admin created: ${admin.email}`);

  const users = Array.from({ length: userCount }).map((_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: hashedPassword,
    role: Role.MEMBER,
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, 
  });

  console.log(`${userCount} Users Created!`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma
      .$disconnect()
      .catch((err) => console.error('Error disconnecting Prisma:', err));
  });