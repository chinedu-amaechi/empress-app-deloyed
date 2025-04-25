// src/app/products/review-section.js
"use client";

import { useState } from "react";
import Heading from "@/components/ui/heading";

// Sample reviews data (to be replaced with actual data later)
const sampleReviews = [
  {
    id: 1,
    name: "Emily R.",
    date: "2023-11-15",
    rating: 5,
    title: "Absolutely stunning!",
    content:
      "I've received so many compliments on this bracelet. The craftsmanship is exceptional and it looks even better in person than in the pictures.",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah K.",
    date: "2023-10-28",
    rating: 4,
    title: "Beautiful piece",
    content:
      "Lovely design and quality materials. The clasp could be a bit sturdier, but overall I'm very happy with my purchase.",
    verified: true,
  },
  {
    id: 3,
    name: "Michael T.",
    date: "2023-09-12",
    rating: 5,
    title: "Perfect gift",
    content:
      "Bought this for my wife's birthday and she absolutely loves it. The packaging was beautiful and added to the luxury experience.",
    verified: true,
  },
];

const ReviewSection = ({
  productId,
  collectionId,
  reviews = [],
  rating = 0,
}) => {
  const [sortOption, setSortOption] = useState("recent");
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Use sample reviews if no reviews provided
  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;

  // Calculate rating counts and percentages for the rating breakdown
  const totalReviews = displayReviews.length;
  const ratingCounts = {
    5: displayReviews.filter((review) => review.rating === 5).length,
    4: displayReviews.filter((review) => review.rating === 4).length,
    3: displayReviews.filter((review) => review.rating === 3).length,
    2: displayReviews.filter((review) => review.rating === 2).length,
    1: displayReviews.filter((review) => review.rating === 1).length,
  };

  const ratingPercentages = Object.entries(ratingCounts).reduce(
    (acc, [rating, count]) => {
      acc[rating] = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return acc;
    },
    {}
  );

  // Sort reviews based on selected option
  const sortedReviews = [...displayReviews].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "highest") {
      return b.rating - a.rating;
    } else if (sortOption === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  // Format date in a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render stars for a given rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  // Toggle review form
  const toggleWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };

  return (
    <div className="mt-16 mb-16">
      <Heading level={2} className="text-2xl font-light text-[#11296B] mb-8">
        Customer <span className="font-semibold">Reviews</span>
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating summary */}
        <div className="md:col-span-1">
          <div className="bg-[#f8f9fc] p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-5xl font-light text-[#11296B]">
                {rating.toFixed(1)}
              </div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(rating))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Based on {totalReviews} reviews
              </div>
            </div>

            {/* Rating breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((starCount) => (
                <div key={starCount} className="flex items-center">
                  <div className="text-sm text-gray-600 w-8">{starCount}★</div>
                  <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${ratingPercentages[starCount]}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 w-8 text-right">
                    {ratingCounts[starCount]}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={toggleWriteReview}
              className="w-full mt-6 py-2 bg-[#11296B] text-white text-sm font-medium rounded-md hover:bg-[#1E96FC] transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="md:col-span-2">
          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {sortedReviews.length} reviews
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B]"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          {/* Write review form */}
          {showWriteReview && (
            <div className="bg-[#f8f9fc] p-6 rounded-lg mb-6">
              <Heading
                level={3}
                className="text-lg font-medium text-[#11296B] mb-4"
              >
                Write a Review
              </Heading>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#11296B] focus:border-[#11296B]"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="py-2 px-4 bg-[#11296B] text-white text-sm font-medium rounded-md hover:bg-[#1E96FC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#11296B] focus:ring-opacity-50"
                  >
                    Submit Review
                  </button>

                  <button
                    type="button"
                    onClick={toggleWriteReview}
                    className="py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews */}
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-1">
                      {renderStars(review.rating)}
                    </div>

                    <h3 className="text-lg font-medium text-[#11296B]">
                      {review.title}
                    </h3>
                  </div>

                  <div className="text-sm text-gray-500">
                    {formatDate(review.date)}
                  </div>
                </div>

                <p className="mt-3 text-gray-700">{review.content}</p>

                <div className="flex items-center mt-4">
                  <div className="text-sm font-medium text-gray-700">
                    {review.name}
                  </div>

                  {review.verified && (
                    <div className="ml-3 text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                      Verified Purchase
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 space-x-4">
                  <button className="text-sm text-gray-500 hover:text-[#11296B] flex items-center transition-colors">
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
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Helpful
                  </button>

                  <button className="text-sm text-gray-500 hover:text-[#11296B] transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
