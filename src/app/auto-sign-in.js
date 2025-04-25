"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "./contexts/auth-context";
import { checkAuth } from "@/lib/auth-services";

function AutoSignIn({ children }) {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await checkAuth(token);
        console.log("Response:", response);
        if (response.status === 200) {
          setUser(response.data);
        }
      }
    }
    checkUser();
  }, []);
  return <>{children}</>;
}

export default AutoSignIn;
