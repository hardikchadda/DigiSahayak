import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DigiSahayak - Your Digital Companion for Government Schemes",
  description: "Aapka Digital Saathi for Every Sarkari Yojna - An initiative under Digital Empowerment Project",
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0B5ED7',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <SessionProvider>
          <div className="min-h-screen pb-16 md:pb-0 md:pt-16">
            {children}
          </div>
          <NavBar />
        </SessionProvider>
      </body>
    </html>
  );
}
