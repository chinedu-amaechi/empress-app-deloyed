// src/app/products/product-info.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Heading from "@/components/ui/heading";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.length > 0 ? product.colors[0] : null
  );

  // Default values for missing data
  const name = product?.name || "Product Name";
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice;
  const description = product?.description || "No description available.";
  const materials = product?.materials || [];
  const colors = product?.colors || [];
  const rating = product?.rating || 0;
  const reviews = product?.reviews || 0;
  const meaning = product?.meaning || "";

  // Discount calculation
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Handle quantity change
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Generate star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="product-info flex flex-col h-full">
      {/* Product title and rating */}
      <div className="mb-6">
        <Heading level={1} className="text-3xl font-light text-[#11296B] mb-2">
          {name}
        </Heading>

        <div className="flex items-center space-x-2">
          {renderStars(rating)}
          <span className="text-sm text-gray-500">
            {rating.toFixed(1)} ({reviews} reviews)
          </span>
        </div>
      </div>

      {/* Price section */}
      <div className="flex items-baseline mb-6">
        <div className="text-2xl font-medium text-[#11296B]">
          ${price.toFixed(2)}
        </div>

        {originalPrice && (
          <div className="ml-3 text-base text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </div>
        )}

        {discountPercentage > 0 && (
          <div className="ml-3 text-sm font-medium text-green-600">
            Save {discountPercentage}%
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Meaning (if available) */}
      {meaning && (
        <div className="mb-6 bg-[#f8f9fc] p-4 rounded-md">
          <p className="text-sm font-medium text-[#11296B] mb-1">Meaning</p>
          <p className="text-gray-600 text-sm italic">{meaning}</p>
        </div>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-[#11296B] mb-2">Materials</p>
          <div className="flex flex-wrap gap-2">
            {materials.map((material, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Color selection */}
      {colors.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-[#11296B] mb-2">
            Color: <span className="text-gray-600">{selectedColor}</span>
          </p>

          <div className="flex space-x-3 mt-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedColor === color
                      ? "border-[#11296B]"
                      : "border-transparent hover:border-gray-300"
                  }
                `}
                aria-label={`Select ${color} color`}
                title={color}
              >
                <span
                  className="w-8 h-8 rounded-full"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "gold"
                        ? "#D4AF37"
                        : color.toLowerCase() === "rose gold"
                        ? "#B76E79"
                        : color.toLowerCase() === "silver"
                        ? "#C0C0C0"
                        : color.toLowerCase() === "platinum"
                        ? "#E5E4E2"
                        : color.toLowerCase() === "bronze"
                        ? "#CD7F32"
                        : color,
                  }}
                ></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-8">
        <p className="text-sm font-medium text-[#11296B] mb-2">Quantity</p>
        <div className="flex max-w-[180px]">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <div className="mt-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 py-3 px-6 bg-[#11296B] text-white font-medium rounded-md hover:bg-[#1E96FC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#11296B] focus:ring-opacity-50">
            Add to Cart
          </button>

          <button className="py-3 px-6 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Secure checkout message */}
        <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secure checkout · Free shipping on orders over $75
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
