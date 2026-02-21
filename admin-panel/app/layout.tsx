import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Ceylon Roots Holdings Admin Panel",
  description: "Private dashboard for Ceylon Roots Holdings property management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
