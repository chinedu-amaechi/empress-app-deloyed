// src/lib/product-service.js

import backendUrl from "./backend-url";

/**
 * This service handles all product-related data fetching.
 * Currently uses static JSON data but can be replaced with API calls later.
 */

// Function to get all products across all collections
export async function getAllProducts() {
  try {
    // In the future, this would be an API call
    const response = await fetch(`${backendUrl}/api/customer/products`);
    const result = await response.json();

    // Flatten the collection structure into a single array of products
    // let allProducts = [];

    // Object.entries(data).forEach(([collectionKey, products]) => {
    //   const collectionName = collectionKey.replace(/_/g, " ");

    //   // Add collection info to each product and add to the array
    //   const productsWithCollection = products.map((product) => ({
    //     ...product,
    //     collectionId: collectionKey.toLowerCase(),
    //     collectionName,
    //   }));

    //   allProducts = [...allProducts, ...productsWithCollection];
    // });

    return result.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

// Function to get products by collection
export async function getProductsByCollection(collectionId) {
  try {
    // In the future, this would be an API call with the collectionId parameter
    const response = await fetch("/data/products.json");
    const data = await response.json();

    // Convert the collection ID to match the format in the JSON file
    // e.g., "divine" becomes "Divine_Collection"
    const normalizedId = collectionId.toLowerCase();

    // Find the matching collection
    const collectionKey = Object.keys(data).find((key) =>
      key.toLowerCase().includes(normalizedId)
    );

    if (!collectionKey) {
      return [];
    }

    // Add collection info to each product
    const products = data[collectionKey].map((product) => ({
      ...product,
      collectionId: normalizedId,
      collectionName: collectionKey.replace(/_/g, " "),
    }));

    return products;
  } catch (error) {
    console.error(
      `Error fetching products for collection ${collectionId}:`,
      error
    );
    return [];
  }
}

// Function to get a single product by ID
export async function getProductById(collectionId, productId) {
  try {
    // In the future, this would be an API call with both parameters
    const response = await fetch("/data/products.json");
    const data = await response.json();

    // Convert the collection ID to match the format in the JSON file
    const normalizedCollectionId = collectionId.toLowerCase();

    // Find the matching collection
    const collectionKey = Object.keys(data).find((key) =>
      key.toLowerCase().includes(normalizedCollectionId)
    );

    if (!collectionKey) {
      return null;
    }

    // Find the product in the collection
    const product = data[collectionKey].find((p) => p.id === productId);

    if (!product) {
      return null;
    }

    // Add collection info to the product
    return {
      ...product,
      collectionId: normalizedCollectionId,
      collectionName: collectionKey.replace(/_/g, " "),
    };
  } catch (error) {
    console.error(
      `Error fetching product ${productId} from collection ${collectionId}:`,
      error
    );
    return null;
  }
}

// Function to search products by query
export async function searchProducts(query) {
  try {
    // Get all products
    const allProducts = await getAllProducts();

    // If no query, return all products
    if (!query || query.trim() === "") {
      return allProducts;
    }

    // Convert query to lowercase for case-insensitive matching
    const normalizedQuery = query.toLowerCase();

    // Filter products by name, description, materials, or meaning
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        (product.description &&
          product.description.toLowerCase().includes(normalizedQuery)) ||
        (product.materials &&
          product.materials.some((material) =>
            material.toLowerCase().includes(normalizedQuery)
          )) ||
        (product.meaning &&
          product.meaning.toLowerCase().includes(normalizedQuery))
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Function to get product images with proper paths
export function getProductImages(product) {
  if (!product || !product.image) {
    // Return a default image if product image is missing
    return ["/products/default-product.jpg"];
  }

  // If it's a single image, convert to array
  const imagePath =
    typeof product.image === "string"
      ? [product.image]
      : product.images || [product.image];

  // Return the array of image paths
  return imagePath;
}

// Function to get featured products
export async function getFeaturedProducts(limit = 4) {
  const allProducts = await getAllProducts();
  // Shuffle array and get the first 'limit' products
  return allProducts.sort(() => 0.5 - Math.random()).slice(0, limit);
}

// Function to get related products from the same collection
export async function getRelatedProducts(collectionId, productId, limit = 4) {
  const collectionProducts = await getProductsByCollection(collectionId);
  // Filter out the current product and limit the results
  return collectionProducts
    .filter((product) => product.id !== productId)
    .slice(0, limit);
}

// Add more functions as needed for future requirements
