import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NobleMan Learning",
  description: "Live, hands-on programs designed to help you build real projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
