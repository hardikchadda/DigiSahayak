'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import SchemeCard from '@/components/ui/SchemeCard';
import type { Scheme } from '@/lib/db/schema';

export default function SearchPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => {
        setSchemes(data);
        setFilteredSchemes(data);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredSchemes(schemes);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = schemes.filter(
      (scheme) =>
        scheme.title.toLowerCase().includes(lowercaseQuery) ||
        scheme.description.toLowerCase().includes(lowercaseQuery) ||
        scheme.ministry.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredSchemes(filtered);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Schemes</h1>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search by name, ministry, or keywords..." />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading schemes...</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? 's' : ''} found
          </p>
          
          <div className="space-y-4">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No schemes found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
