import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google"; // [NEW]
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ceylon Roots Holdings | Sri Lanka's Premier Property Platform",
  description:
    "Ceylon Roots Holdings — Your trusted partner in Sri Lankan real estate. Browse premium properties for sale and rent across Colombo, Galle, Kandy, Negombo and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
