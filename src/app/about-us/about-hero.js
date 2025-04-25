// apps/empress-app/src/app/about-us/about-hero.js
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Empress/Heritage/Jinhua/IMG_1810.JPG"
          alt="Jinhua"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>

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
            Our <span className="font-semibold">Story</span>
          </Heading>

          <div className="w-24 h-1 bg-amber-300 mb-8"></div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl font-light mb-8 text-white/90 leading-relaxed"
          >
            Empress was born from a passion for artistry and the belief that
            every woman deserves to feel like royalty. Our journey began in a
            small workshop with a vision to create jewelry that transcends
            trends and becomes a treasured part of your story.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
