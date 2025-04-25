"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/contexts/auth-context";
import toast from "react-hot-toast";

// Components from your existing codebase
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";
import { updatePassword, updateProfile } from "@/lib/account-services";

// Mock services (replace with actual services)
const updateAccount = async (data) => {
  console.log("Updating account with:", data);
  return { status: 200, message: "Profile updated successfully" };
};

const changePassword = async (data) => {
  console.log("Changing password with:", data);
  return { status: 200, message: "Password changed successfully" };
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

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Profile form
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfileForm,
    watch: watchProfile,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  // Address form
  const {
    register: addressRegister,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors, isSubmitting: isAddressSubmitting },
    reset: resetAddressForm,
    watch: watchAddress,
  } = useForm({
    defaultValues: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      province: user?.address?.province || "",
      postalCode: user?.address?.postalCode || "",
    },
  });

  // Password change form
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm();

  // Initialize forms with user data when available
  useEffect(() => {
    if (user) {
      resetProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });

      resetAddressForm({
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        province: user?.address?.province || "",
        postalCode: user?.address?.postalCode || "",
      });
    }
  }, [user, resetProfileForm, resetAddressForm]);

  // Profile update handler
  const onProfileUpdate = async (data) => {
    try {
      const response = await updateProfile({ ...data, email: user?.email });
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setUser((prev) => ({ ...prev, ...data }));
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
      console.error(error);
    }
  };

  // Address update handler
  const onAddressUpdate = async (data) => {
    try {
      const addressData = {
        street: data.street,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        country: "Canada",
      };

      const response = await updateProfile(addressData);
      if (response.status === 200) {
        toast.success(response.message || "Address updated successfully");
        setUser((prev) => ({
          ...prev,
          address: addressData,
        }));
      } else {
        toast.error(response.message || "Failed to update address");
      }
    } catch (error) {
      toast.error("An error occurred while updating address");
      console.error(error);
    }
  };

  // Password change handler
  const onPasswordChange = async (data) => {
    try {
      console.log("Changing password with:", data);

      const response = await updatePassword(data);

      console.log("Password change response:", response);

      if (response.status === 200) {
        toast.success("Password changed successfully");
        resetPasswordForm();
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing password");
      console.error(error);
    }
  };

  // Two-factor authentication toggle handler
  const handleTwoFactorToggle = () => {
    const newState = !twoFactorEnabled;
    setTwoFactorEnabled(newState);

    // In a real implementation, you would call an API here
    if (newState) {
      toast.success("Two-factor authentication enabled");
    } else {
      toast.success("Two-factor authentication disabled");
    }
  };

  // Account deletion handler
  const handleAccountDeletion = () => {
    // Mock account deletion
    setUser(null);
    toast.success("Account deleted successfully");
    router.push("/");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#11296B]"></div>
            <p className="text-lg text-gray-700">Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Account Header */}
          <div className="mb-10">
            <div className="mb-6 flex flex-col md:flex-row md:items-center">
              <div className="mr-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-r from-[#11296B] to-[#1E96FC] text-center text-4xl font-semibold text-white flex items-center justify-center">
                {user?.firstName?.charAt(0) || ""}
                {user?.lastName?.charAt(0) || ""}
              </div>
              <div className="mt-4 md:mt-0">
                <Heading level={1} className="mb-1 text-gray-900">
                  {user?.firstName} {user?.lastName}
                </Heading>
                <div className="flex items-center">
                  <p className="text-gray-500">{user?.email}</p>
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <svg
                      className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-4 text-sm font-medium focus:outline-none ${
                  activeTab === "profile"
                    ? "border-b-2 border-[#11296B] text-[#11296B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`pb-4 text-sm font-medium focus:outline-none ${
                  activeTab === "address"
                    ? "border-b-2 border-[#11296B] text-[#11296B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`pb-4 text-sm font-medium focus:outline-none ${
                  activeTab === "security"
                    ? "border-b-2 border-[#11296B] text-[#11296B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Security
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <Heading level={2} className="mb-3 text-gray-900">
                  Personal Information
                </Heading>
                <form
                  onSubmit={handleProfileSubmit(onProfileUpdate)}
                  className="space-y-6"
                >
                  <p className="text-sm text-gray-500 mb-10">
                    Update your personal information below.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...profileRegister("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {profileErrors.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {profileErrors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...profileRegister("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {profileErrors.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {profileErrors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="flex items-center">
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500"
                        />
                        <div className="ml-2 text-xs text-gray-500 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          Locked
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Email address cannot be changed directly for security
                        reasons
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...profileRegister("phone", {
                          required: "Phone number is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {profileErrors.phone && (
                        <p className="mt-1 text-xs text-red-600">
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="w-full rounded-none bg-[#11296B] px-4 py-3 text-base font-normal text-white transition-colors hover:bg-[#1E96FC] md:w-auto md:px-6"
                      disabled={isProfileSubmitting}
                    >
                      {isProfileSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div>
                <Heading level={2} className="mb-6 text-gray-900">
                  Address Information
                </Heading>
                <form
                  onSubmit={handleAddressSubmit(onAddressUpdate)}
                  className="space-y-6"
                >
                  {/* Street */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...addressRegister("street", {
                        required: "Street address is required",
                      })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                    />
                    {addressErrors.street && (
                      <p className="mt-1 text-xs text-red-600">
                        {addressErrors.street.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* City */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        {...addressRegister("city", {
                          required: "City is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {addressErrors.city && (
                        <p className="mt-1 text-xs text-red-600">
                          {addressErrors.city.message}
                        </p>
                      )}
                    </div>

                    {/* Province */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Province
                      </label>
                      <select
                        {...addressRegister("province", {
                          required: "Province is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      >
                        <option value="">Select Province</option>
                        {provinces.map((province) => (
                          <option key={province.abbr} value={province.abbr}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {addressErrors.province && (
                        <p className="mt-1 text-xs text-red-600">
                          {addressErrors.province.message}
                        </p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        {...addressRegister("postalCode", {
                          required: "Postal code is required",
                          pattern: {
                            value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                            message:
                              "Please enter a valid Canadian postal code",
                          },
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {addressErrors.postalCode && (
                        <p className="mt-1 text-xs text-red-600">
                          {addressErrors.postalCode.message}
                        </p>
                      )}
                    </div>

                    {/* Country (disabled, fixed to Canada) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        value="Canada"
                        disabled
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="w-full rounded-none bg-[#11296B] px-4 py-3 text-base font-normal text-white transition-colors hover:bg-[#1E96FC] md:w-auto md:px-6"
                      disabled={isAddressSubmitting}
                    >
                      {isAddressSubmitting ? "Updating..." : "Update Address"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <Heading level={2} className="mb-6 text-gray-900">
                  Security Settings
                </Heading>

                {/* Password Change Section */}
                <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    Change Password
                  </h3>
                  <form
                    onSubmit={handlePasswordSubmit(onPasswordChange)}
                    className="space-y-4"
                  >
                    {/* Current Password */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...passwordRegister("currentPassword", {
                            required: "Current password is required",
                          })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                      {passwordErrors.currentPassword && (
                        <p className="mt-1 text-xs text-red-600">
                          {passwordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...passwordRegister("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#11296B] focus:outline-none focus:ring-1 focus:ring-[#11296B]"
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-1 text-xs text-red-600">
                          {passwordErrors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="rounded-lg bg-[#11296B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1E96FC]"
                        disabled={isPasswordSubmitting}
                      >
                        {isPasswordSubmitting
                          ? "Changing..."
                          : "Change Password"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Two-Factor Authentication Section */}
                <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        name="toggle"
                        id="2FA-toggle"
                        checked={twoFactorEnabled}
                        onChange={handleTwoFactorToggle}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="2FA-toggle"
                        className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 
                                   peer-checked:bg-[#11296B] after:absolute after:top-0.5 
                                   after:left-0.5 after:h-5 after:w-5 after:rounded-full 
                                   after:border after:border-gray-300 after:bg-white 
                                   after:transition-all after:content-[''] 
                                   peer-checked:after:translate-x-full 
                                   peer-checked:after:border-white"
                      ></label>
                    </div>
                  </div>

                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 mb-2">
                        Two-factor authentication is currently{" "}
                        <span className="text-green-600 font-medium">
                          enabled
                        </span>
                        . This adds an extra layer of security to your account.
                      </p>
                      <p className="text-xs text-gray-500">
                        When signing in, you will need to provide both your
                        password and a verification code sent to your device.
                      </p>
                    </div>
                  )}
                </div>

                {/* Account Deletion */}
                <div className="rounded-lg border border-red-100 bg-red-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-red-800">
                    Delete Account
                  </h3>
                  <p className="mb-4 text-sm text-red-700">
                    Once you delete your account, there is no going back. All of
                    your data will be permanently removed.
                  </p>

                  {showDeleteConfirm ? (
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="mb-4 text-sm font-medium text-gray-700">
                        Are you sure you want to delete your account? This
                        action cannot be undone.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                          onClick={handleAccountDeletion}
                        >
                          Yes, Delete Account
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Account
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
