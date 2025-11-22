# DigiSahayak

**Aapka Digital Saathi for Every Sarkari Yojna**

DigiSahayak is an ultra-light, mobile-first web application that provides easy access to Indian government schemes. Built as a Digital Empowerment Project prototype, it helps citizens discover and learn about various government initiatives.

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with PWA support
- **Fast & Lightweight**: Built with Next.js 15 App Router and Server Components
- **Category-Based Navigation**: Browse schemes by Farmers, Youth, Women, Students, etc.
- **Search Functionality**: Find schemes by name, ministry, or keywords
- **Detailed Information**: Complete scheme details including eligibility, benefits, and application process
- **Offline-Capable**: SQLite database for fast, local-first data access
- **Clean UI**: Simple, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Language**: TypeScript
- **Database**: SQLite with better-sqlite3
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PWA**: Manifest.json for installable web app

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database**
   ```bash
   npx drizzle-kit push    # Create database tables
   npx tsc lib/db/seed.ts --module commonjs --esModuleInterop --resolveJsonModule --skipLibCheck
   node lib/db/seed.js     # Seed with initial data
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## 🗂️ Project Structure

```
digisahayak/
├── app/
│   ├── api/              # API routes
│   │   ├── categories/   # Categories endpoint
│   │   └── schemes/      # Schemes endpoint
│   ├── categories/       # Category pages
│   │   └── [slug]/       # Dynamic category route
│   ├── schemes/          # Scheme detail pages
│   │   └── [slug]/       # Dynamic scheme route
│   ├── search/           # Search page
│   ├── updates/          # Updates/notifications page
│   ├── profile/          # Profile page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   └── ui/               # Reusable UI components
│       ├── NavBar.tsx
│       ├── SchemeCard.tsx
│       └── SearchBar.tsx
├── lib/
│   └── db/               # Database configuration
│       ├── index.ts      # Database connection
│       ├── schema.ts     # Drizzle schema
│       └── seed.ts       # Seed script
├── public/               # Static assets
│   └── manifest.json     # PWA manifest
└── drizzle.config.ts     # Drizzle configuration
```

## 📊 Database Schema

### Categories Table
- id (Primary Key)
- name
- slug
- icon
- description
- createdAt

### Schemes Table
- id (Primary Key)
- categoryId (Foreign Key)
- title
- slug
- ministry
- description
- benefits
- eligibility
- howToApply
- officialLink
- imageUrl
- isActive
- createdAt
- updatedAt

## 🌐 API Endpoints

- `GET /api/categories` - Fetch all categories
- `GET /api/schemes` - Fetch all schemes
- `GET /api/schemes?category=farmers` - Fetch schemes by category
- `GET /api/schemes?slug=pm-kisan` - Fetch single scheme by slug

## 🎯 Current Schemes

The app currently includes 17+ government schemes across multiple categories:

**Farmers:**
- PM-KISAN
- Pradhan Mantri Fasal Bima Yojana
- Kisan Credit Card
- Pradhan Mantri Krishi Sinchai Yojana
- And more...

**Unemployed Youth:**
- Pradhan Mantri Kaushal Vikas Yojana
- Pradhan Mantri Mudra Yojana
- National Apprenticeship Promotion Scheme
- PM Vishwakarma Yojana
- And more...

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### For Production Database
Consider migrating to:
- **Turso** (Serverless SQLite) - Free tier available
- **PostgreSQL** (via Neon, Supabase, etc.)
- Update Drizzle config accordingly

## 📱 PWA Installation

Users can install DigiSahayak as a mobile app:
1. Open in Chrome/Safari on mobile
2. Tap "Add to Home Screen"
3. Use like a native app

## 🔐 Authentication & Role-Based Access

### Login Flow
1. **App opens → Login page displays first** (protected routes)
2. **User enters credentials and selects role**
3. **After login, app redirects based on role:**
   - **User** → Shows all government schemes (homepage)
   - **Employee** → Shows employee dashboard with all user tickets
   - **Admin** → Shows admin dashboard with all users and tickets data

### Three Types of Users

#### 1️⃣ Regular User Login
- **Role**: User
- **Access**: Browse all schemes, search, create support tickets
- **Demo Account**: 
  - Email: `user@example.com`
  - Password: `password123`
- **What User Sees**:
  - Homepage with all government schemes
  - Browse schemes by category
  - Search functionality
  - Profile page
  - Create and track support tickets

#### 2️⃣ Employee Login
- **Role**: Employee
- **Access**: View and manage all user tickets/problems
- **Demo Account**: 
  - Email: `employee@example.com`
  - Password: `password123`
- **What Employee Sees** (`/employee/dashboard`):
  - Statistics: Total, Open, In Progress, Resolved tickets
  - List of all user problems/tickets
  - Ticket details: title, description, status, priority, category
  - Create new tickets
  - Filter tickets by status
  - Color-coded status badges

#### 3️⃣ Admin Login
- **Role**: Admin
- **Access**: Full system access - view all users and all tickets
- **Demo Account**: 
  - Email: `admin@example.com`
  - Password: `password123`
- **What Admin Sees** (`/admin/dashboard`):
  - **Users Section**: All registered users (Users, Employees, Admins)
  - **Tickets Section**: All user tickets from the system
  - Statistics: Total users, total tickets, resolved count, open count
  - User details: Name, email, role
  - Ticket details: Title, description, status, user who created it

### How to Add New Users
Edit `app/api/auth/login/route.ts` and add to the `users` array:
```typescript
{
  id: 4,
  email: 'newuser@example.com',
  password: 'password123', // In production, use bcrypt
  name: 'New User Name',
  role: 'user', // or 'employee' or 'admin'
}
```
Then restart the development server.

### Session Management
- **Authentication**: Token-based (localStorage + cookies)
- **Token Storage**: Both browser localStorage and HTTP cookies
- **Session Duration**: 24 hours
- **Logout**: Click logout button in navbar (available in navigation)
- **Role Display**: Navbar shows current user role when logged in

### Protected Routes
- `/` - Homepage (redirects to login if not authenticated)
- `/employee/dashboard` - Employee only
- `/admin/dashboard` - Admin only
- `/categories/*` - Protected
- `/schemes/*` - Protected
- `/search` - Protected
- `/profile` - Protected

### API Endpoints
- `POST /api/auth/login` - User login
- `GET /api/tickets` - Fetch tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/categories` - Fetch categories
- `GET /api/schemes` - Fetch schemes

## 🔮 Future Enhancements

- [ ] User registration/signup page
- [ ] Password hashing with bcrypt
- [ ] Database-backed user management (Drizzle ORM)
- [ ] Email verification
- [ ] Bookmark favorite schemes
- [ ] Application tracking
- [ ] Push notifications for new schemes
- [ ] Multilingual support (Hindi, regional languages)
- [ ] Voice search
- [ ] Scheme eligibility calculator
- [ ] PDF downloads of scheme details
- [ ] Admin dashboard for user management
- [ ] Email notifications for ticket updates
- [ ] JWT tokens instead of simple tokens

## 📄 License

This is a prototype project for educational and demonstration purposes.

---

**Built with ❤️ for Digital India**
