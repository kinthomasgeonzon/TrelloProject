import { PrismaClient, Role, Status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userCount = process.argv[2] ? parseInt(process.argv[2]) : 5;
const taskCount = process.argv[3] ? parseInt(process.argv[3]) : 10;

async function seedUsers() {
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

async function seedTasks() {
  console.log(`Seeding the database with ${taskCount} tasks...`);

  const users = await prisma.user.findMany({
    where: { role: 'MEMBER' },
    select: { id: true },
  });

  if (users.length === 0) {
    console.log('No users found! Make sure to run the user seeder first.');
    return;
  }

  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    select: { id: true },
  });

  if (!admin) {
    console.log('Admin user not found! Ensure user seeder ran successfully.');
    return;
  }

  const tasks = Array.from({ length: taskCount }).map((_, i) => ({
    title: `Task ${i + 1}`,
    description: `Description for Task ${i + 1}`,
    dueDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 86400000),
    status: Object.values(Status)[Math.floor(Math.random() * 3)], 
    taskOrder: i + 1,
    createdBy: admin.id,
    assignedTo: users[Math.floor(Math.random() * users.length)].id, 
  }));

  await prisma.task.createMany({
    data: tasks,
    skipDuplicates: true,
  });

  console.log(`${taskCount} Tasks Created!`);
}

async function main() {
  await seedUsers();
  await seedTasks();
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
