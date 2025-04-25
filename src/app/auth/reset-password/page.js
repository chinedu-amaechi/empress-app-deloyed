"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Components
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Footer from "@/components/layout/footer";
import { postResetPassword } from "@/lib/auth-services";

function ResetPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  console.log("Token from URL:", token); // Debugging line

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    window.scrollY = 11;
    window.dispatchEvent(new Event("scroll"));
    document.body.dataset.resetPasswordPage = "true";

    return () => {
      delete document.body.dataset.resetPasswordPage;
      requestAnimationFrame(() => {
        if (window.scrollY <= 10) {
          window.scrollY = 0;
          window.dispatchEvent(new Event("scroll"));
        }
      });
    };
  }, []);

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Debugging line

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await postResetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: token,
      });

      if (response.status === 200) {
        setResetSuccess(true);
        toast.success("Your password has been reset successfully!");
        setTimeout(() => router.push("/auth/sign-in"), 2000);
      } else {
        toast.error(response.message || "Failed to reset password");
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
            {!resetSuccess ? (
              <>
                <Heading
                  level={2}
                  className="text-center text-2xl mb-2 text-gray-900"
                >
                  Reset Password
                </Heading>
                <p className="text-center text-gray-600 text-sm mb-8">
                  Enter your new password below.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      placeholder="Enter new password"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                      })}
                      className="w-full border-b border-gray-300 pb-2 pt-0 focus:border-[#11296B] outline-none transition-colors"
                      placeholder="Confirm new password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white font-normal bg-[#11296B] hover:bg-[#1E96FC] py-3.5 transition-colors rounded-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <Heading level={2} className="text-xl mb-3 text-gray-900">
                  Password Reset Successful
                </Heading>
                <p className="text-gray-600 text-sm mb-6">
                  Your password has been updated. Redirecting to sign-in page...
                </p>
                <Link
                  href="/auth/sign-in"
                  className="text-[#11296B] text-sm font-medium hover:text-[#1E96FC]"
                >
                  Go to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
