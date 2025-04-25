// apps/empress-app/src/components/about-us/values.js
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Heading from "@/components/ui/heading";

const OurValues = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const values = [
    {
      title: "Excellence",
      description:
        "We pursue perfection in every detail, from material selection to the final polish.",
    },
    {
      title: "Authenticity",
      description:
        "Each piece reflects our genuine passion for the craft and honors the unique story of its wearer.",
    },
    {
      title: "Innovation",
      description:
        "While respecting tradition, we constantly explore new techniques and designs that push boundaries.",
    },
    {
      title: "Sustainability",
      description:
        "We are committed to ethical practices that minimize our environmental impact and support communities.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#11296B] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Heading
            level={1}
            className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-white"
          >
            Our <span className="font-semibold">Values</span>
          </Heading>

          <div className="w-16 h-0.5 bg-amber-300 mx-auto my-6"></div>

          <p className="text-lg text-white/80 leading-relaxed">
            These core principles guide everything we do at Empress, from design
            and production to customer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border border-white/10 p-8 rounded-sm backdrop-blur-sm hover:bg-white/5 transition-colors duration-300"
            >
              <Heading
                level={3}
                className="text-2xl font-medium mb-4 text-amber-300"
              >
                {value.title}
              </Heading>

              <p className="text-white/80">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
