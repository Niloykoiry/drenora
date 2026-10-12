import type { Metadata, Viewport } from "next";
import {
  Marcellus,
  Roboto,
  Sofia_Sans,
  Sofia_Sans_Condensed,
} from "next/font/google";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
});

const sofiaCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-sofia-condensed",
  display: "swap",
});

// Stand-in for the unlicensed "quichesans" display face — see globals.css.
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-family",
  display: "swap",
});

// On Vercel this is the project's production domain (the custom domain once one
// is attached, *.vercel.app before that), so link-preview images resolve.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://enoranilomi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Facial Plastic Surgeon in Bangladesh, Dhaka | Dr Enora Nilomi",
  description:
    "Renowned Facial Plastic Surgeon with an exclusive international practice in London, Dubai, Kuwait, and Cairo. Deep plane facelift, neck lift, blepharoplasty, rhinoplasty and more.",
  openGraph: {
    type: "website",
    siteName: "Dr. Enora Nilomi",
    title: "Facial Plastic Surgeon in Bangladesh, Dhaka | Dr Enora Nilomi",
    description:
      "Trusted with thousands of faces. Consultations in Dhaka, virtually for international patients.",
    images: ["/media/video/hero-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sofia.variable} ${sofiaCondensed.variable} ${marcellus.variable} ${roboto.variable}`}
    >
      <body className="bg-ink font-sans text-snow antialiased">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
        </SmoothScroll>
      </body>
    </html>
  );
}
