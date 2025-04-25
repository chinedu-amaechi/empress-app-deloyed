"use client";

import { useCartContext } from "../contexts/cart-context";
import CartItem from "./cart-item";
import Footer from "@/components/layout/footer";
import { removeFromCart, updateCart } from "@/lib/cart-services";
import { Trash2, CreditCard, Lock, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useAuthContext } from "../contexts/auth-context";
import backendUrl from "@/lib/backend-url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CartPage() {
  const { cart, setCart } = useCartContext();
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  // Calculate the subtotal based on cart items (business logic remains unchanged)
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Apply a standard shipping fee when applicable
  const shipping = subtotal > 0 ? 10 : 0;
  // Use Calgary's GST of 5%
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  // Compute the grand total amount
  const total = subtotal + shipping + tax;

  // Handler for incrementing item quantity
  async function handleIncrement(product) {
    if (user) {
      const productInCart = user.cart.find(
        (item) => item.productId === product._id
      );
      if (productInCart) {
        const response = await updateCart({
          productId: productInCart.productId,
          quantity: 1,
          operation: "add",
        });

        console.log("Updated cart:", response);
      }
    }

    setCart((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);
      console.log("Existing product:", existingProduct);

      let updatedCart;
      if (existingProduct) {
        updatedCart = prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }

      updatedCart = [...prev, { ...product, quantity: quantity }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  // Handler for decrementing item quantity
  async function handleDecrement(product) {
    if (user) {
      const productInCart = user.cart.find(
        (item) => item.productId === product._id
      );

      if (productInCart && productInCart.quantity > 1) {
        const response = await updateCart({
          productId: productInCart.productId,
          quantity: 1,
          operation: "subtract", // Assuming backend handles decrement
        });

        console.log("Updated cart:", response);
      }
    }

    setCart((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);

      if (!existingProduct) return prev;

      let updatedCart;
      if (existingProduct.quantity > 1) {
        updatedCart = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCart = prev.filter((item) => item._id !== product._id);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  // Handler for removing item from cart
  async function handleRemove(productId) {
    if (user) {
      const productInCart = user.cart.find(
        (item) => item.productId === productId
      );

      console.log("Product in cart:", productInCart);

      if (productInCart) {
        const response = await removeFromCart(productInCart);
        console.log("Removed from cart:", response);
      }
    }

    toast.success("Item removed from cart");

    setCart((prev) => {
      const updatedCart = prev.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  // Handler for making payment (placeholder function)
  async function makePayment(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to proceed with payment.");
      router.push("/auth/sign-in");
    }

    try {
      const response = await fetch(`${backendUrl}/api/customer/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          cart,
          total,
          shipping,
          tax,
        }),
      });

      const result = await response.json();
      console.log("Payment response:", result);
      if (result.status === 200) {
        window.location.href = result.data.url;
      } else {
        console.error("Payment failed:", result.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] selection:bg-[#11296B]/20">
      <main className="flex-grow container mx-auto px-4 py-16 pt-32 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Cart Items Section - Left Column */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-6 mb-8 pt-8">
              <h1 className="text-4xl font-light tracking-tight text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 bg-gray-50 px-4 py-2">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 bg-white shadow-soft">
                <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-light text-gray-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Explore our collections and add some elegance to your cart
                </p>
                <a
                  href="/products"
                  className="inline-block px-8 py-3 bg-[#11296B] text-white font-medium hover:bg-[#1E96FC] transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-0">
                {cart.map((product, index) => (
                  <div
                    key={product._id}
                    className={`bg-white shadow-soft p-6 flex items-center justify-between hover:shadow-md transition-shadow border-b border-gray-200 mb-2 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gray-100 overflow-hidden relative flex-shrink-0 border border-gray-200">
                        <Image
                          src={
                            product.imagesUrl[0].optimizeUrl ||
                            "/placeholder-product.jpg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.color && (
                          <p className="text-xs text-gray-500 mt-1">
                            Color: {product.color}
                          </p>
                        )}
                        {product.size && (
                          <p className="text-xs text-gray-500">
                            Size: {product.size}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-6">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 mb-1">
                          Quantity
                        </span>
                        <div className="flex items-center space-x-2 border border-gray-200 px-1">
                          <button
                            className={`w-8 h-8 flex items-center justify-center text-gray-700 ${
                              product.quantity <= 1
                                ? "bg-gray-100 cursor-not-allowed opacity-50"
                                : "bg-gray-100 hover:bg-gray-200 hover:text-[#11296B]"
                            }`}
                            onClick={() => handleDecrement(product)}
                            disabled={product.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-medium w-6 text-center">
                            {product.quantity}
                          </span>
                          <button
                            className="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:text-[#11296B]"
                            onClick={() => handleIncrement(product)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-gray-900 border-l border-gray-200 pl-6">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 border border-transparent hover:border-gray-200"
                        onClick={() => handleRemove(product._id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section - Right Column */}
          <div className="md:col-span-1 md:w-[120%]">
            <div className="bg-white shadow-soft p-8 sticky top-24">
              <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-6 pt-8 border-b-2 border-gray-300 pb-6">
                Order Summary
              </h2>

              <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 5%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#11296B]">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#11296B] text-white py-4 hover:bg-[#1E96FC] transition-colors flex items-center justify-center space-x-2"
                  onClick={makePayment}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Secure Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
