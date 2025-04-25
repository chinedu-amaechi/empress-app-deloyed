// src/app/products/related-products.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";

const RelatedProducts = ({
  products = [],
  collectionName = "",
  collectionId = "",
}) => {
  const [displayProducts, setDisplayProducts] = useState(products);

  // Update display products when products prop changes
  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  // If no products, show empty state
  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 mb-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Heading level={2} className="text-2xl font-light text-[#11296B]">
            You Might Also <span className="font-semibold">Like</span>
          </Heading>
          {collectionName && (
            <p className="text-gray-600 mt-1">
              More from the {collectionName} collection
            </p>
          )}
        </div>

        {collectionId && (
          <Link
            href={`/collections?collection=${collectionId}`}
            className="text-[#11296B] hover:text-[#1E96FC] text-sm font-medium transition-colors flex items-center"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
