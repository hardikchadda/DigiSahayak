# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DigiSahayak is a mobile-first Progressive Web App (PWA) providing access to Indian government schemes. It uses Next.js 15 App Router with React Server Components, TypeScript, SQLite/Drizzle ORM, and includes NextAuth.js v5 for authentication with role-based access control (user, employee, admin).

## Development Commands

### Setup & Installation
```bash
npm install

# Database setup (first time or after schema changes)
npx drizzle-kit push           # Create/update database tables
npm run db:seed                # Seed schemes and categories
npx tsx lib/db/seed-users.ts   # Seed demo user accounts
```

### Daily Development
```bash
npm run dev                    # Start development server (http://localhost:3000)
npm run build                  # Build for production
npm run start                  # Start production server
npm run lint                   # Run ESLint
```

### Database Management
```bash
npm run db:generate            # Generate database migrations
npm run db:studio              # Open Drizzle Studio GUI (visualize/edit data)
npm run db:seed                # Re-seed schemes/categories
```

### Demo Accounts (for testing authentication)
- **User**: user@demo.com / password123
- **Employee**: employee@demo.com / password123
- **Admin**: admin@demo.com / password123

## Architecture & Code Structure

### Database Layer (`lib/db/`)
- **schema.ts**: Contains all Drizzle ORM table definitions
  - Core tables: `categories`, `schemes`
  - Auth tables: `users` (with role enum: user/employee/admin)
  - Feature tables: `documents`, `eligibilityChecks`, `tickets`, `ticketComments`, `applications`
- **index.ts**: Database connection using better-sqlite3
- **seed.ts**: Seeds categories and 17+ government schemes
- **seed-users.ts**: Seeds demo user accounts with hashed passwords

Database relationships:
- Categories → Schemes (one-to-many)
- Users → Documents/Tickets/Applications (one-to-many each)
- Schemes → Tickets/Applications (one-to-many each)
- Tickets → TicketComments (one-to-many)

### Authentication System (`lib/auth.ts`)
- NextAuth.js v5 with credentials provider
- JWT-based sessions (30-day expiration)
- Bcrypt password hashing (10 rounds)
- Extended types include user `role` in session object
- Auth checking done in page components (not middleware) to avoid Edge runtime issues with SQLite
- Login/register pages: `/login`, `/register`
- Exports: `auth()` for server-side auth, `handlers` for API routes, `signIn`, `signOut`

### App Router Structure (`app/`)
```
app/
├── api/
│   ├── auth/[...nextauth]/    # NextAuth.js handler
│   ├── categories/            # GET all categories
│   ├── schemes/               # GET all schemes (supports ?category=slug and ?slug=slug filters)
│   └── register/              # POST new user registration
├── categories/[slug]/         # Dynamic category page (filtered schemes)
├── schemes/[slug]/            # Dynamic scheme detail page
├── search/                    # Search page with filtering
├── login/                     # Login page
├── register/                  # Registration page
├── dashboard/                 # User dashboard (protected)
├── employee/                  # Employee dashboard (protected)
├── admin/                     # Admin dashboard (protected)
├── updates/                   # Placeholder updates page
├── profile/                   # Placeholder profile page
├── layout.tsx                 # Root layout with SessionProvider
└── page.tsx                   # Homepage with category cards
```

### Components (`components/`)
- **SessionProvider.tsx**: Client-side NextAuth session provider wrapper
- **ui/NavBar.tsx**: Mobile-first bottom navigation (Home, Search, Updates, Profile)
- **ui/SchemeCard.tsx**: Reusable scheme display card
- **ui/SearchBar.tsx**: Search input component

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)
- Example: `import { db } from '@/lib/db'`

## Key Implementation Details

### Server Components by Default
All pages and components are React Server Components unless marked with `'use client'`. Client components are needed for:
- NextAuth session provider and hooks (`useSession`)
- Interactive UI (form handling, click handlers)
- Browser APIs

### Database Queries
- Use `lib/db/index.ts` exported `db` instance
- Import schema from `lib/db/schema.ts`
- Example pattern:
  ```typescript
  import { db } from '@/lib/db';
  import { schemes } from '@/lib/db/schema';
  import { eq } from 'drizzle-orm';
  
  const result = await db.select().from(schemes).where(eq(schemes.slug, slug));
  ```

### Authentication Patterns
- Server-side pages: `import { auth } from '@/lib/auth'` then `const session = await auth()`
- Client-side: `import { useSession } from 'next-auth/react'`
- Session object includes: `id`, `email`, `name`, `role`
- Check role: `session.user.role === 'admin'`
- Protected pages should call `auth()` and redirect if no session

### API Route Conventions
- Use Next.js 15 App Router conventions: export `GET`, `POST`, `PATCH`, etc.
- Return `NextResponse.json(data)` for JSON responses
- Handle errors with appropriate status codes (400, 401, 404, 500)

## Current Development Phase

**Phase 1 Complete**: Authentication system with protected routes and demo accounts

**Phase 2 In Progress** (per AUTHENTICATION_GUIDE.md):
- Role-based dashboards (user, employee, admin)
- Document upload system with verification
- Ticketing system for 1-to-1 user assistance
- Eligibility checking against uploaded documents
- Application tracking workflow

Planned features:
- Users upload documents on scheme pages → automatic eligibility verification
- "Get Assistance" button creates ticket → employee assigns session → employee applies on user's behalf
- Employee dashboard to manage ticket queue
- Admin dashboard for system oversight

## Important Constraints

- **Database**: SQLite with better-sqlite3 (local file `sqlite.db`)
  - For production, consider Turso (serverless SQLite) or PostgreSQL
- **File Storage**: Not yet implemented for document uploads (future feature)
- **Environment Variables**: `NEXTAUTH_SECRET` should be set in production
- **React Compiler**: Enabled in next.config.ts (babel-plugin-react-compiler)
- **No test framework**: Tests not configured yet

## Mobile-First & PWA

- Design optimized for mobile devices first
- PWA manifest at `public/manifest.json`
- Bottom navigation pattern (not top navbar)
- Icons use Lucide React library
- Tailwind CSS for responsive styling

## Debugging Tips

- **Database issues**: Run `npx drizzle-kit push` to sync schema, then re-seed
- **Auth issues**: Check demo account passwords, verify middleware.ts matcher patterns
- **Build errors**: Clear `.next` folder with `rm -rf .next`
- **Port conflicts**: Run dev server on different port: `npm run dev -- -p 3001`
- **View data**: Use Drizzle Studio (`npm run db:studio`) for database inspection
