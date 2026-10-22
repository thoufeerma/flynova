import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = localFont({
  src: [
    {
      path: "../../public/fonts/PlayfairDisplay.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlayfairDisplay-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynovareisen.com"),
  title: "Flynova Reisen LLP | Luxury Travel & Temple Tours Across India",
  description:
    "Flynova Reisen LLP – Thoughtfully planned journeys across India. Experience Kerala backwaters, Munnar hills, Goa coast, sacred South India temple tours, Kashmir, and Rajasthan with bespoke itineraries.",
  keywords: [
    "Flynova Reisen",
    "Kerala travel agency",
    "Temple tours",
    "South India pilgrimage",
    "Alleppey houseboat",
    "Munnar tour",
    "Kashmir holiday packages",
    "Goa packages",
    "Ernakulam travel company",
    "Flynova Reisen LLP",
  ],
  authors: [{ name: "Flynova Reisen LLP" }],
  openGraph: {
    title: "Flynova Reisen LLP – Your Journey, Our Passion",
    description:
      "Thoughtfully planned journeys across India — from Kerala's backwaters to the mountains of the north.",
    url: "https://flynovareisen.com",
    siteName: "Flynova Reisen LLP",
    images: [
      {
        url: "/images/alleppey-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Flynova Reisen Luxury Travel Experience",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/logo%20fav%20icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/logo%20fav%20icon.png",
    apple: "/images/logo%20fav%20icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo%20fav%20icon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo%20fav%20icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo%20fav%20icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        {/* Instant Hero Image Preloads to eliminate black screens */}
        <link rel="preload" as="image" href="/images/hero-india.jpg" />
        <link rel="preload" as="image" href="/images/hero-kerala.jpg" />
        <link rel="preload" as="image" href="/images/hero-kashmir.jpg" />
        <link rel="preload" as="image" href="/images/hero-lakshadweep.jpg" />
        <link rel="preload" as="image" href="/images/hero-goa.jpg" />
      </head>
      <body
        className={`${playfair.variable} ${satoshi.variable} ${manrope.variable} font-sans antialiased bg-dark-deep text-white min-h-screen selection:bg-gold-base selection:text-black`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
