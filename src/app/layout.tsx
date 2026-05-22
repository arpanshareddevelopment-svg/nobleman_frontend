import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppFloating from "../components/WhatsAppFloating";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noblemanlearning.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NobleMan Learning | Live Career-Focused Programs",
    template: "%s | NobleMan Learning",
  },
  description:
    "Live, hands-on programs built to help you gain practical skills, build real projects, and accelerate your career outcomes.",
  applicationName: "NobleMan Learning",
  keywords: [
    "NobleMan Learning",
    "live courses",
    "career transformation",
    "placement support",
    "data and AI programs",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "NobleMan Learning | Live Career-Focused Programs",
    description:
      "Build practical skills with live programs, mentorship, placement support, and industry-ready projects.",
    siteName: "NobleMan Learning",
    images: [
      {
        url: "/branding/logo_dark.png",
        width: 1200,
        height: 630,
        alt: "NobleMan Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NobleMan Learning | Live Career-Focused Programs",
    description:
      "Live, practical learning with mentorship and placement support for career growth.",
    images: ["/branding/brand_dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/branding/logo_dark.png",
    shortcut: "/branding/logo_dark.png",
    apple: "/branding/logo_light.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04101d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppFloating />
      </body>
    </html>
  );
}

  // Include floating WhatsApp button globally
  export function RootExtras() {
    return <WhatsAppFloating />;
  }
