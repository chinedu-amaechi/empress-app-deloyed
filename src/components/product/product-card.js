// src/components/product/product-card.js
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/app/contexts/cart-context";
import { addToCart, updateCart } from "@/lib/cart-services";
import { useAuthContext } from "@/app/contexts/auth-context";
import toast from "react-hot-toast";

// Utility function to generate star ratings
const generateStars = (rating) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          } ${
            i === Math.floor(rating) && !Number.isInteger(rating)
              ? "text-yellow-400"
              : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={i < Math.floor(rating) ? "0" : "1.5"}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
};

export default function ProductCard({
  product = {
    id: "1",
    name: "Ethereal Moonstone Bracelet",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 24,
    material: "Sterling Silver",
    colors: ["Silver", "Rose Gold", "Gold"],
    description:
      "A delicate bracelet featuring authentic moonstone beads. The soft luminescence of the stones creates an ethereal effect, perfect for both day and evening wear.",
    imagesUrl: [
      "/bracelet-01.jpg",
      "/bracelet-02.jpg",
      "/bracelet-03.jpg",
      "/bracelet-04.jpg",
      "/bracelet-05.jpg",
    ],
    isNew: true,
    isBestseller: true,
  },
}) {
  // Ensure product images are valid
  const safeImages =
    Array.isArray(product.imagesUrl) && product.imagesUrl.length > 0
      ? product.imagesUrl
      : [
          {
            optimizeUrl: "/bracelet-01.jpg",
          },
        ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef(null);

  const { user } = useAuthContext();

  // Navigation for image carousel - now with safe array access
  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % safeImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };
  const { cart, setCart } = useCartContext();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Handle modal open
  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  async function handleAddToCart(quantity) {
    if (user) {
      const productInCart = user.cart.find(
        (item) => item.productId === product._id
      );
      if (productInCart) {
        const response = await updateCart({
          productId: product._id,
          quantity: quantity,
        });

        console.log("Updated cart:", response);
      } else {
        const response = await addToCart({
          _id: product._id,
          quantity: quantity,
        });

        console.log("Added to cart:", response);
      }
    }

    toast.success("Added to cart successfully!");

    setCart((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return updatedCart;
      }

      updatedCart = [...prev, { ...product, quantity: quantity }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Added to cart:", updatedCart);

      return updatedCart;
    });
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      <div
        className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden w-full md:w-72 lg:w-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product image with carousel */}
        <div className="relative h-64 overflow-hidden">
          {/* Make the entire image area clickable to open modal, except when interacting with other elements */}
          <div
            className="absolute inset-0 cursor-pointer z-0"
            onClick={openModal}
            aria-label="Open product details"
          ></div>
          <Image
            src={safeImages[currentImageIndex].optimizeUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Image navigation buttons - always functional */}
          {isHovered && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-10"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-10"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators for image position */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIndex === idx
                    ? "bg-white w-3"
                    : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick view button in bottom right corner */}
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openModal}
              className="bg-white px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 shadow-md hover:bg-gray-50 transition-all duration-200"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Product details */}
        <div className="p-4 sm:p-5">
          <Link
            href={`/products/${product.id}`}
            className="group-hover:text-[#1E96FC] transition-colors duration-300"
          >
            <h3 className="font-medium text-gray-900 text-base sm:text-lg mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating - with subtle animation on hover */}
          <div className="flex items-center gap-1 mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {generateStars(product.rating || 0)}
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews || 0})
            </span>
          </div>

          {/* Price - with elegant styling */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base sm:text-lg font-semibold text-[#11296B]">
              ${(product.price || 0).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to cart button - elegant hover effect */}
          <button
            className="w-full mt-4 py-2.5 bg-[#11296B] text-white text-sm font-medium rounded-md hover:bg-[#1E96FC] transition-all duration-300 transform group-hover:translate-y-0 group-hover:shadow-md"
            onClick={() => handleAddToCart(quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal Window */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Gallery */}
              <div className="relative h-80 md:h-full p-6">
                <div className="relative h-full w-full">
                  <Image
                    src={safeImages[currentImageIndex].optimizeUrl}
                    alt={product.name}
                    className="object-contain rounded-md"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gallery Navigation */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                    <button
                      onClick={prevImage}
                      className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Previous image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Next image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-800"
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

                  {/* Thumbnail Navigation */}
                  <div className="absolute bottom-0 inset-x-0 flex justify-center gap-2 pb-2">
                    {safeImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === idx
                            ? "bg-[#11296B] w-4"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      {generateStars(product.rating || 0)}
                      <span className="text-sm text-gray-500">
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-semibold text-[#11296B]">
                    ${(product.price || 0).toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {product.description || ""}
                </p>

                {/* Material */}
                {product.material && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Material
                    </h3>
                    <p className="text-gray-600">{product.material}</p>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Color
                    </h3>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 rounded-md text-sm ${
                            selectedColor === color
                              ? "bg-[#11296B] text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          } transition-colors`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Quantity
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                      disabled={quantity <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 12H6"
                        />
                      </svg>
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12M6 12h12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-auto flex gap-4">
                  <button
                    className="flex-1 py-3 bg-[#11296B] text-white font-medium rounded-md hover:bg-[#1E96FC] transition-colors"
                    onClick={() => handleAddToCart(quantity)}
                  >
                    Add to Cart
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
