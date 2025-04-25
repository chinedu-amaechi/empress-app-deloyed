// src/components/home/bestsellers-section.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/product/product-card";
import useProducts from "@/hooks/use-products";

const BestsellersSection = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const { data, isLoading, error } = useProducts();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400, // Adjust based on your product card width
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400, // Adjust based on your product card width
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (data) {
      // Assuming data is an array of products
      const bestsellersData = data.sort((a, b) => {
        return b.itemsSold - a.itemsSold; // Sort by items sold in descending order
      });
      setBestsellers(bestsellersData.slice(0, 8));
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading bestsellers</div>;
  }

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <Heading
            level={2}
            className="text-center mb-4 text-3xl md:text-5xl text-[#11296B] font-light tracking-tight"
          >
            Bestselling <span className="font-semibold">Bracelets</span>
          </Heading>
          {/* Added thin decorative line above heading */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#11296B]/30 via-[#11296B] to-[#11296B]/30 rounded-full mb-6 mx-auto"></div>
        </div>

        {/* Added descriptive subtitle */}
        <p className="text-gray-600 max-w-xl mx-auto text-lg text-center mb-12">
          Explore our most beloved pieces, each crafted with exceptional
          artistry and timeless design.
        </p>

        {/* Scroll Navigation */}
        <div className="absolute left-4 md:left-12 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollLeft}
            className="hidden md:block bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#11296B]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollRight}
            className="hidden md:block bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#11296B]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Horizontally Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-6 -mx-4 px-4 scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {bestsellers.map((product) => (
            <div
              key={product._id || `product-${product.name}`}
              className="flex-shrink-0 w-80 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/bestsellers"
            className="inline-block px-8 py-3 border border-[#11296B] text-[#11296B] rounded-full text-sm font-medium hover:bg-[#11296B] hover:text-white transition-all duration-300"
          >
            View All Bestsellers
          </a>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BestsellersSection;
