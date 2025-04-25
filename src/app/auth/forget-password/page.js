"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Components
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Footer from "@/components/layout/footer";
import { postForgotPassword } from "@/lib/auth-services";

// Mock service (replace with actual service)
const requestPasswordReset = async (email) => {
  console.log("Requesting password reset for:", email);
  return { status: 200, message: "Password reset link sent successfully" };
};

function ForgetPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the email input for styling label
  const watchEmail = watch("email", "");

  // Match navigation styling with sign-in page
  useEffect(() => {
    window.scrollY = 11;
    window.dispatchEvent(new Event("scroll"));
    document.body.dataset.forgetPasswordPage = "true";

    return () => {
      delete document.body.dataset.forgetPasswordPage;

      requestAnimationFrame(() => {
        if (window.scrollY <= 10) {
          window.scrollY = 0;
          window.dispatchEvent(new Event("scroll"));
        }
      });
    };
  }, []);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await postForgotPassword(data.email);

      if (response.status === 200) {
        setUserEmail(data.email);
        setResetRequested(true);
        toast.success("Reset link sent to your email");
      } else {
        toast.error(response.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!resetRequested ? (
              <>
                <Heading
                  level={2}
                  className="text-center text-2xl mb-2 text-gray-900"
                >
                  Forgot Password
                </Heading>

                <p className="text-center text-gray-600 text-sm mb-8">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
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

                  <button
                    type="submit"
                    className="w-full text-white font-normal bg-[#11296B] hover:bg-[#1E96FC] py-3.5 transition-colors rounded-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              // Success state
              <div className="text-center py-4">
                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <Heading level={2} className="text-xl mb-3 text-gray-900">
                  Check Your Email
                </Heading>

                <p className="text-gray-600 text-sm mb-6">
                  We&apos;ve sent a password reset link to
                  <div className="font-medium mt-1 text-gray-900">
                    {userEmail}
                  </div>
                </p>

                <p className="text-gray-500 text-xs mb-6">
                  If you don&apos;t see the email in your inbox, please check
                  your spam folder.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setResetRequested(false)}
                    className="text-gray-600 text-sm underline hover:text-[#11296B]"
                  >
                    Try a different email
                  </button>

                  <Link
                    href="/auth/sign-in"
                    className="text-[#11296B] text-sm font-medium hover:text-[#1E96FC]"
                  >
                    Return to sign in
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-10 border-t border-gray-300"></div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remembered your password?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-[#11296B] hover:text-[#1E96FC] font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ForgetPassword;
