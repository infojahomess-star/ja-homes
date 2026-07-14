import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the JA Homes concierge team. Enquire about luxury real estate in Odisha, schedule a consultation, or connect via WhatsApp for immediate assistance.",
  openGraph: {
    title: "Contact JA Homes | Luxury Real Estate Concierge",
    description: "Reach our concierge team to enquire about properties, schedule tours, or begin your bespoke home journey.",
    url: "https://jahomes.in/contact",
  },
  keywords: ["contact JA Homes", "real estate enquiry Odisha", "luxury home consultation", "JA Homes phone number", "real estate agent Phulnakhara"],
  alternates: {
    canonical: "https://jahomes.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
