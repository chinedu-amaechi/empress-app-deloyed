import backendUrl from "./backend-url";

// Function to get all products across all collections
export async function getCartProducts() {
  try {
    const token = localStorage.getItem("token");
    // In the future, this would be an API call
    const response = await fetch(`${backendUrl}/api/customer/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function addToCart(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendUrl}/api/customer/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: data._id,
        quantity: data.quantity,
      }),
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

export async function updateCart(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${backendUrl}/api/customer/cart/${data.productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          quantity: data.quantity,
          operation: data.operation || "add",
        }),
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}

export async function removeFromCart(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${backendUrl}/api/customer/cart/${data.productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}
