"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/heading";
import toast from "react-hot-toast";
import { postSignUp } from "@/lib/auth-services";
import { useRouter } from "next/navigation";
import Footer from "@/components/layout/footer";

// Bracelet Image Carousel component
const BraceletCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define bracelet images (replace these with your actual bracelet image paths)
  const braceletImages = [
    "/product-hero/hero-background-1.jpg",
    "/product-hero/hero-background-2.jpg",
    "/product-hero/hero-background-3.jpg",
    "/product-hero/hero-background-4.jpg",
    "/product-hero/hero-background-5.jpg"
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === braceletImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [braceletImages.length]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      {/* Increased size of the card by using max-w-lg instead of max-w-sm */}
      <div className="max-w-lg w-full">
        {/* Bracelet Card - increased height and added more padding */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
          {/* Image Container - increased aspect ratio for a larger image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {braceletImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image}
                  alt={`Empress Bracelet ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Card Content - increased padding */}
          <div className="p-8 text-center">
            <h3 className="text-2xl font-medium text-[#11296B] mb-3">
              Empress Collection
            </h3>
            <p className="text-gray-600 text-base">
              Elegance crafted with precision and passion
            </p>
          </div>
        </div>
      </div>

      {/* Dot indicators - increased spacing and size */}
      <div className="flex justify-center mt-8 space-x-3">
        {braceletImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-[#11296B] w-6" : "bg-gray-300"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`View bracelet ${index + 1}`}
          />
        ))}
      </div>

      {/* Branding */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-light text-[#11296B]">Empress Jewelry</h2>
        <p className="text-sm text-gray-600">Elegance in every detail</p>
      </div>
    </div>
  );
};

const provinces = [
  { name: "Alberta", abbr: "AB" },
  { name: "British Columbia", abbr: "BC" },
  { name: "Manitoba", abbr: "MB" },
  { name: "New Brunswick", abbr: "NB" },
  { name: "Newfoundland and Labrador", abbr: "NL" },
  { name: "Nova Scotia", abbr: "NS" },
  { name: "Ontario", abbr: "ON" },
  { name: "Prince Edward Island", abbr: "PE" },
  { name: "Quebec", abbr: "QC" },
  { name: "Saskatchewan", abbr: "SK" },
  { name: "Northwest Territories", abbr: "NT" },
  { name: "Nunavut", abbr: "NU" },
  { name: "Yukon", abbr: "YT" },
];

function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Force navbar to appear in "scrolled" state, similar to sign-in page
  useEffect(() => {
    // Force navbar into scrolled state
    window.scrollY = 11;
    window.dispatchEvent(new Event("scroll"));

    // Set a flag that this is the sign-in page
    document.body.dataset.signUpPage = "true";

    return () => {
      // When leaving sign-up page, clean up
      delete document.body.dataset.signUpPage;

      // Force a layout calculation that will cause the Navbar to update
      requestAnimationFrame(() => {
        // If we're not already scrolled, reset the navbar
        if (window.scrollY <= 10) {
          window.scrollY = 0; // Reset scroll position
          // Dispatch a scroll event to trigger the navbar's scroll handler
          window.dispatchEvent(new Event("scroll"));
        }
      });
    };
  }, []);

  async function onSubmit(data) {
    try {
      const response = await postSignUp({ ...data, country: "Canada" });

      if (response.status === 201) {
        toast.success(response.message);
        reset();
        router.push("/auth/sign-in");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
      console.error(error);
    }
  }

  const password = watch("password");

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <main className="flex-grow pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            {/* Bracelet Carousel Section - increased width */}
            <div className="md:border-r md:border-[#1E96FC] md:pr-10 lg:pr-16 pb-10 md:pb-0 w-full">
              <div className="w-full md:ml-auto md:mr-0 mx-auto">
                <BraceletCarousel />
              </div>
            </div>

            {/* Form Section */}
            <div className="mt-10 md:mt-0 w-full md:pl-10 lg:pl-16">
              <div className="max-w-md md:mr-auto md:ml-0 mx-auto">
                <Heading level={1} className="text-2xl text-gray-900 mb-2">
                  Create an Account
                </Heading>
                <p className="text-sm text-gray-700 mb-8">
                  Join Empress to enjoy personalized shopping experiences, save
                  your favorite pieces, and access exclusive content and offers.
                </p>

                {/* Error Messages at the Top */}
                {Object.keys(errors).length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    <h3 className="text-sm font-medium mb-2">
                      Please correct the following:
                    </h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {Object.values(errors).map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("email")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      autoComplete="email"
                      placeholder=""
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("password")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                        autoComplete="new-password"
                        placeholder=""
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("confirmPassword")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      autoComplete="new-password"
                      placeholder=""
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label
                        className={`absolute left-0 transition-all duration-200 ${
                          watch("firstName")
                            ? "text-xs -top-4 text-gray-600"
                            : "text-base top-0 text-gray-400"
                        }`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                        placeholder=""
                      />
                      {errors.firstName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label
                        className={`absolute left-0 transition-all duration-200 ${
                          watch("lastName")
                            ? "text-xs -top-4 text-gray-600"
                            : "text-base top-0 text-gray-400"
                        }`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                        placeholder=""
                      />
                      {errors.lastName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("phone")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Please enter a 10-digit phone number",
                        },
                      })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      placeholder=""
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Address Section */}
                  <div className="pt-4 mt-2">
                    <h3 className="text-base font-medium text-gray-700 mb-3">
                      Address Information
                    </h3>
                  </div>

                  {/* Street */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("street")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...register("street")}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      placeholder=""
                    />
                  </div>

                  {/* City */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watch("city")
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      City
                    </label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      placeholder=""
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* Province & Postal Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label
                        className={`absolute left-0 transition-all duration-200 ${
                          watch("province")
                            ? "text-xs -top-4 text-gray-600"
                            : "text-base top-0 text-gray-400"
                        }`}
                      >
                        Province
                      </label>
                      <select
                        {...register("province", {
                          required: "Province is required",
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors bg-transparent"
                      >
                        <option value=""></option>
                        {provinces.map((province) => (
                          <option key={province.abbr} value={province.abbr}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {errors.province && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.province.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label
                        className={`absolute left-0 transition-all duration-200 ${
                          watch("postalCode")
                            ? "text-xs -top-4 text-gray-600"
                            : "text-base top-0 text-gray-400"
                        }`}
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        {...register("postalCode", {
                          required: "Postal code is required",
                          pattern: {
                            value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                            message:
                              "Please enter a valid Canadian postal code",
                          },
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                        placeholder=""
                      />
                      {errors.postalCode && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("terms", {
                        required:
                          "You must agree to the terms and privacy policy",
                      })}
                      className="h-4 w-4 border-gray-300 text-[#11296B] focus:ring-[#11296B] rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-[#11296B] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#11296B] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.terms.message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full text-white font-normal bg-[#11296B] hover:bg-[#1E96FC] py-3.5 transition-colors rounded-none mt-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/sign-in"
                      className="text-[#11296B] hover:text-[#1E96FC] font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignUp;
