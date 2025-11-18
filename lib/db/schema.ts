import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const schemes = sqliteTable('schemes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  ministry: text('ministry').notNull(),
  description: text('description').notNull(),
  benefits: text('benefits').notNull(),
  eligibility: text('eligibility'),
  howToApply: text('how_to_apply'),
  officialLink: text('official_link'),
  imageUrl: text('image_url'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Users table with role-based access
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role', { enum: ['user', 'employee', 'admin'] }).notNull().default('user'),
  phone: text('phone'),
  address: text('address'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// User documents table
export const documents = sqliteTable('documents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  documentType: text('document_type').notNull(), // 'aadhar', 'pan', 'income_certificate', etc.
  documentName: text('document_name').notNull(),
  filePath: text('file_path').notNull(),
  fileSize: integer('file_size'),
  isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
  verifiedBy: integer('verified_by').references(() => users.id),
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Eligibility checks table
export const eligibilityChecks = sqliteTable('eligibility_checks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  schemeId: integer('scheme_id').notNull().references(() => schemes.id),
  isEligible: integer('is_eligible', { mode: 'boolean' }).notNull(),
  documentsRequired: text('documents_required'), // JSON array of required documents
  documentsFulfilled: text('documents_fulfilled'), // JSON array of uploaded documents
  completionPercentage: integer('completion_percentage').notNull().default(0),
  lastCheckedAt: integer('last_checked_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Tickets table for assistance requests
export const tickets = sqliteTable('tickets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ticketNumber: text('ticket_number').notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
  schemeId: integer('scheme_id').notNull().references(() => schemes.id),
  subject: text('subject').notNull(),
  description: text('description').notNull(),
  status: text('status', { enum: ['open', 'in_progress', 'resolved', 'closed'] }).notNull().default('open'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).notNull().default('medium'),
  assignedTo: integer('assigned_to').references(() => users.id),
  sessionScheduled: integer('session_scheduled', { mode: 'boolean' }).notNull().default(false),
  sessionDate: integer('session_date', { mode: 'timestamp' }),
  sessionNotes: text('session_notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  resolvedAt: integer('resolved_at', { mode: 'timestamp' }),
});

// Ticket comments/activity log
export const ticketComments = sqliteTable('ticket_comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ticketId: integer('ticket_id').notNull().references(() => tickets.id),
  userId: integer('user_id').notNull().references(() => users.id),
  comment: text('comment').notNull(),
  isInternal: integer('is_internal', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// User scheme applications
export const applications = sqliteTable('applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  schemeId: integer('scheme_id').notNull().references(() => schemes.id),
  ticketId: integer('ticket_id').references(() => tickets.id),
  appliedBy: integer('applied_by').references(() => users.id), // Employee who applied
  status: text('status', { enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'] }).notNull().default('draft'),
  applicationNumber: text('application_number'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
  approvedAt: integer('approved_at', { mode: 'timestamp' }),
  rejectionReason: text('rejection_reason'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Type exports
export type Category = typeof categories.$inferSelect;
export type Scheme = typeof schemes.$inferSelect;
export type User = typeof users.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type EligibilityCheck = typeof eligibilityChecks.$inferSelect;
export type Ticket = typeof tickets.$inferSelect;
export type TicketComment = typeof ticketComments.$inferSelect;
export type Application = typeof applications.$inferSelect;

export type NewCategory = typeof categories.$inferInsert;
export type NewScheme = typeof schemes.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewDocument = typeof documents.$inferInsert;
export type NewEligibilityCheck = typeof eligibilityChecks.$inferInsert;
export type NewTicket = typeof tickets.$inferInsert;
export type NewTicketComment = typeof ticketComments.$inferInsert;
export type NewApplication = typeof applications.$inferInsert;
