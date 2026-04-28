"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCallback from "@/components/AuthCallback";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

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
      localStorage.setItem("github_token", token);
      setStatus("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
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

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
           style={{ background: "var(--ink-black)" }}>
        <div className="w-3 h-3 rounded-full loading-dot"
             style={{ background: "var(--ink-gold)" }} />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
