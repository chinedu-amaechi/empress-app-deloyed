// src/app/products/product-search.js
"use client";

import { useState, useEffect, useRef } from "react";
import { searchProducts } from "@/lib/product-service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const ProductSearch = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Debounce search to avoid too many requests
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 2) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle clicks outside search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Perform the search
  const performSearch = async () => {
    if (query.trim().length > 2) {
      setIsSearching(true);
      try {
        const searchResults = await searchProducts(query);
        setResults(searchResults.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Handle search input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products/search?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  // Handle navigation to a product
  const navigateToProduct = (collectionId, productId) => {
    router.push(`/collections/${collectionId}/products/${productId}`);
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search for bracelets..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim().length > 2 && setShowResults(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B] bg-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </form>

      {/* Search results dropdown */}
      {showResults && query.trim().length > 2 && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50 border border-gray-200">
          {results.length > 0 ? (
            <ul className="py-1">
              {results.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigateToProduct(product.collectionId, product.id)
                  }
                >
                  <div className="flex items-center">
                    {product.image && (
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}

                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.collectionName}
                      </p>
                    </div>

                    <div className="ml-2 flex-shrink-0 font-medium text-[#11296B]">
                      ${product.price?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </li>
              ))}
              <li className="px-4 py-2 text-center">
                <Link
                  href={`/products/search?q=${encodeURIComponent(
                    query.trim()
                  )}`}
                  className="text-xs text-[#11296B] hover:text-[#1E96FC] transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  View all results
                </Link>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-gray-500">No products found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
