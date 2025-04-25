"use client";

import { useAuthContext } from "@/app/contexts/auth-context";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { postSignIn } from "@/lib/auth-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Footer from "@/components/layout/footer";

function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user, setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  // Watch the input values to determine if fields have content
  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");

  // // Force the navbar to appear in "scrolled" state
  // useEffect(() => {
  //   // Programmatically create a scroll event that the Navbar will detect
  //   const scrollEvent = new Event("scroll");

  //   // Set a small timeout to ensure the component is mounted
  //   const timer = setTimeout(() => {
  //     // Artificially set the scroll position to trigger the navbar's scrolled state
  //     window.scrollY = 11; // Just above the 10px threshold in the Navbar

  //     // Dispatch the event to trigger the navbar's scroll handler
  //     window.dispatchEvent(scrollEvent);
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, []);

  // In your sign-in page
  useEffect(() => {
    // Force navbar into scrolled state for sign-in page
    window.scrollY = 11;
    window.dispatchEvent(new Event("scroll"));

    // Also set a flag that this is the sign-in page
    document.body.dataset.signInPage = "true";

    return () => {
      // When leaving sign-in page, clean up
      // delete document.body.dataset.signInPage;

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
    console.log(data);
    try {
      const response = await postSignIn(data);
      console.log("Response:", response);

      if (response.status === 200) {
        toast.success(response.message);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        router.push("/products");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Sign in failed. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <main className="flex-grow pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            {/* Sign In Section */}
            <div className="md:border-r md:border-[#1E96FC] md:pr-10 lg:pr-16 pb-10 md:pb-0 w-full">
              <div className="max-w-md md:ml-auto md:mr-0 mx-auto">
                <Heading level={1} className="text-2xl text-gray-900 mb-2">
                  Sign In
                </Heading>
                <p className="text-sm text-gray-700 mb-8">
                  Please sign in to your Empress Account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watchEmail
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

                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 ${
                        watchPassword
                          ? "text-xs -top-4 text-gray-600"
                          : "text-base top-0 text-gray-400"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors pr-16"
                        autoComplete="current-password"
                        placeholder=""
                      />
                      <button
                        type="button"
                        className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                              clipRule="evenodd"
                            />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="remember-me"
                      {...register("rememberMe")}
                      className="h-4 w-4 border-gray-300 text-[#11296B] focus:ring-[#11296B] rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="mt-4 ">
                    <Link
                      href="/auth/forget-password"
                      className="text-sm text-gray-600 hover:text-[#11296B] hover:underline transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-normal bg-[#11296B] hover:bg-[#1E96FC] py-3.5 transition-colors  rounded-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>

            {/* Create Account Section */}
            <div className="mt-10 md:mt-0 w-full md:pl-10 lg:pl-16">
              <div className="max-w-md md:mr-auto md:ml-0 mx-auto">
                <Heading level={1} className="text-2xl text-gray-900 mb-2">
                  Create an Account
                </Heading>
                <p className="text-sm text-gray-700 mb-8">
                  Save time during checkout, view your shopping bag and saved
                  items from any device and access your order history.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-2 text-sm text-gray-600">
                      Faster checkout with saved shipping details
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-2 text-sm text-gray-600">
                      Access your order history and track shipments
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-2 text-sm text-gray-600">
                      Save your favorite items for later
                    </p>
                  </div>
                </div>

                <Link href="/auth/sign-up" className="block w-full">
                  <button className="w-full bg-[#11296B] text-white font-normal hover:bg-[#1E96FC] py-3.5 transition-colors rounded-none">
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignIn;
