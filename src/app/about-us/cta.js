// apps/empress-app/src/components/about-us/cta.js
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Heading from "@/components/ui/heading";

const CtaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#f8f9fa] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Heading
            level={1}
            className="text-3xl sm:text-4xl text-[#11296B] font-light tracking-tight mb-6"
          >
            Discover Your <span className="font-semibold">Signature Piece</span>
          </Heading>

          <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Explore our collections and find the bracelet that speaks to your
            personal story. Each Empress creation is waiting to become part of
            your journey.
          </p>

          <Link
            href="/collections?collection=Heritage"
            className="inline-block px-8 py-3 bg-[#11296B] text-white hover:bg-amber-500 transition-colors duration-300 rounded-sm"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-200 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#11296B] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
};

export default CtaSection;
