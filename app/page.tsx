import Link from 'next/link';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import SearchBar from '@/components/ui/SearchBar';
<<<<<<< HEAD
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const role = cookieStore.get('role');

  // Redirect to login if not authenticated
  if (!token) {
    redirect('/login');
  }

  // Redirect employee to their dashboard
  if (role?.value === 'employee') {
    redirect('/employee/dashboard');
  }

  // Redirect admin to their dashboard
  if (role?.value === 'admin') {
    redirect('/admin/dashboard');
  }

=======

export default async function Home() {
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
  const allCategories = await db.select().from(categories);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">🇮🇳</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DigiSahayak</h1>
            <p className="text-sm text-gray-600">Aapka Digital Saathi</p>
          </div>
        </div>
        <p className="text-gray-700 mt-2">for Every Sarkari Yojna</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3"
            >
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <p className="text-sm text-center text-gray-700">
          <span className="font-semibold">An initiative under Digital Empowerment Project (Prototype)</span>
        </p>
      </div>
    </div>
  );
}
