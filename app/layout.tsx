import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$BABYBOO — Public Health Advisory",
  description: "Baby Boo Syndrome awareness and research funding on Solana",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// redeploy
