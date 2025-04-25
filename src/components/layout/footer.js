"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gradient-to-b from-[#11296B] to-[#0A1942] border-t border-gray-100">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8">
          {/* Brand and description */}
          <div className="md:col-span-1 pr-4 relative">
            <div className="relative h-16 w-auto">
              <Image
                src="/Icons/empress_logo_white.png"
                href="/"
                alt="Empress Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="absolute w-24 h-24 bg-white/5 rounded-full -top-5 -left-5 blur-xl"></div>

            {/* Social media icons */}
            <div className="flex mt-6 space-x-5">
              {/* instagram */}
              <a
                href="https://www.instagram.com/_empressofficial_/"
                target="_blank"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <img
                  src="/Icons/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              {/* tik tok */}
              <a
                href="https://www.tiktok.com/@empresscanada"
                target="_blank"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <img
                  src="/Icons/tiktok.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              {/* Etsy*/}
              <a
                href="https://empresscanada.etsy.com"
                target="_blank"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <img src="/Icons/Etsy.png" alt="Etsy" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                   href="/collections?collection=Heritage"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Collections
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Bestsellers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    All Products
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-white/80 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            {/* <h3 className="text-sm font-semibold tracking-widest text-white uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/50 after:mt-2 mb-6">
              Stay Connected
            </h3>
            <p className="mt-4 text-base text-white/90">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="mt-4">
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full min-w-0 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-[#11296B] bg-white border border-transparent rounded-md sm:rounded-l-none hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white"
                >
                  Join
                </button>
              </div>

            </form> */}

            {/* <div className="mt-6">

              <h4 className="text-sm font-medium text-white mb-3">
                Payment Methods
              </h4>
              <div className="flex space-x-3">
                <div className="bg-white/10 p-2 rounded">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2 4h20v16H2V4zm18 14V6H4v12h16z" />
                    <path d="M6 10h4v2H6z" />
                    <path d="M12 10h6v2h-6z" />
                    <path d="M6 14h12v2H6z" />
                  </svg>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                    <circle cx="7" cy="13" r="2" />
                    <circle cx="17" cy="13" r="2" />
                    <circle cx="12" cy="13" r="2" />
                  </svg>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                    <path d="M4 6h16v4H4z" />
                  </svg>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Copyright and policies */}
        <div className="flex flex-col items-center pt-10 mt-16 border-t border-white/20 md:flex-row md:justify-between">
          <div className="flex space-x-6 text-sm text-white/70">
            {/* <Link

              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/shipping"
              className="hover:text-white transition-colors"
            >
              Shipping
            </Link> */}
          </div>
          <p className="mt-8 text-sm text-white/70 md:mt-0">
            &copy; {currentYear} Empress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
