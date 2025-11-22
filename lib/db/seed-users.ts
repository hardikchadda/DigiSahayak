import { db } from './index';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  console.log('🔐 Seeding demo users...');

  const demoUsers = [
    {
      name: 'Demo User',
      email: 'user@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user' as const,
      phone: '+91 9876543210',
      address: 'Mumbai, Maharashtra',
    },
    {
      name: 'Demo Employee',
      email: 'employee@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'employee' as const,
      phone: '+91 9876543211',
      address: 'Delhi, India',
    },
    {
      name: 'Demo Admin',
      email: 'admin@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin' as const,
      phone: '+91 9876543212',
      address: 'Bangalore, Karnataka',
    },
  ];

  const insertedUsers = await db.insert(users).values(demoUsers).returning();
  console.log(`✅ Inserted ${insertedUsers.length} demo users`);

  console.log('\n📋 Demo Credentials:');
  console.log('User: user@demo.com / password123');
  console.log('Employee: employee@demo.com / password123');
  console.log('Admin: admin@demo.com / password123');
}

seedUsers()
  .catch((error) => {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  });
