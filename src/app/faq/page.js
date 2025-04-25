// src/app/faq/page.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";
import { allFaqs, getCategories, filterFaqs } from "./faq-data";
import EmpressChatbot from "@/components/chatbot/empress-chatbot";

// FAQItem Component
const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="border-b border-gray-200 overflow-hidden transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full py-5 text-left flex justify-between items-center"
        aria-expanded={isActive}
      >
        <span className="text-lg font-normal text-[#11296B]">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#11296B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? "max-h-[500px] pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed pr-6">{answer}</p>
      </div>
    </div>
  );
};

// Improved Search Bar Component with more visible styling
const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="relative max-w-xl mx-auto mb-16 group">
      <div
        className="absolute inset-0 
        bg-gradient-to-r from-[#11296B]/20 to-[#1E96FC]/20 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 
        rounded-2xl blur-2xl z-0"
      ></div>

      <div
        className="relative z-10 
        bg-white 
        rounded-2xl 
        border border-[#11296B]/10 
        shadow-[0_10px_40px_rgba(17,41,107,0.1)] 
        overflow-hidden"
      >
        <div
          className="absolute left-0 top-0 h-full w-1 
          bg-gradient-to-b from-[#11296B] to-[#1E96FC] 
          transition-all duration-300 
          group-hover:opacity-100 
          opacity-0"
        ></div>

        <input
          type="text"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="w-full px-6 py-4 
            bg-transparent 
            text-gray-800 
            placeholder-gray-400 
            focus:outline-none 
            border-b border-gray-200
            transition-colors duration-300 
            focus:border-[#11296B]
            group-hover:pl-8
            pr-16"
        />
        <button
          onClick={onSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
            text-gray-400 
            hover:text-[#11296B] 
            transition-colors duration-300 
            p-2 
            hover:bg-[#11296B]/5 
            rounded-full 
            group/button"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 
              transition-transform duration-300 
              group-hover/button:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Enhanced Category Tabs Component with more interactive styling
const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white rounded-full shadow-[0_4px_20px_rgba(17,41,107,0.05)] p-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium 
              transition-all duration-300 ease-in-out 
              relative overflow-hidden group
              ${
                activeCategory === category
                  ? "text-white bg-[#11296B] shadow-lg"
                  : "text-gray-600 hover:bg-[#11296B]/5 hover:text-[#11296B]"
              }
            `}
          >
            {/* Subtle hover effect */}
            <span className="absolute inset-0 bg-[#11296B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function FAQ() {
  // Get categories from the imported data
  const categories = getCategories();

  // State hooks
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqs);
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroVisible, setHeroVisible] = useState(false);

  // Ref for chatbot trigger
  const chatbotTriggerRef = useRef(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set hero visibility after component mounts
  useEffect(() => {
    setHeroVisible(true);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    // Use the filterFaqs utility function from faq-data.js
    const result = filterFaqs(activeCategory, searchQuery);

    setFilteredFaqs(result);
    // Reset active index when filters change
    setActiveIndex(null);
  }, [searchQuery, activeCategory]);

  // Toggle FAQ expansion
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle search button click
  const handleSearch = () => {
    // The filtering is already handled by the useEffect
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hidden button to trigger chatbot */}
      <div className="hidden">
        <EmpressChatbot ref={chatbotTriggerRef} />
      </div>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* Luxury Decorative Elements */}
        <div className="absolute top-0 left-0 -mt-20 w-40 h-40 bg-[#f8f9fc] rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-60 h-60 bg-[#11296B]/5 rounded-full opacity-50 blur-3xl"></div>

        {/* Search and Heading Section */}
        <div className="relative z-10 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              level={1}
              className="text-3xl font-light text-[#11296B] mb-6 mt-12"
            >
              Frequently Asked Questions
            </Heading>
            <div className="h-px w-16 bg-amber-300 mx-auto mb-8"></div>
          </motion.div>

          {/* Improved Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* Enhanced Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* FAQ Accordion Items */}
        <div className="relative z-10">
          {filteredFaqs.length > 0 ? (
            <div className="bg-white p-8 md:p-12 shadow-md">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeIndex === index}
                    onClick={() => toggleFAQ(index)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow-md">
              <p className="text-gray-500 mb-4">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="inline-block px-6 py-2 bg-[#11296B] text-white 
                  hover:bg-[#1E96FC] transition-colors duration-300 
                  text-sm"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Section with Luxury Styling */}
        <div className="mt-20 text-center relative z-10">
          <div className="h-px w-16 bg-amber-300 mx-auto mb-8"></div>
          <Heading
            level={2}
            className="text-2xl font-light text-[#11296B] mb-4"
          >
            Still Have Questions?
          </Heading>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our customer care specialists are here to assist you with any
            inquiries about our products or services.
          </p>
          <a
            href='/contact'
            className="inline-block px-8 py-4 border border-[#11296B] text-[#11296B] 
            hover:bg-[#11296B] hover:text-white 
            transition-all duration-300 
            uppercase tracking-wider text-sm font-light"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
