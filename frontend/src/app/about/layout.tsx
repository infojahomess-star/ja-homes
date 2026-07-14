import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about JA Homes — a premier luxury sustainable real estate firm in Odisha, India, driven by biophilic design, ecological living, and architectural excellence. Meet our expert team.",
  openGraph: {
    title: "About JA Homes | Luxury Sustainable Real Estate in Odisha",
    description: "Discover our vision, expert team, and philosophy behind India's most sustainable luxury residences.",
    url: "https://jahomes.in/about",
  },
  keywords: ["JA Homes team", "about JA Homes", "luxury real estate Odisha", "sustainable architecture India", "biophilic design firm"],
  alternates: {
    canonical: "https://jahomes.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
