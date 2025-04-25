// apps/empress-app/src/components/about-us/our-story.js
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Heading from "@/components/ui/heading";

const OurStory = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <Heading
              level={1}
              className="text-3xl sm:text-4xl text-[#11296B] font-light tracking-tight mb-4"
            >
              The <span className="font-semibold">Empress</span> Journey
            </Heading>

            <div className="w-16 h-0.5 bg-amber-300 my-6"></div>

            <div className="space-y-6 text-gray-600">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="leading-relaxed"
              >
                Empress Canada has launched! We have been in business for 10+
                years over seas and we now aim to bring our designs to jewelry
                fans across the world. In collaboration with a highly
                experienced jewelry artisan based in China — who has already
                achieved significant success in the local market — we are now
                expanding our reach into North America, introducing our elegant
                designs to a new audience.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="leading-relaxed"
              >
                Founded in 2015 by Ting Ting Yan, Empress began as a pursuit of
                perfection in the art of bracelet making. What started as a
                small studio in TT&apos;s home has grown into an atelier
                celebrated for its distinctive designs and uncompromising
                quality.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="leading-relaxed"
              >
                Each collection tells a unique story, inspired by TT&apos;s deep
                appreciation for diverse cultural heritages. From the ethereal
                delicacy of our Celestial Bloom series to the bold statements of
                our Heritage line, every piece carries the unmistakable Empress
                signature.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="leading-relaxed"
              >
                Today, our team of dedicated artisans continues to push the
                boundaries of design while honoring the timeless techniques that
                form the foundation of our craft. We take pride in creating
                pieces that become part of your personal history – silent
                witnesses to your most precious moments.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative h-96 md:h-[600px] rounded-sm overflow-hidden">
              <Image
                src="/Empress/Heritage/Suyan/IMG_2079.JPG"
                alt="Empress founder"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg max-w-xs">
              <p className="text-[#11296B] font-medium text-lg">
                Ting Ting Yan
              </p>
              <p className="text-gray-600">Founder & Creative Director</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
