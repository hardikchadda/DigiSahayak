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

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Bookmark favorite schemes
- [ ] Application tracking
- [ ] Push notifications for new schemes
- [ ] Multilingual support (Hindi, regional languages)
- [ ] Voice search
- [ ] Scheme eligibility calculator
- [ ] PDF downloads of scheme details

## 📄 License

This is a prototype project for educational and demonstration purposes.

---

**Built with ❤️ for Digital India**
