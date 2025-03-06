import { PrismaClient, Role, Status } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

const userCount = process.argv[2] ? parseInt(process.argv[2]) : 5;
const taskCount = process.argv[3] ? parseInt(process.argv[3]) : 10;

async function seedUsers() {
  console.log(`Seeding the database with ${userCount} users...`);

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash('admin123', 10);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }

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
    console.error('No users found! Make sure to run the user seeder first.');
    return;
  } else {
    console.log(`Found ${users.length} users.`);
  }

  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    select: { id: true },
  });

  if (!admin) {
    console.error('Admin user not found! Ensure user seeder ran successfully.');
    return;
  } else {
    console.log(`Admin ID: ${admin.id}`);
  }

  const tasks: {
    title: string;
    description: string;
    dueDate: Date;
    status: Status;
    taskOrder: number;
    createdBy: number;
    assignedTo: number;
  }[] = [];

  for (let i = 0; i < taskCount; i++) {
    const assignedUser = users[Math.floor(Math.random() * users.length)].id;
    const task = {
      title: `Task ${i + 1}`,
      description: `Description for Task ${i + 1}`,
      dueDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 86400000),
      status: Object.values(Status)[Math.floor(Math.random() * 3)],
      taskOrder: i + 1,
      createdBy: admin.id,
      assignedTo: assignedUser,
    };
    tasks.push(task);
    console.log(`Prepared Task ${i + 1}: Assigned to User ID ${assignedUser}`);
  }

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
