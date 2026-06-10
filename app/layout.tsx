import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Top Notch Creations & Mobile Homes | Cape Town",
  description:
    "Premium renovations, mobile homes, caravans, built-in cupboards, flooring, tiling, painting, electrical and plumbing services in Cape Town, South Africa.",
  keywords:
    "renovations Cape Town, mobile homes South Africa, built-in cupboards, kitchen renovation, caravan builders",
  openGraph: {
    title: "Top Notch Creations & Mobile Homes",
    description:
      "Your dream home, built to perfection. Cape Town's trusted renovation and mobile home specialists.",
    url: "https://topnotch.vercel.app",
    siteName: "Top Notch Creations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-brand-black text-white font-body antialiased">
        <LoadingScreen>{children}</LoadingScreen>
      </body>
    </html>
  );
}
