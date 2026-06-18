import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blushloom Studio - Handcrafted Gifts & Accessories",
  description: "Discover unique handcrafted gifts, beautiful bouquets, custom keychains, and elegant hair accessories. Perfect for every occasion.",
  keywords: ["handcrafted gifts", "bouquets", "keychains", "hair accessories", "custom gifts", "Blushloom Studio"],
  authors: [{ name: "Blushloom Studio" }],
  openGraph: {
    title: "Blushloom Studio - Handcrafted Gifts & Accessories",
    description: "Discover unique handcrafted gifts, beautiful bouquets, custom keychains, and elegant hair accessories.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blushloom Studio - Handcrafted Gifts & Accessories",
    description: "Discover unique handcrafted gifts, beautiful bouquets, custom keychains, and elegant hair accessories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased bg-ivory-50`}>
        {children}
      </body>
    </html>
  );
}

// Made with Bob
