import type { Metadata } from "next";
import { Marcellus, Caveat } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Tarun Koshti",
  description: "Tarun Koshti Portfolio",
};

import { ThemeToggle } from "@/components/ui/theme-toggle";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/sections/Header";
import ResumeButton from "@/components/ResumeButton";
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${marcellus.className} ${marcellus.variable} ${caveat.variable} antialiased`}
      >
        <Loader />
        <ThemeToggle />
        <Header />
        <SmoothScroll />
        <ResumeButton />
        {children}
      </body>
    </html>
  );
}
