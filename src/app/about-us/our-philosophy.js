// apps/empress-app/src/components/about-us/our-philosophy.js
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Heading from "@/components/ui/heading";

const OurPhilosophy = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggeredChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="our-philosophy" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggeredChildren}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeIn}>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl text-[#11296B] font-light tracking-tight mb-4"
            >
              Our <span className="font-semibold">Philosophy</span>
            </Heading>

            <div className="w-16 h-0.5 bg-amber-300 mx-auto my-6"></div>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-600 leading-relaxed"
          >
            At Empress, we believe in the transformative power of jewelry. Each
            piece is more than an accessory - it&apos;s a vessel of personal
            expression, a talisman of confidence, and a companion to your most
            cherished memories.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-96 md:h-[500px] rounded-sm overflow-hidden"
          >
            <Image
              src="/Empress/Ethereal/Sorelle/IMG_1904.JPG"
              alt="Handcrafting jewelry"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggeredChildren}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="space-y-4">
              <Heading
                level={3}
                className="text-2xl text-[#11296B] font-medium"
              >
                Timeless Elegance
              </Heading>
              <p className="text-gray-600 leading-relaxed">
                We create designs that transcend trends, focusing on timeless
                elegance that speaks to the modern empress in every woman. Our
                pieces are crafted to be cherished now and for generations to
                come.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-4">
              <Heading
                level={3}
                className="text-2xl text-[#11296B] font-medium"
              >
                Artisanal Craftsmanship
              </Heading>
              <p className="text-gray-600 leading-relaxed">
                Every Empress piece is handcrafted by skilled artisans who bring
                decades of experience to their work. We honor traditional
                techniques while embracing innovation, resulting in jewelry that
                stands apart in its quality and beauty.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-4">
              <Heading
                level={3}
                className="text-2xl text-[#11296B] font-medium"
              >
                Ethical Sourcing
              </Heading>
              <p className="text-gray-600 leading-relaxed">
                We are committed to responsible practices at every step of our
                creative process. From ethically sourced materials to
                eco-conscious packaging, we strive to create beauty that honors
                our planet and its people.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophy;
