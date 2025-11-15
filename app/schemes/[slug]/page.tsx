import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { schemes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface SchemePageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchemePage({ params }: SchemePageProps) {
  const { slug } = await params;
  
  const [scheme] = await db
    .select()
    .from(schemes)
    .where(eq(schemes.slug, slug))
    .limit(1);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Scheme Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🏛️</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{scheme.title}</h1>
            <p className="text-sm text-gray-600">{scheme.ministry}</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Key Benefits
        </h2>
        <p className="text-gray-700 leading-relaxed">{scheme.benefits}</p>
      </div>

      {/* Eligibility */}
      {scheme.eligibility && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h2>
          <p className="text-gray-700 leading-relaxed">{scheme.eligibility}</p>
        </div>
      )}

      {/* How to Apply */}
      {scheme.howToApply && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Apply</h2>
          <p className="text-gray-700 leading-relaxed">{scheme.howToApply}</p>
        </div>
      )}

      {/* Official Link */}
      {scheme.officialLink && (
        <div className="bg-blue-50 rounded-lg p-6">
          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Official Website
          </a>
        </div>
      )}
    </div>
  );
}
