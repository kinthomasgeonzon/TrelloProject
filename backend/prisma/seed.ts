import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding the database...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created:', admin.email);

    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'MEMBER',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'MEMBER',
      },
    });

    console.log('✅ Sample users created:', user1.email, user2.email);

    await prisma.task.createMany({
      data: [
        {
          title: 'Setup Project',
          description: 'Initialize project repository and setup dependencies',
          dueDate: new Date(),
          status: 'TODO',
          taskOrder: 1,
          createdBy: admin.id,
          assignedTo: user1.id,
        },
        {
          title: 'Database Migration',
          description: 'Run Prisma migrations for MySQL',
          dueDate: new Date(),
          status: 'IN_PROGRESS',
          taskOrder: 2,
          createdBy: admin.id,
          assignedTo: user2.id,
        },
      ],
    });

    console.log('Sample tasks created.');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}


main().catch((e) => {
  console.error('Unexpected Error:', e);
  process.exit(1);
});
