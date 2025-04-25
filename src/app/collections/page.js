"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/product-card";
import CollectionNavigator from "./collection-navigator";
import Breadcrumb from "@/components/ui/breadcrumb";
import ScrollProgress from "./scroll-progress";
import Heading from "@/components/ui/heading";
import Footer from "@/components/layout/footer";
import CollectionNavigationHeader from "./collection-navigation-header";
import CollectionIntroduction from "./collection-introduction";
import CollectionFeaturedProduct from "./collection-featured-product";
import CollectionProduct from "./collection-products";
import { useQuery } from "@tanstack/react-query";
import useCollections from "@/hooks/use-collections";
import useProducts from "@/hooks/use-products";
import Navbar from "@/components/ui/navbar";

// Add these styles directly in the component
const checkerboardStyles = {
  checkerboardContainer: "relative w-full h-full overflow-hidden",
  imageWrapper: "absolute top-0 left-0 w-full h-full",
  checkerCell:
    "absolute overflow-hidden bg-transparent transition-all duration-600",
  cellContent: "absolute w-full h-full object-cover",
  cellHidden: "scale-0 opacity-0",
};

function Collections() {
  const searchParams = useSearchParams();
  const highlightCollection = searchParams.get("collection");
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Checkerboard transition state
  const [previousCollection, setPreviousCollection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cells, setCells] = useState([]);
  const gridSize = 8; // 8x8 grid for the checkerboard

  // References to collection sections
  const mainRef = useRef(null);
  const optionsRef = useRef(null);
  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useCollections();

  const {
    data: productsData,
    isLoading: productsIsLoading,
    error: productsError,
  } = useProducts();

  // Handle initial load and collection change
  useEffect(() => {
    setIsVisible(true);

    // Check initial scroll position immediately
    setIsScrolled(window.scrollY > 100);

    // Add scroll event listener for future scrolling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [highlightCollection]);

  // Setup collections and active collection with featured product
  useEffect(() => {
    async function setupCollections() {
      try {
        if (collectionsData && productsData) {
          // Set collections data
          setCollections(collectionsData);

          // Skip further processing if collections data is empty
          if (!collectionsData.length) {
            console.log("No collections data available");
            return;
          }

          let targetCollection = null;

          // Try to find the highlighted collection if specified
          if (highlightCollection) {
            targetCollection = collectionsData.find(
              (collection) => collection.name === highlightCollection
            );
          }

          // If no highlighted collection or it wasn't found, use the first one
          if (!targetCollection && collectionsData.length > 0) {
            targetCollection = collectionsData[0];
          }

          // Set the active collection
          if (targetCollection) {
            setActiveCollection(targetCollection);

            // Try to find and set a featured product only if collection has products array
            if (
              targetCollection.products &&
              targetCollection.products.length > 0
            ) {
              const featuredProductId = targetCollection.products[0];

              const featuredProduct = productsData.find(
                (product) => product._id === featuredProductId
              );

              if (featuredProduct) {
                // Use functional state update to avoid race conditions
                setActiveCollection((prevState) => ({
                  ...prevState,
                  featuredProduct: featuredProduct,
                }));
              }
            }
          }
        }
      } catch (error) {
        console.error("Error in collections page setup:", error);
      }
    }

    setupCollections();
  }, [collectionsData, highlightCollection, productsData]);

  // Handle checkerboard transition when collection changes
  useEffect(() => {
    if (previousCollection !== activeCollection && activeCollection) {
      // Setup the transition
      setIsTransitioning(true);
      setPreviousCollection(activeCollection);

      // Create the cells array for the checkerboard
      const newCells = [];
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          newCells.push({
            row,
            col,
            key: `${row}-${col}`,
            delay: Math.random() * 0.5, // Random delay for more organic effect
          });
        }
      }
      setCells(newCells);

      // After the transition completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Slightly longer than the transition time

      return () => clearTimeout(timer);
    }
  }, [activeCollection, previousCollection]);

  // Handle options horizontal scroll
  const handleOptionScroll = (direction) => {
    const container = optionsRef.current;
    if (!container) return;

    const scrollAmount = 100; // Adjust based on your design
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  // Handle collection change without scrolling to top
  const handleCollectionChange = (collectionName) => {
    if (!collectionName || !collections.length) return;

    // Find the collection with the given name
    const targetCollection = collections.find(
      (collection) => collection.name === collectionName
    );

    // Only proceed if we found a collection and it's different from current
    if (targetCollection && activeCollection?.name !== collectionName) {
      setActiveCollection(targetCollection);

      // Always scroll to top of the page when changing collections
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Update URL query parameter without full page reload
      const url = new URL(window.location);
      url.searchParams.set("collection", collectionName);
      window.history.pushState({}, "", url);
    }
  };

  // Early return for loading or error states
  if (collectionsIsLoading || productsIsLoading || !activeCollection) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#11296B]/20 border-t-[#11296B] rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600">Loading collections...</p>
        </div>
      </main>
    );
  }

  if (collectionsError || productsError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Error loading collections</p>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </main>
    );
  }

  // Get filtered products for this collection
  const collectionProducts = productsData.filter(
    (product) => product.collectionId === activeCollection._id
  );

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Collection Navigation */}
      <div className="fixed top-[95px] left-6 z-40">
        <CollectionNavigationHeader
          collectionsData={collections}
          activeCollection={activeCollection}
          isScrolled={isScrolled}
          onHandleCollectionChange={handleCollectionChange}
          className={
            isScrolled ? "bg-white shadow-md py-3 px-6 rounded-full" : ""
          }
        />
      </div>

      {/* Elegant Header with Dynamic Background and Checkerboard Transition */}
      <header className="relative h-[90vh] overflow-hidden">
        {activeCollection?.imageUrl?.optimizeUrl ? (
          <div className={checkerboardStyles.checkerboardContainer}>
            {!isTransitioning ? (
              // Regular image when not transitioning
              <div className={checkerboardStyles.imageWrapper}>
                <Image
                  src={activeCollection.imageUrl.optimizeUrl}
                  alt={activeCollection.name || "Collection image"}
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
              </div>
            ) : (
              // Checkerboard transition
              <>
                {/* Previous image underneath */}
                <div
                  className={checkerboardStyles.imageWrapper}
                  style={{ zIndex: 1 }}
                >
                  <Image
                    src={activeCollection.imageUrl.optimizeUrl}
                    alt={activeCollection.name || "Collection image"}
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                  />
                </div>

                {/* Checkerboard cells with new image */}
                {cells.map((cell) => {
                  const width = 100 / gridSize;
                  const height = 100 / gridSize;
                  const left = cell.col * width;
                  const top = cell.row * height;

                  return (
                    <div
                      key={cell.key}
                      className={`${checkerboardStyles.checkerCell} ${
                        isTransitioning ? "" : checkerboardStyles.cellHidden
                      }`}
                      style={{
                        width: `${width}%`,
                        height: `${height}%`,
                        left: `${left}%`,
                        top: `${top}%`,
                        transitionDelay: `${cell.delay}s`,
                        zIndex: 2,
                      }}
                    >
                      <div
                        className={checkerboardStyles.cellContent}
                        style={{
                          backgroundImage: `url(${activeCollection.imageUrl.optimizeUrl})`,
                          backgroundPosition: `${-left * gridSize}% ${
                            -top * gridSize
                          }%`,
                        }}
                      />
                    </div>
                  );
                })}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"
                  style={{ zIndex: 3 }}
                ></div>
              </>
            )}
          </div>
        ) : (
          // Fallback for missing image
          <div className="absolute inset-0 bg-gradient-to-b from-[#11296B] to-[#1E96FC]">
            <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          </div>
        )}

        {/* Elegant Header Content */}
        <motion.div
          key={`header-content-${activeCollection._id}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.8,
                delay: 0.4,
                staggerChildren: 0.2,
              },
            },
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-6"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <Heading
                level={1}
                className="text-5xl md:text-7xl mb-6 text-white font-light"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8 },
                    },
                  }}
                  className="font-semibold inline-block"
                >
                  {activeCollection.name || "Collection"}
                </motion.span>
              </Heading>

              {/* Decorative line */}
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "6rem", transition: { duration: 0.8 } },
                }}
                className="h-px bg-white/60 mx-auto my-6"
              ></motion.div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-12"
            >
              {activeCollection.description ||
                "Explore our collection of handcrafted jewelry."}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("products-section");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#11296B] px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Discover the Collection
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/80"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </header>

      {/* Collection Detail Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeCollection._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 px-6"
        >
          <div className="max-w-7xl mx-auto">
            {/* Collection Introduction */}
            <CollectionIntroduction collection={activeCollection} />

            {/* Featured Product Showcase */}
            <CollectionFeaturedProduct collection={activeCollection} />

            {/* Collection Products Grid Section */}
            <CollectionProduct
              products={collectionProducts}
              collection={activeCollection}
            />

            {/* Other Collections */}
            <section id="products-section">
              <div className="text-center mb-16">
                <Heading
                  level={2}
                  className="text-2xl md:text-3xl text-gray-900 font-light tracking-tight mb-4"
                >
                  Explore Other{" "}
                  <span className="font-semibold">Collections</span>
                </Heading>

                <div className="w-16 h-px bg-[#11296B]/30 mx-auto my-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections
                  .filter(
                    (collection) => collection._id !== activeCollection._id
                  )
                  .slice(0, 3)
                  .map((collection) => (
                    <div
                      key={collection._id}
                      className="relative h-80 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                      onClick={() => handleCollectionChange(collection.name)}
                    >
                      {collection.imageUrl?.optimizeUrl ? (
                        <Image
                          src={collection.imageUrl.optimizeUrl}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#11296B] to-[#1E96FC]"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="text-xl font-medium mb-2">
                          {collection.name}
                        </h4>
                        <p className="text-white/80 text-sm line-clamp-2 mb-4">
                          {collection.description || "Explore this collection"}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                          Explore Collection
                          <svg
                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Collection Navigator */}
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <CollectionNavigator
                  collections={collections}
                  currentCollection={activeCollection}
                  onNavigate={handleCollectionChange}
                />
              </div>
            </section>
          </div>
        </motion.section>
      </AnimatePresence>
      <Footer />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <Collections />
    </Suspense>
  );
}
