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
  title: "Greenlit — Find vulnerabilities before hackers do",
  description:
    "Greenlit scans your GitHub repo, probes your live app for real exploits, and generates one-click fixes. The always-on security layer for AI-built apps.",
  keywords: [
    "vibe coding security",
    "AI app security audit",
    "Lovable security scanner",
    "Bolt security",
    "v0 app audit",
    "Cursor security",
    "DAST vibe coding",
    "auto-fix vulnerabilities",
    "GitHub repo security",
  ],
  openGraph: {
    title: "Greenlit — Find vulnerabilities before hackers do",
    description: "Scans your code. Probes your live app. Proves the exploit. Fixes it in one click.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
