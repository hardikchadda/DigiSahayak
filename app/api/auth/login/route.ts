import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Seed demo users if they don't exist
async function seedDemoUsers() {
  try {
    const demoUsers = [
      {
        email: 'user@example.com',
        password: 'password123',
        name: 'John User',
        role: 'user',
      },
      {
        email: 'employee@example.com',
        password: 'password123',
        name: 'Jane Employee',
        role: 'employee',
      },
      {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin',
      },
    ];

    for (const demoUser of demoUsers) {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, demoUser.email))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(users).values(demoUser);
      }
    }
  } catch (error) {
    console.error('Error seeding demo users:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    // Seed demo users on first login
    await seedDemoUsers();

    // Find user from database
    const userResult = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email),
          eq(users.password, password),
          eq(users.role, role as any)
        )
      )
      .limit(1);

    const user = userResult[0];

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email, password, or role' },
        { status: 401 }
      );
    }

    // Generate simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
