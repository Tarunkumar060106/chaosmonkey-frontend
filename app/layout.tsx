import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChaosMonkey — Understand What You Built",
  description:
    "Paste any GitHub repo. Get a full architecture breakdown, security audit, and improvement roadmap in 30 seconds. Built for vibe coders.",
  keywords: [
    "code analysis",
    "architecture",
    "security audit",
    "vibe coding",
    "GitHub",
    "AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise`}
      >
        {children}
      </body>
    </html>
  );
}
