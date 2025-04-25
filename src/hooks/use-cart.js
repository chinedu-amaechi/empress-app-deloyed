import { getCartProducts } from "@/lib/cart-services";
import { useQuery } from "@tanstack/react-query";

function useCart() {
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryFn: getCartProducts,
    queryKey: ["cart"],
    refetchOnWindowFocus: true,
  });
  return { cartData, isLoading, error };
}

export default useCart;
