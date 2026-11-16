import type { Metadata } from "next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "SHIRO — The Art of Fragrance",
  description:
    "Discover a conceptual fragrance collection inspired by Japanese minimalism and nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
