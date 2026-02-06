"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCallback from "@/components/AuthCallback";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("access_token");
    const error = searchParams.get("error");

    if (error) {
      console.error("Auth error:", error);
      setStatus("error");
      setTimeout(() => router.push("/"), 3000);
      return;
    }

    if (token) {
      // Store GitHub token (MVP-safe)
      localStorage.setItem("github_token", token);
      setStatus("success");
      // Give the animation time to complete before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
      // No token and no error - might be loading or invalid state
      setStatus("error");
      setTimeout(() => router.push("/"), 3000);
    }
  }, [searchParams, router]);

  return (
    <AuthCallback
      onComplete={() => {
        router.push("/dashboard");
      }}
      status={status}
    />
  );
}
