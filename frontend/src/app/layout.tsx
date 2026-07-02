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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <SocialSidebar />
            <ScrollToTop />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

