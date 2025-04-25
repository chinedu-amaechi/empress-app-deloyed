// src/app/products/product-tabs.js
"use client";

import { useState } from "react";
import Heading from "@/components/ui/heading";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  // Default values for missing data
  const description = product?.description || "No description available.";
  const materials = product?.materials || [];
  const meaning = product?.meaning || "";
  const shippingInfo =
    "Free standard shipping on all orders over $75. Express shipping available for an additional fee. International shipping available to select countries.";
  const careInfo =
    "To maintain the beauty of your bracelet, avoid contact with water, perfumes, and lotions. Store in a cool, dry place away from direct sunlight. Clean gently with a soft cloth when needed.";

  // Tab content mapping
  const tabContent = {
    description: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{description}</p>
        {meaning && (
          <div className="mt-4">
            <p className="font-medium text-[#11296B] mb-1">Meaning</p>
            <p className="text-gray-700">{meaning}</p>
          </div>
        )}
      </div>
    ),
    materials: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Each Empress bracelet is crafted using only the finest materials,
          carefully selected to ensure beauty, durability, and comfort.
        </p>

        {materials.length > 0 ? (
          <div className="mt-4">
            <p className="font-medium text-[#11296B] mb-2">Materials used:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Material information not available.
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="font-medium text-[#11296B] mb-2">
            Our Commitment to Quality
          </p>
          <p className="text-gray-700">
            All Empress jewelry undergoes rigorous quality control to ensure
            each piece meets our exacting standards. Our artisans have years of
            experience creating fine jewelry, and their expertise is evident in
            every detail.
          </p>
        </div>
      </div>
    ),
    shipping: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{shippingInfo}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f8f9fc] p-4 rounded-md">
            <p className="font-medium text-[#11296B] mb-2">Standard Shipping</p>
            <p className="text-sm text-gray-700">
              3-5 business days
              <br />
              Free on orders over $75
              <br />
              $5.99 for orders under $75
            </p>
          </div>

          <div className="bg-[#f8f9fc] p-4 rounded-md">
            <p className="font-medium text-[#11296B] mb-2">Express Shipping</p>
            <p className="text-sm text-gray-700">
              1-2 business days
              <br />
              $12.99 for all orders
              <br />
              Order by 1 PM ET for same-day processing
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium text-[#11296B] mb-2">Returns & Exchanges</p>
          <p className="text-gray-700">
            We accept returns and exchanges within 30 days of delivery. Items
            must be in their original condition with all packaging included.
            Please contact our customer service team to initiate a return or
            exchange.
          </p>
        </div>
      </div>
    ),
    care: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{careInfo}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f8f9fc] p-4 rounded-md">
            <p className="font-medium text-[#11296B] mb-2">Daily Wear</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Remove before showering or swimming</li>
              <li>• Apply lotions and perfumes before wearing</li>
              <li>• Remove before physical activities</li>
            </ul>
          </div>

          <div className="bg-[#f8f9fc] p-4 rounded-md">
            <p className="font-medium text-[#11296B] mb-2">Cleaning</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use a soft, lint-free cloth</li>
              <li>• Gently polish to remove fingerprints</li>
              <li>• For deeper cleaning, contact customer service</li>
            </ul>
          </div>

          <div className="bg-[#f8f9fc] p-4 rounded-md">
            <p className="font-medium text-[#11296B] mb-2">Storage</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Store in the provided pouch</li>
              <li>• Keep away from direct sunlight</li>
              <li>• Store pieces separately to prevent scratching</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="mt-16 mb-16">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto -mb-px space-x-8">
          {Object.entries({
            description: "Description",
            materials: "Materials",
            shipping: "Shipping & Returns",
            care: "Care Instructions",
          }).map(([key, label]) => (
            <button
              key={key}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === key
                    ? "border-[#11296B] text-[#11296B]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">{tabContent[activeTab]}</div>
    </div>
  );
};

export default ProductTabs;
