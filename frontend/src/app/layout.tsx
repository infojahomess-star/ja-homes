import type { Metadata } from "next";
import { Raleway, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import SocialSidebar from "../components/SocialSidebar";
import ScrollToTop from "../components/ScrollToTop";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JA Homes | Luxury Sustainable Real Estate",
  description: "Exquisite sustainable architectural design and modern sanctuaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <SocialSidebar />
            <ScrollToTop />
            
            {/* Floating WhatsApp Button */}
            <a
              href="https://wa.me/919811086206?text=Hi%2C%20I%27m%20interested%20in%20JA%20Homes."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
              <svg
                viewBox="0 0 32 32"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 relative z-10"
                aria-hidden="true"
              >
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.504L4 29l7.697-1.81A12.93 12.93 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917a10.9 10.9 0 0 1-5.57-1.527l-.399-.237-4.573 1.076 1.1-4.456-.261-.408A10.867 10.867 0 0 1 5.083 15C5.083 8.97 9.97 4.083 16 4.083S26.917 8.97 26.917 15 22.03 25.917 16 25.917zm5.98-8.134c-.328-.164-1.94-.956-2.24-1.065-.3-.11-.518-.164-.736.163-.219.328-.847 1.065-1.038 1.283-.19.219-.382.246-.71.082-.328-.164-1.383-.51-2.634-1.625-.974-.869-1.63-1.942-1.821-2.27-.19-.327-.02-.504.143-.667.147-.147.328-.383.491-.574.164-.191.219-.328.328-.547.11-.218.055-.41-.027-.574-.082-.163-.736-1.776-1.009-2.432-.266-.637-.536-.55-.736-.56-.19-.009-.41-.011-.628-.011-.218 0-.574.082-.874.41-.3.328-1.146 1.12-1.146 2.733 0 1.613 1.174 3.17 1.337 3.389.164.218 2.31 3.526 5.598 4.945.783.338 1.393.54 1.87.69.785.25 1.5.215 2.065.13.63-.093 1.94-.793 2.214-1.558.273-.765.273-1.42.191-1.558-.081-.137-.3-.218-.628-.382z" />
              </svg>
            </a>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

