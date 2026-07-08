"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../app/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="mt-auto bg-foreground/3 pt-16 pb-8 px-6 relative z-30 w-full border-t border-border-color">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center md:items-start text-center md:text-left pb-10 border-b border-border-color">
          
          {/* Column 1: Social Media Links */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">Connect With Us</span>
            <div className="flex gap-3">
              <a href="https://facebook.com/jahomes" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com/jahomes_re" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://wa.me/919811086206?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M16.5 16c-.16.14-.35.25-.57.29-.2.03-.43.02-.68-.03-.26-.06-.57-.16-.94-.32a9.12 9.12 0 0 1-2.48-1.72 9.4 9.4 0 0 1-1.74-2.52c-.15-.29-.25-.54-.3-.76-.05-.23-.05-.44-.01-.63.04-.2.13-.37.26-.5.06-.06.12-.13.2-.21.07-.08.14-.15.21-.21.16-.14.33-.21.48-.19.16.02.29.13.39.31l.6 1.09c.09.16.15.28.18.37.03.1.02.2-.04.3-.06.11-.13.23-.22.36-.08.11-.15.2-.18.25-.03.05-.03.11-.01.18.06.2.22.46.46.77.25.3.52.56.81.77.16.11.3.19.41.22.1.04.2.03.3-.02.1-.05.21-.14.33-.26.11-.12.2-.23.27-.33.07-.1.17-.13.3-.1.14.04.4.15.77.34l1.1.58c.11.06.19.12.24.18.05.06.07.15.06.26-.01.1-.06.24-.15.42z" />
                </svg>
              </a>
              <a href="tel:+919811086206" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Call">
                <Phone size={16} strokeWidth={1.5} />
              </a>
              <a href="mailto:info.jahomess@gmail.com" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Message">
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Logo Branding */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/" className="flex items-center transition-all duration-300">
              <Image
                src="https://res.cloudinary.com/pctbshnp/image/upload/v1783009909/logo_darkk_rkhfqc.png"
                alt="JA Homes Logo"
                width={150}
                height={36}
                className="h-10 w-auto object-contain transition-all duration-300"
                style={{
                  filter: theme === "dark" ? "invert(1) brightness(1.2)" : "none",
                }}
              />
            </Link>
            
            <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider text-muted/80 mt-1">
              <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
              <Link href="/projects" className="hover:text-amber-500 transition-colors">Projects</Link>
              <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
              <Link href="/book" className="hover:text-amber-500 transition-colors">Booking</Link>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right text-xs text-muted">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">Contact</span>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <a
                  href="https://share.google/F6gxsXy9KhpTmDwh5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-amber-500 leading-normal max-w-xs text-right transition-colors duration-300"
                >
                  Amanpada, Near DPS Kalinga, Phulnakhara
                </a>
                <MapPin size={13} className="text-amber-500 shrink-0" />
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-end">
                <div className="flex flex-col items-center md:items-end">
                  <a href="https://wa.me/919811086206?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors text-foreground">
                    +91 98110 86206
                  </a>
                  <span className="text-[9px] text-muted uppercase tracking-wider">Arjun Karthik Bera</span>
                </div>
                <Phone size={13} className="text-amber-500 shrink-0" />
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-end">
                <div className="flex flex-col items-center md:items-end">
                  <a href="https://wa.me/919348402331?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors text-foreground">
                    +91 93484 02331
                  </a>
                  <span className="text-[9px] text-muted uppercase tracking-wider">Harendra Kumar Omvik</span>
                </div>
                <Phone size={13} className="text-amber-500 shrink-0" />
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-end">
                <a href="mailto:info.jahomess@gmail.com" className="hover:text-amber-500 transition-colors text-foreground">
                  info.jahomess@gmail.com
                </a>
                <Mail size={13} className="text-amber-500 shrink-0" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Compliance */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono text-muted/50 text-center md:text-left">
          <div className="max-w-2xl leading-relaxed">
            &copy; 2026 JA Homes. All Rights Reserved. Designed for absolute aesthetic visual excellence. Frame sequence captured via Veo AI video generators. All properties are hypothetical demonstrations.
          </div>
          
          {/* MLS & Housing Compliance Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="border border-muted/30 px-2 py-0.5 rounded text-[8px] font-bold tracking-wider">MLS</span>
            <svg className="w-5 h-5 fill-current opacity-50" viewBox="0 0 24 24" aria-hidden="true">
              <title>Equal Housing Opportunity</title>
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm5 9H7v-1.5c0-1.66 3.33-2.5 5-2.5s5 .84 5 2.5V17z"/>
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
}
