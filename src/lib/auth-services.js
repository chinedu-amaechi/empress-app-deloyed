import backendUrl from "./backend-url";

export async function postSignUp(data) {
  try {
    const response = await fetch(`${backendUrl}/api/auth/create/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
}

export async function postSignIn(data) {
  try {
    const response = await fetch(`${backendUrl}/api/auth/login/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
}

export async function checkAuth(token) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendUrl}/api/auth/check/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during auth check:", error);
  }
}

export async function postForgotPassword(data) {
  try {
    const response = await fetch(`${backendUrl}/api/auth/forgot/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}

export async function postResetPassword(data) {
  try {
    const response = await fetch(`${backendUrl}/api/auth/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}