"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const CollectionNavigator = ({
  collections,
  currentCollection,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    setCurrentIndex(
      collections.findIndex((collection) => collection === currentCollection)
    );
  }, [currentCollection, collections]);
  console.log(collections);
  console.log(currentCollection);

  console.log("Current Index:", currentIndex);
  // // Get the collection keys in the correct order
  // const collectionKeys = Object.keys(collections);

  // // Find the current index
  // const currentIndex = collectionKeys.indexOf(currentCollection);

  // Determine previous and next collections
  const prevCollection =
    currentIndex > 0 ? collections[currentIndex - 1] : null;

  const nextCollection =
    currentIndex < collections.length - 1
      ? collections[currentIndex + 1]
      : null;

  return (
    <div className="flex justify-between items-center py-8 mt-12 border-t border-gray-200">
      <button
        onClick={() => prevCollection && onNavigate(prevCollection.name)}
        disabled={!prevCollection}
        className={`group flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${
          prevCollection
            ? "text-gray-700 hover:text-[#11296B] hover:bg-amber-50"
            : "text-gray-300 cursor-not-allowed"
        }`}
      >
        <ArrowLeftCircle className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">
          {prevCollection
            ? `Previous: ${prevCollection.name}`
            : "No Previous Collection"}
        </span>
      </button>

      <button
        onClick={() => nextCollection && onNavigate(nextCollection.name)}
        disabled={!nextCollection}
        className={`group flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${
          nextCollection
            ? "text-gray-700 hover:text-[#11296B] hover:bg-amber-50"
            : "text-gray-300 cursor-not-allowed"
        }`}
      >
        <span className="font-medium">
          {nextCollection
            ? `Next: ${nextCollection.name}`
            : "No Next Collection"}
        </span>
        <ArrowRightCircle className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default CollectionNavigator;
