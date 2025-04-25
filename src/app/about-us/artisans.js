// apps/empress-app/src/components/about-us/artisans.js
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Heading from "@/components/ui/heading";

const OurArtisans = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const artisans = [
    {
      name: "Ting Ting Yan",
      role: "Founder",
      description:
        "With over 20 years of experience in fine jewelry craftsmanship, TT leads Empress with precision and artistic vision.",
    },
    {
      name: "Eddie Yang",
      role: "CEO",
      description:
        "Eddie's leadership ensures that every decision aligns with the company's values and goals, creating a seamless harmony between innovation and quality.",
    },
    {
      name: "Isabelle Helbig",
      role: "CTO",
      description:
        "With a keen eye for innovation and precision to every technological aspect of the company, Isabelle ensures seamless integration between cutting-edge solutions and our core operations.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Heading
            level={1}
            className="text-3xl sm:text-4xl text-[#11296B] font-light tracking-tight mb-4"
          >
            Our <span className="font-semibold">People</span>
          </Heading>

          <div className="w-16 h-0.5 bg-amber-300 mx-auto my-6"></div>

          <p className="text-lg text-gray-600 leading-relaxed">
            Behind every Empress piece is a dedicated team of individuals, from
            skilled artisans to business experts, all working together to bring
            our designs to life. Each person&apos;s passion, expertise, and
            commitment to excellence contribute to the creation of every
            bracelet, ensuring that we consistently meet the highest standards.
            It&apos;s the collective effort of our people that drives our
            success and makes each piece truly exceptional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <motion.div
              key={artisan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              {/* <div className="relative h-80 rounded-sm overflow-hidden mb-6">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div> */}

              <Heading
                level={3}
                className="text-xl text-[#11296B] font-medium mb-2"
              >
                {artisan.name}
              </Heading>

              <p className="text-amber-600 font-medium mb-3">{artisan.role}</p>

              <p className="text-gray-600">{artisan.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurArtisans;
