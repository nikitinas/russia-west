import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roots of the Conflict: Russia and the West",
  description: "A first-principles analysis of the origins and solutions of the Russia–West conflict.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
