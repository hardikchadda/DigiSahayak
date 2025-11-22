import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { categories, schemes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import SchemeCard from '@/components/ui/SchemeCard';
import SearchBar from '@/components/ui/SearchBar';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  if (!category) {
    notFound();
  }

  const categorySchemes = await db
    .select()
    .from(schemes)
    .where(eq(schemes.categoryId, category.id));

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{category.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Schemes for {category.name}
          </h1>
        </div>
        
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar placeholder="Search schemes..." />
      </div>

      {/* Schemes List */}
      <div>
        <p className="text-sm text-gray-600 mb-4">
          {categorySchemes.length} scheme{categorySchemes.length !== 1 ? 's' : ''} available
        </p>
        
        <div className="space-y-4">
          {categorySchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {categorySchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No schemes available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
