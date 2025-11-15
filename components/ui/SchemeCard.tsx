import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Scheme } from '@/lib/db/schema';

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {scheme.imageUrl && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
            {scheme.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{scheme.ministry}</p>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {scheme.description}
          </p>
          <Link
            href={`/schemes/${scheme.slug}`}
            className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
