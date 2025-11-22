import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tickets as ticketsTable, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Seed demo tickets if they don't exist
async function seedDemoTickets() {
  try {
    const existingTickets = await db.select().from(ticketsTable).limit(1);
    if (existingTickets.length > 0) return; // Already seeded

    // Get user IDs from database
    const allUsers = await db.select().from(users);
    const userId = allUsers[0]?.id || 1;

    const demoTickets = [
      {
        userId,
        title: 'Payment gateway issue',
        description: 'Unable to complete payment for scheme application',
        status: 'todo',
        priority: 'high',
        category: 'payment',
      },
      {
        userId,
        title: 'Refund pending',
        description: 'Refund for cancelled application still pending',
        status: 'in-progress',
        priority: 'medium',
        category: 'payment',
      },
      {
        userId,
        title: 'Document verification',
        description: 'My documents are still under verification',
        status: 'todo',
        priority: 'high',
        category: 'document',
      },
      {
        userId,
        title: 'KYC not updated',
        description: 'KYC verification status not reflecting',
        status: 'in-progress',
        priority: 'low',
        category: 'document',
      },
      {
        userId,
        title: 'Application status',
        description: 'Application shows pending but should be approved',
        status: 'todo',
        priority: 'medium',
        category: 'application',
      },
      {
        userId,
        title: 'Form submission error',
        description: 'Form keeps showing validation error',
        status: 'resolved',
        priority: 'high',
        category: 'application',
      },
      {
        userId,
        title: 'Transaction failed',
        description: 'Payment transaction failed, money deducted but not credited',
        status: 'todo',
        priority: 'high',
        category: 'payment',
      },
      {
        userId,
        title: 'File upload limit',
        description: 'File size exceeds upload limit',
        status: 'resolved',
        priority: 'low',
        category: 'document',
      },
    ];

    for (const ticket of demoTickets) {
      await db.insert(ticketsTable).values(ticket);
    }
  } catch (error) {
    console.error('Error seeding demo tickets:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Seed demo tickets on first request
    await seedDemoTickets();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let allTickets;
    
    if (userId) {
      allTickets = await db
        .select()
        .from(ticketsTable)
        .where(eq(ticketsTable.userId, parseInt(userId)));
    } else {
      allTickets = await db.select().from(ticketsTable);
    }

    return NextResponse.json(allTickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, category } = await request.json();

    if (!userId || !title || !description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTicket = {
      userId,
      title,
      description,
      status: 'todo',
      priority: 'medium',
      category: category || 'general',
    };

    const result = await db.insert(ticketsTable).values(newTicket).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
