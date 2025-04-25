import backendUrl from "./backend-url";

export async function updatePassword(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendUrl}/api/customer/update/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}

export async function updateProfile(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendUrl}/api/customer/update/details`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}
