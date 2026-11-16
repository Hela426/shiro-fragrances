import type { Metadata } from "next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CartHydration from "./components/cart-hydration";
import SkipLink from "./components/skip-link";

import "./globals.css";

export const metadata: Metadata = {
  title: "SHIRO — The Art of Fragrance",

  description:
    "Discover SHIRO, a Japanese-inspired concept fragrance store. Six fragrances shaped by nature, stillness and quiet elegance.",

  applicationName: "SHIRO Fragrances",

  keywords: [
    "SHIRO",
    "Fragrances",
    "Perfume",
    "Japanese aesthetics",
    "Ecommerce",
    "Next.js",
    "Luxury fragrance",
    "Frontend portfolio",
  ],

  authors: [
    {
      name: "Karen Baron",
      url: "https://karenbaron-portfolio.netlify.app/",
    },
  ],

  creator: "Karen Baron",

  category: "Ecommerce",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "SHIRO Fragrances",
    title: "SHIRO — The Art of Fragrance",
    description:
      "Six fragrances. Six interpretations of nature. Discover the essence of simplicity.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "SHIRO — The Art of Fragrance",
    description:
      "A Japanese-inspired fragrance store and frontend development project.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartHydration />
        <SkipLink />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
