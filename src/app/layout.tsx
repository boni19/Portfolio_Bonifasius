import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boni Intelligence Lab (BIL) | AI Engineer & Systems Specialist",
  description: "Official portfolio of Boni Intelligence Lab (BIL). Expert in AI Systems, Bayes Theorem Expert Systems, and high-performance Web Applications. Explore the future of intelligent technology.",
  keywords: ["Boni Intelligence Lab", "BIL Lab", "AI Engineer", "Sistem Pakar", "Teorema Bayes", "Next.js AI", "Data Analytics", "Bonifasius Daely", "Boni", "Bonifasius"],
  authors: [{ name: "Bonifasius Daely" }],
  openGraph: {
    title: "Boni Intelligence Lab (BIL) | AI Engineering Portfolio",
    description: "Pioneering intelligent systems with precision. Explore the official laboratory of AI and Information Systems.",
    url: "https://boni-lab.vercel.app", // Placeholder for actual deployment
    siteName: "BIL Lab",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

