"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";

const ProductHero = () => {
  // Hero slideshow images
  const heroImages = useMemo(
    () => [
      "/Empress/Divine/Verdana/IMG_2089 2.jpg",
      "/Empress/Ethereal/Aurelia/IMG_1959.jpg",
      "/Empress/Heritage/Suyan/IMG_1802.jpg",
    ],
    []
  );

  // Ref for chatbot trigger
  const chatbotTriggerRef = useRef(null);

  // State for hero image slideshow and visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Effect for image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    // Set visibility
    setIsVisible(true);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Bracelets Background ${index + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-white"
        >
          <Heading
            level={1}
            className="font-light text-4xl sm:text-5xl md:text-6xl mb-6 tracking-tight"
          >
            Explore timeless <span className="font-semibold">Elegance</span>
          </Heading>

          <div className="w-24 h-1 bg-amber-300 mb-8"></div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl font-light mb-8 text-white/90 leading-relaxed"
          >
            Crafted with precision and passion, our bracelets are more than just
            accessories. Each piece tells a unique story, designed to empower
            and inspire the woman who wears it.
          </motion.p>

          {/* Contact Us Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
