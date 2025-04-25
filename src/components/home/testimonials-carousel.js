// src/components/home/testimonials-carousel.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Heading from "@/components/ui/heading";

// Testimonials Data
const testimonials = [
  {
    id: "1",
    name: "Emily Richardson",
    location: "New York, NY",
    quote:
      "The Selene bracelet is absolutely stunning. It's become my go-to piece for both casual and formal events.",
    image: "/testimonials/emily.jpeg",
    rating: 5,
  },
  {
    id: "2",
    name: "Alexandra Chen",
    location: "San Francisco, CA",
    quote:
      "I love how each piece tells a story. The craftsmanship is exceptional, and the design is truly unique.",
    image: "/testimonials/alexandra.jpeg",
    rating: 5,
  },
  {
    id: "3",
    name: "Sophie Martin",
    location: "London, UK",
    quote:
      "An incredible gift that exceeded my expectations. The attention to detail is remarkable.",
    image: "/testimonials/sophie.jpeg",
    rating: 4,
  },
  {
    id: "4",
    name: "Beth Johnson",
    location: "Los Angeles, CA",
    quote:
      "The Jinhua bracelet is a work of art. It's the perfect blend of elegance and sophistication.",
    image: "/testimonials/beth.jpeg",
    rating: 4,
  },
  {
    id: "5",
    name: "Isabella Thompson",
    location: "Toronto, ON",
    quote:
      "The Marisole bracelet is simply breathtaking. It's a beautiful statement piece that I wear with pride.",
    image: "/testimonials/isabella.jpeg",
    rating: 5,
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-12 text-3xl md:text-4xl text-[#11296B] font-light tracking-tight"
        >
          What Our <span className="font-semibold">Customers Say</span>
        </Heading>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#F8F9FC] rounded-2xl shadow-lg p-8 md:p-12">
            {/* Testimonial Content */}
            <div className="flex flex-col md:flex-row items-center">
              {/* Customer Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 relative mb-6 md:mb-0 md:mr-8 rounded-full overflow-hidden shadow-md">
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Quote and Details */}
              <div className="text-center md:text-left flex-grow">
                <div className="mb-4">
                  <StarRating
                    rating={testimonials[currentTestimonial].rating}
                  />
                </div>
                <blockquote className="text-lg md:text-xl italic text-gray-800 mb-4">
                  &quot;{testimonials[currentTestimonial].quote}&quot;
                </blockquote>
                <div>
                  <p className="text-[#11296B] font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${
                      currentTestimonial === index
                        ? "bg-[#11296B] w-6"
                        : "bg-gray-300 hover:bg-[#11296B]/50"
                    }
                  `}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
