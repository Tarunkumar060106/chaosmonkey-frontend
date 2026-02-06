"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCallback from "@/components/AuthCallback";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("access_token");

    if (token) {
      // Store GitHub token (MVP-safe)
      localStorage.setItem("github_token", token);
    }
  }, [searchParams]);

  return (
    <AuthCallback
      onComplete={() => {
        router.push("/dashboard");
      }}
    />
  );
}
