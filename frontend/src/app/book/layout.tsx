import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Private Tour",
  description: "Schedule an exclusive private viewing of JA Homes properties. Book a tour of Om Sai Ashraya in Phulnakhara or co-design your custom luxury estate. Instant confirmation via email.",
  openGraph: {
    title: "Book a Private Tour | JA Homes Luxury Real Estate",
    description: "Reserve your exclusive property tour slot. Choose your preferred date, time, and estate to begin your luxury living journey.",
    url: "https://jahomes.in/book",
  },
  keywords: ["book property tour", "real estate viewing Odisha", "luxury home booking", "JA Homes appointment", "private estate tour India"],
  alternates: {
    canonical: "https://jahomes.in/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
