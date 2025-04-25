"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// UI Components
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";
import ProductHero from "./product-hero";
import Heading from "@/components/ui/heading";

// Data fetching
import { getAllProducts } from "@/lib/product-service";
import useCollections from "@/hooks/use-collections";

function ProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection") || "all";
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "featured";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [isFilterFixed, setIsFilterFixed] = useState(false);
  const { data } = useCollections();

  // Handle scroll effect for fixed filters
  useEffect(() => {
    const handleScroll = () => {
      // Adjust this value based on your navbar height
      const scrollPosition = 150;
      if (window.scrollY > scrollPosition) {
        setIsFilterFixed(true);
      } else {
        setIsFilterFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update search params function
  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      setProductLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = [...products];

    // Filter by collection
    if (collectionFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.collectionId === collectionFilter
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, collectionFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8fafd] to-[#eef2f7]">
      {/* Import Hero Component */}
      <ProductHero />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-screen-2xl">
        {/* Search and Filters */}
        <div
          className={`${
            isFilterFixed ? "sticky top-18 z-30" : ""
          } transition-all duration-300 mb-12`}
        >
          <div className="relative mx-auto max-w-6xl backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-[0_8px_30px_rgba(17,41,107,0.08)]">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 lg:grid-cols-12">
              {/* Search Input */}
              <div className="lg:col-span-6 xl:col-span-7">
                <label
                  htmlFor="product-search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Products
                </label>
                <div className="relative">
                  <input
                    id="product-search"
                    type="text"
                    placeholder="Search by name or description..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300/50 
                      rounded-xl 
                      focus:border-[#11296B]/50 
                      focus:ring-2 focus:ring-[#11296B]/20 
                      transition-all duration-300 
                      bg-white/80 
                      shadow-sm"
                    value={searchQuery}
                    onChange={(e) => updateSearchParams("q", e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 xl:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Collection Filter */}
                  <div>
                    <label
                      htmlFor="collection-filter"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Collection
                    </label>
                    <div className="relative">
                      <select
                        id="collection-filter"
                        className="appearance-none w-full pl-4 pr-10 py-3 border-2 border-gray-300/50 
                          rounded-xl 
                          focus:border-[#11296B]/50 
                          focus:ring-2 focus:ring-[#11296B]/20 
                          transition-all duration-300 
                          bg-white/80 
                          shadow-sm"
                        value={collectionFilter}
                        onChange={(e) =>
                          updateSearchParams("collection", e.target.value)
                        }
                      >
                        <option value="all">All Collections</option>
                        {collections.map((collection) => (
                          <option key={collection._id} value={collection._id}>
                            {collection.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label
                      htmlFor="sort-by"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sort By
                    </label>
                    <div className="relative">
                      <select
                        id="sort-by"
                        className="appearance-none w-full pl-4 pr-10 py-3 border-2 border-gray-300/50 
                          rounded-xl 
                          focus:border-[#11296B]/50 
                          focus:ring-2 focus:ring-[#11296B]/20 
                          transition-all duration-300 
                          bg-white/80 
                          shadow-sm"
                        value={sortBy}
                        onChange={(e) =>
                          updateSearchParams("sort", e.target.value)
                        }
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery ||
          collectionFilter !== "all" ||
          sortBy !== "featured") && (
          <div className="mb-8 mt-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Active filters:</span>

              {/* Collection filter tag */}
              {collectionFilter !== "all" && (
                <div className="flex items-center bg-[#11296B]/10 text-[#11296B] rounded-full px-3 py-1 text-sm">
                  <span>
                    Collection:{" "}
                    {collections.find((c) => c._id === collectionFilter)
                      ?.name || collectionFilter}
                  </span>
                  <button
                    onClick={() => updateSearchParams("collection", "all")}
                    className="ml-2 text-[#11296B] hover:text-[#1E96FC]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* Search query tag */}
              {searchQuery && (
                <div className="flex items-center bg-[#11296B]/10 text-[#11296B] rounded-full px-3 py-1 text-sm">
                  <span>Search: &quot;{searchQuery}&quot;</span>
                  <button
                    onClick={() => updateSearchParams("q", "")}
                    className="ml-2 text-[#11296B] hover:text-[#1E96FC]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* Sort tag */}
              {sortBy !== "featured" && (
                <div className="flex items-center bg-[#11296B]/10 text-[#11296B] rounded-full px-3 py-1 text-sm">
                  <span>
                    Sort:{" "}
                    {sortBy === "newest"
                      ? "Newest"
                      : sortBy === "price-low"
                      ? "Price: Low to High"
                      : sortBy === "price-high"
                      ? "Price: High to Low"
                      : sortBy === "name-asc"
                      ? "Name: A to Z"
                      : sortBy === "name-desc"
                      ? "Name: Z to A"
                      : sortBy}
                  </span>
                  <button
                    onClick={() => updateSearchParams("sort", "featured")}
                    className="ml-2 text-[#11296B] hover:text-[#1E96FC]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* Clear all button */}
              <button
                onClick={() =>
                  window.history.replaceState(null, "", "/products")
                }
                className="ml-auto text-sm text-gray-500 hover:text-[#11296B] underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Product Count */}
        {!productLoading && (
          <div className="mb-6 text-sm text-gray-500">
            {filteredProducts.length === 0
              ? "No products found"
              : `Showing ${filteredProducts.length} product${
                  filteredProducts.length !== 1 ? "s" : ""
                }`}
          </div>
        )}

        {/* Product Grid */}
        {productLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-[#11296B]/20 border-t-[#11296B] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading our collection...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any products matching your current filters.
              Try adjusting your search criteria or browse our collections.
            </p>
            <button
              className="inline-flex items-center px-6 py-3 
                border border-transparent 
                text-sm font-medium 
                rounded-full
                text-white 
                bg-[#11296B] 
                hover:bg-[#1E96FC] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-[#11296B] 
                transition-all"
              onClick={() => window.history.replaceState(null, "", "/products")}
            >
              Browse All Products
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
