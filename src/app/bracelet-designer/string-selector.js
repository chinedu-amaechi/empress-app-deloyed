"use client";
import React from "react";
import Image from "next/image";

const COLORS = [
  { id: "blue", name: "Blue" },
  { id: "cyan", name: "Cyan" },
  { id: "gold", name: "Gold" },
  { id: "pearl", name: "Pearl" },
  { id: "pink", name: "Pink" },
  { id: "purple", name: "Purple" },
  { id: "white", name: "White" },
];

const STRING_TYPES = [
  { id: "with-clasp", name: "With Clasp" },
  { id: "no-clasp", name: "No Clasp" },
];

const StringSelector = ({ selectedString, selectedColor, onSelect }) => {
  const handleSelect = (styleId, colorId) => {
    onSelect(`${colorId}-${styleId}`);
  };

  // Extract the simplified style ("with" or "no") from selectedString
  const currentStyle = selectedString.split("-").slice(-2)[0] || "with"; // Extracts "with" or "no", defaults to "with"

  // Map the simplified style back to the full style name for image paths
  const fullStyle = currentStyle === "with" ? "with-clasp" : "no-clasp";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4">Bracelet Style and Color</h2>

      {/* Style Selection */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Bracelet Style</h3>
        <div className="flex gap-2">
          {STRING_TYPES.map((style) => {
            const styleImagePath = `/customization/bracelet/bracelet-${style.id}/blue.png`; // Fixed color for style preview
            return (
              <button
                key={style.id}
                className={`flex-1 py-2 px-3 rounded-md border-2 transition-all flex flex-col items-center
                  ${
                    selectedString.endsWith(style.id)
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                onClick={() =>
                  handleSelect(style.id, selectedColor || COLORS[0].id)
                }
              >
                <div className="relative w-[50px] h-[50px]">
                  <Image
                    src={styleImagePath}
                    alt={style.name}
                    fill
                    className="object-contain"
                    onError={() =>
                      console.error(`Failed to load image: ${styleImagePath}`)
                    }
                  />
                </div>
                <span>{style.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-md font-medium mb-2">Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {COLORS.map((color) => {
            const colorForPath = color.id === "pearl" ? "pear" : color.id;
            const colorImagePath = `/customization/bracelet/bracelet-${fullStyle}/${colorForPath}.png`;
            return (
              <button
                key={color.id}
                className={`py-2 px-3 rounded-md border-2 transition-all flex flex-col items-center
                  ${
                    selectedColor === color.id
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                onClick={() => handleSelect(fullStyle, color.id)}
              >
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    src={colorImagePath}
                    alt={color.name}
                    fill
                    className="object-contain"
                    onError={() =>
                      console.error(`Failed to load image: ${colorImagePath}`)
                    }
                  />
                </div>
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StringSelector;
