"use client";

import React from "react";

const Header = () => {
  return (
    <header className="relative">

      {/* Compact Hero Section */}
      <div className="relative pt-16 flex items-center min-h-[100vh]">
        {/* Background Image with Subtle Overlay */}
        <div
          className="absolute top-0 w-full h-full  bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/Empress/Heritage/Suyan/IMG_1801.JPG')",

          }}
        >
          <span className="w-full h-full absolute opacity-30 bg-black"></span>
        </div>

        {/* Minimal Hero Content */}
        <div className="container relative p-12 md:py-16">
          <div className="max-w-lg">
            <h1 className="text-white font-light text-4xl md:text-5xl mb-4 leading-tight">
              Rule with{" "}
              <span className="font-semibold">Elegance</span>
            </h1>
            <p className="mt-4 text-lg text-white font-light">
              Handcrafted bracelets designed for timeless sophistication.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
