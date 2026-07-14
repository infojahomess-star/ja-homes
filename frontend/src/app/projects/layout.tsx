import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Explore JA Homes' portfolio of luxury sustainable real estate projects across India. View completed residences, ongoing construction, and upcoming sanctuaries starting from ₹1.20 Cr.",
  openGraph: {
    title: "Luxury Real Estate Projects | JA Homes",
    description: "Browse premium residential projects including Om Sai Ashraya in Phulnakhara, Odisha. Schedule private tours and co-design your bespoke estate.",
    url: "https://jahomes.in/projects",
  },
  keywords: ["JA Homes projects", "Om Sai Ashraya", "Phulnakhara real estate", "luxury residential Odisha", "sustainable homes India", "premium villa"],
  alternates: {
    canonical: "https://jahomes.in/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
