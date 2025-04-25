"use client";
import React, { useState, useMemo } from "react";
import BraceletPreview from "./bracelet-preview";
import ComponentSelector from "./component-selector";
import { CHARM_TYPES } from "./constants";

const HALF_BRACELET_OPTIONS = [
  {
    id: "none",
    name: "None",
    image: "/customization/half-bracelets/none.png",
    price: 0,
  },
  {
    id: "pearls",
    name: "Pearls",
    image: "/customization/half-bracelets/pearls.png",
    price: 50,
  },
  {
    id: "amethyst",
    name: "Amethyst",
    image: "/customization/half-bracelets/amethyst.png",
    price: 66,
  },
  {
    id: "beads",
    name: "Beads",
    image: "/customization/half-bracelets/beads.png",
    price: 21,
  },
  {
    id: "knotted",
    name: "Knotted",
    image: "/customization/half-bracelets/knotted.png",
    price: 5,
  },
  {
    id: "chain",
    name: "Chain",
    image: "/customization/half-bracelets/chain.png",
    price: 10,
  },
];

const TASSEL_OPTIONS = [
  {
    id: "heart",
    name: "Heart Tassel",
    image: "/customization/tassel/heart.png",
  },
  {
    id: "locket",
    name: "Locket Tassel",
    image: "/customization/tassel/locket.png",
  },
  {
    id: "pearl",
    name: "Pearl Tassel",
    image: "/customization/tassel/pearl.png",
  },
  {
    id: "plain",
    name: "Plain Tassel",
    image: "/customization/tassel/plain.png",
  },
];

export default function BraceletDesigner() {
  const [step, setStep] = useState(1);
  const stepNames = {
    1: "String & Clasp",
    2: "Charms",
    3: "Half Bracelet",
    4: "Select Tassel",
    5: "Review",
  };

  const [stringType, setStringType] = useState("blue-with-clasp");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [claspType, setClaspType] = useState("default");
  const [chainLength, setChainLength] = useState(3);
  const [endCharm, setEndCharm] = useState("heart");
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [placedCharms, setPlacedCharms] = useState(
    Array(14)
      .fill(null)
      .map(() => ({ type: null, variant: null }))
  );
  const [selectedHalfBracelet, setSelectedHalfBracelet] = useState(null);
  const [charmVariants, setCharmVariants] = useState({ circle: "circle1" });
  const [selectedFiller, setSelectedFiller] = useState("filler1");
  const [selectedTassel, setSelectedTassel] = useState(null);

  // Calculate total price
  const totalPrice = useMemo(() => {
    let price = 60; // Base price

    // Add half-bracelet price
    if (selectedHalfBracelet) {
      const halfBracelet = HALF_BRACELET_OPTIONS.find(
        (option) => option.id === selectedHalfBracelet
      );
      if (halfBracelet) {
        price += halfBracelet.price;
      }
    }

    // Add placed charms prices
    placedCharms.forEach((charm) => {
      if (charm.type && charm.variant) {
        const charmType = CHARM_TYPES.find((c) => c.type === charm.type);
        if (charmType) {
          const variant = charmType.variants.find(
            (v) => v.id === charm.variant
          );
          if (variant) {
            price += variant.price;
          }
        }
      }
    });

    return price;
  }, [selectedHalfBracelet, placedCharms]);

  const handleStringSelect = (stringId) => {
    setStringType(stringId);
    setSelectedColor(stringId.split("-")[0]);
    if (stringId.endsWith("no-clasp")) setClaspType(null);
  };

  const handleVariantSelect = (charmType, variant) => {
    setCharmVariants((prev) => ({
      ...prev,
      [charmType]: variant,
    }));
  };

  const handlePositionSelect = (position) => {
    if (!selectedCharm) return;
    if (selectedHalfBracelet && position >= 7) return;
    setPlacedCharms((prev) => {
      const newPlacedCharms = [...prev];
      newPlacedCharms[position] = {
        type: selectedCharm,
        variant: charmVariants[selectedCharm] || null,
      };
      return newPlacedCharms;
    });
  };

  const toggleHalfBracelet = (type) => {
    if (type === "none") {
      setSelectedHalfBracelet(null);
    } else if (selectedHalfBracelet === type) {
      setSelectedHalfBracelet(null);
    } else {
      setSelectedHalfBracelet(type);
      setPlacedCharms((prev) => {
        const newPlacedCharms = [...prev];
        for (let i = 7; i < newPlacedCharms.length; i++) {
          newPlacedCharms[i] = { type: null, variant: null };
        }
        return newPlacedCharms;
      });
    }
  };

  const removeCharm = (position) => {
    setPlacedCharms((prev) => {
      const newPlacedCharms = [...prev];
      newPlacedCharms[position] = { type: null, variant: null };
      return newPlacedCharms;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <div className="flex-1 flex flex-col md:flex-row p-8">
        <div className="md:w-1/2 flex items-center justify-center">
          <BraceletPreview
            stringType={stringType}
            claspType={claspType}
            chainLength={chainLength}
            endCharm={endCharm}
            placedCharms={placedCharms}
            selectedCharm={selectedCharm}
            onPositionSelect={handlePositionSelect}
            selectedHalfBracelet={selectedHalfBracelet}
            charmVariants={charmVariants}
            onRemoveCharm={removeCharm}
            halfBraceletOptions={HALF_BRACELET_OPTIONS}
            step={step}
            selectedTassel={selectedTassel}
          />
        </div>
        <div className="md:w-1/2 p-8 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-5xl font-serif mb-2">Customize</h2>
            <h2 className="text-xl font-serif mb-2">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>
          </div>
          <p className="text-lg mb-6">
            Step {step}:{" "}
            {step === 1
              ? "Choose your string and clasp"
              : step === 2
              ? "Add charms"
              : step === 3
              ? "Select half bracelet"
              : step === 4
              ? "Select tassel"
              : "Confirm & Checkout"}
          </p>
          <ComponentSelector
            step={step}
            setStep={setStep}
            stringType={stringType}
            setStringType={handleStringSelect}
            claspType={claspType}
            setClaspType={setClaspType}
            chainLength={chainLength}
            setChainLength={setChainLength}
            endCharm={endCharm}
            setEndCharm={setEndCharm}
            selectedCharm={selectedCharm}
            setSelectedCharm={setSelectedCharm}
            halfBraceletOptions={HALF_BRACELET_OPTIONS}
            selectedHalfBracelet={selectedHalfBracelet}
            toggleHalfBracelet={toggleHalfBracelet}
            charmVariants={charmVariants}
            setCharmVariants={setCharmVariants}
            handleVariantSelect={handleVariantSelect}
            selectedTassel={selectedTassel}
            setSelectedTassel={setSelectedTassel}
            tasselOptions={TASSEL_OPTIONS}
            placedCharms={placedCharms}
            selectedColor={selectedColor}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4 p-4">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <button
            key={stepNumber}
            className={`text-sm ${
              step === stepNumber ? "font-bold underline" : ""
            }`}
            onClick={() => {
              setStep(stepNumber);
              setSelectedCharm(null);
            }}
          >
            Step {stepNumber}: {stepNames[stepNumber]}
          </button>
        ))}
      </div>
    </div>
  );
}
