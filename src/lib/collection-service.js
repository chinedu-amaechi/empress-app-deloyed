import backendUrl from "./backend-url";

// Function to get all products across all collections
export async function getAllCollections() {
  try {
    // In the future, this would be an API call
    const response = await fetch(`${backendUrl}/api/admin/collections`);
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

    // console.log("All collections:", result.data);
    

    return result.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}
