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

export type Category = typeof categories.$inferSelect;
export type Scheme = typeof schemes.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type NewScheme = typeof schemes.$inferInsert;
