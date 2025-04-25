// src/components/home/recentlyviewed-items.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";

const RecentlyViewedItems = () => {
  const [recentItems, setRecentItems] = useState([]);

  // Effect to load recently viewed items from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("recently_viewed_items") || "[]"
    );
    setRecentItems(storedItems);
  }, []);

  // Function to update recently viewed items
  const updateRecentlyViewed = (product) => {
    const storedItems = JSON.parse(
      localStorage.getItem("recently_viewed_items") || "[]"
    );

    // Remove duplicate if exists
    const filteredItems = storedItems.filter((item) => item.id !== product.id);

    // Add new item to the beginning
    const updatedItems = [product, ...filteredItems].slice(0, 6);

    localStorage.setItem("recently_viewed_items", JSON.stringify(updatedItems));

    setRecentItems(updatedItems);
  };

  // If no recently viewed items, return null
  if (recentItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-12 text-3xl md:text-4xl text-[#11296B] font-light tracking-tight"
        >
          Recently <span className="font-semibold">Viewed</span>
        </Heading>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentItems.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                product={product}
                onView={() => updateRecentlyViewed(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedItems;
