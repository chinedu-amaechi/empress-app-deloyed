// src/app/products/product-gallery.js
"use client";

import { useState } from "react";
import Image from "next/image";

const ProductGallery = ({ images = [], name = "Product" }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Ensure we have valid images with fallback
  const displayImages = images && images.length > 0 
    ? images.map(img => typeof img === 'string' ? img : (img.optimizeUrl || '/product/product-placeholder.jpg'))
    : ['/product/product-placeholder.jpg'];

  
  // Handle image click
  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Handle zoom toggle
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="product-gallery">
      {/* Main image display */}
      <div
        className={`relative overflow-hidden rounded-lg mb-4 ${
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        style={{ height: "500px" }}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isZoomed && setIsZoomed(false)}
      >
        <Image
          src={displayImages[selectedImage]}
          alt={`${name} - Image ${selectedImage + 1}`}
          fill
          priority
          className={`object-contain transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : {}
          }
        />

        {/* Zoom indicator */}
        {!isZoomed && (
          <div className="absolute bottom-3 right-3 bg-white/80 rounded-full p-2 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-20 cursor-pointer rounded-md overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? "ring-2 ring-[#11296B]"
                  : "ring-1 ring-gray-200 hover:ring-[#11296B]/50"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 100px"
              />
            </div>
          ))}

          
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
