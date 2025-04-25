// src/components/product/product-page-search.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ProductPageSearch = ({
  initialQuery = "",
  initialFilters = {
    collection: "all",
    priceRange: "all",
    sortBy: "featured",
  },
  collections = [],
  onFilterChange = () => {},
  onSearchChange = () => {},
  className = "",
}) => {
  // Search params
  const searchParams = useSearchParams();

  // Search state
  const [query, setQuery] = useState(initialQuery);
  const searchRef = useRef(null);

  // Filter state
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  // Price ranges for filtering
  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-100", label: "Under $100", min: 0, max: 100 },
    { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { id: "200-300", label: "$200 - $300", min: 200, max: 300 },
    { id: "over-300", label: "Over $300", min: 300, max: Infinity },
  ];

  // Sort options
  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
  ];

  // Sync with URL parameters
  useEffect(() => {
    const collectionParam = searchParams.get("collection");
    const searchQuery = searchParams.get("q");

    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery);
    }

    if (collectionParam && collectionParam !== activeFilters.collection) {
      setActiveFilters((prev) => ({
        ...prev,
        collection: collectionParam,
      }));
    }
  }, [searchParams]);

  // Handle search input changes - immediately filter products on the page
  useEffect(() => {
    // Notify parent component about search to filter products
    onSearchChange(query);
  }, [query, onSearchChange]);

  // Handle search input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Just update the search query, no navigation
    onSearchChange(query);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value,
    };

    setActiveFilters(newFilters);

    // Notify parent component about filter changes
    onFilterChange(newFilters);
  };

  // Handle clearing all filters
  const clearAllFilters = () => {
    const defaultFilters = {
      collection: "all",
      priceRange: "all",
      sortBy: "featured",
    };

    setActiveFilters(defaultFilters);
    setQuery("");

    // Notify parent components
    onFilterChange(defaultFilters);
    onSearchChange("");
  };

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Filter products..."
            value={query}
            onChange={handleInputChange}
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
        </form>
      </div>

      {/* Filters Section */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Collection Filter */}
        <div>
          <label
            htmlFor="collection-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Collection
          </label>
          <select
            id="collection-filter"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
            value={activeFilters.collection}
            onChange={(e) => handleFilterChange("collection", e.target.value)}
          >
            <option value="all">All Collections</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label
            htmlFor="price-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Price Range
          </label>
          <select
            id="price-filter"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
            value={activeFilters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            {priceRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="sort-by"
            className="block text-sm font-medium text-gray-700"
          >
            Sort By
          </label>
          <select
            id="sort-by"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
            value={activeFilters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-6 flex flex-wrap gap-2">
        {activeFilters.collection !== "all" && (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
            Collection:{" "}
            {collections.find((c) => c.id === activeFilters.collection)?.name ||
              activeFilters.collection}
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => handleFilterChange("collection", "all")}
            >
              &times;
            </button>
          </div>
        )}
        {activeFilters.priceRange !== "all" && (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
            Price:{" "}
            {priceRanges.find((r) => r.id === activeFilters.priceRange)?.label}
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => handleFilterChange("priceRange", "all")}
            >
              &times;
            </button>
          </div>
        )}
        {query && (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
            Search: &quot;{query}&quot;
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setQuery("");
                onSearchChange("");
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Clear All button - only show if filters are active */}
        {(activeFilters.collection !== "all" ||
          activeFilters.priceRange !== "all" ||
          query) && (
          <button
            className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-sm hover:bg-red-200"
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPageSearch;
