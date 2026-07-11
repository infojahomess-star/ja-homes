"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../app/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="mt-auto bg-foreground/[0.03] pt-16 pb-8 px-6 relative z-30 w-full border-t border-border-color">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Link Columns & Socials */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-border-color">
          
          {/* Column 1: Company */}
          <div className="flex flex-col gap-4">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Company</span>
            <ul className="flex flex-col gap-2.5 text-sm font-sans font-medium text-foreground/80">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-500 transition-colors duration-300">Our Portfolio</Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-amber-500 transition-colors duration-300">Book Private Tour</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Residences */}
          <div className="flex flex-col gap-4">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Residences</span>
            <ul className="flex flex-col gap-2.5 text-sm font-sans font-medium text-foreground/80">
              <li>
                <Link href="/residences" className="hover:text-amber-500 transition-colors duration-300">Overview</Link>
              </li>
              <li>
                <Link href="/projects/om-sai-ashraya" className="hover:text-amber-500 transition-colors duration-300">Om Sai Ashraya</Link>
              </li>
              <li>
                <Link href="/residences" className="hover:text-amber-500 transition-colors duration-300">Sustainable Villas</Link>
              </li>
              <li>
                <Link href="/residences" className="hover:text-amber-500 transition-colors duration-300">Eco Mansions</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-4">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Support</span>
            <ul className="flex flex-col gap-2.5 text-sm font-sans font-medium text-foreground/80">
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition-colors duration-300">Contact Us</Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-amber-500 transition-colors duration-300">Consultations</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">FAQ & Help</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">Sponsorship</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community */}
          <div className="flex flex-col gap-4">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Community</span>
            <ul className="flex flex-col gap-2.5 text-sm font-sans font-medium text-foreground/80">
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">Sustainability</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">Eco Partnerships</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">Biophilic Design</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">Newsletter</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Details */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Contact</span>
            <ul className="flex flex-col gap-2.5 text-sm font-sans font-medium text-foreground/80">
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-amber-500 shrink-0" />
                <a href="mailto:info.jahomess@gmail.com" className="hover:text-amber-500 transition-colors duration-300 truncate">info.jahomess@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-amber-500 shrink-0" />
                <a href="tel:+919811086206" className="hover:text-amber-500 transition-colors duration-300 truncate">+91 98110 86206</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-amber-500 shrink-0" />
                <a href="tel:+919348402331" className="hover:text-amber-500 transition-colors duration-300 truncate">+91 93484 02331</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <a href="https://share.google/F6gxsXy9KhpTmDwh5" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors duration-300 leading-tight">Phulnakhara, Bhubaneswar</a>
              </li>
            </ul>
          </div>

          {/* Column 6: Connect & Badges */}
          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1 items-start lg:items-end">
            <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">Connect</span>
            <div className="flex gap-2">
              <a href="https://facebook.com/jahomes" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-foreground/20 hover:border-amber-500/40 flex items-center justify-center text-foreground hover:text-amber-500 bg-foreground/5 hover:bg-amber-500/10 transition-all duration-300" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com/jahomes_re" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-foreground/20 hover:border-amber-500/40 flex items-center justify-center text-foreground hover:text-amber-500 bg-foreground/5 hover:bg-amber-500/10 transition-all duration-300" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://wa.me/919811086206?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-foreground/20 hover:border-amber-500/40 flex items-center justify-center text-foreground hover:text-amber-500 bg-foreground/5 hover:bg-amber-500/10 transition-all duration-300" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M16.5 16c-.16.14-.35.25-.57.29-.2.03-.43.02-.68-.03-.26-.06-.57-.16-.94-.32a9.12 9.12 0 0 1-2.48-1.72 9.4 9.4 0 0 1-1.74-2.52c-.15-.29-.25-.54-.3-.76-.05-.23-.05-.44-.01-.63.04-.2.13-.37.26-.5.06-.06.12-.13.2-.21.07-.08.14-.15.21-.21.16-.14.33-.21.48-.19.16.02.29.13.39.31l.6 1.09c.09.16.15.28.18.37.03.1.02.2-.04.3-.06.11-.13.23-.22.36-.08.11-.15.2-.18.25-.03.05-.03.11-.01.18.06.2.22.46.46.77.25.3.52.56.81.77.16.11.3.19.41.22.1.04.2.03.3-.02.1-.05.21-.14.33-.26.11-.12.2-.23.27-.33.07-.1.17-.13.3-.1.14.04.4.15.77.34l1.1.58c.11.06.19.12.24.18.05.06.07.15.06.26-.01.1-.06.24-.15.42z" />
                </svg>
              </a>
              <a href="tel:+919811086206" className="w-8 h-8 rounded-full border border-foreground/20 hover:border-amber-500/40 flex items-center justify-center text-foreground hover:text-amber-500 bg-foreground/5 hover:bg-amber-500/10 transition-all duration-300" aria-label="Call">
                <Phone size={14} strokeWidth={1.5} />
              </a>
            </div>

            {/* Compliance Badges */}
            <div className="flex items-center gap-3 opacity-60 mt-4">
              <span className="border border-foreground/30 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold tracking-wider text-foreground">MLS</span>
              <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24" aria-hidden="true">
                <title>Equal Housing Opportunity</title>
                <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm5 9H7v-1.5c0-1.66 3.33-2.5 5-2.5s5 .84 5 2.5V17z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Compliance Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono font-semibold text-foreground/80 text-center md:text-left pt-4">
          {/* Privacy Policy */}
          <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">
            Privacy Policy
          </Link>

          {/* Copyright */}
          <div className="max-w-2xl leading-relaxed font-sans font-normal text-foreground/70">
            &copy; 2026 JA Homes. All Rights Reserved. Designed for absolute aesthetic visual excellence. Frame sequence captured via Veo AI video generators. All properties are hypothetical demonstrations.
          </div>

          {/* Terms Of Use */}
          <Link href="/about" className="hover:text-amber-500 transition-colors duration-300">
            Terms of Use
          </Link>
        </div>

        {/* Centered Logo at the very bottom */}
        <div className="w-full flex justify-center select-none pointer-events-none mt-2 border-t border-foreground/5 pt-8">
          <div className="relative h-14 w-[232px]">
            <Image
              src="https://res.cloudinary.com/pctbshnp/image/upload/v1783009909/logo_darkk_rkhfqc.png?v=footer"
              alt="JA Homes Logo"
              fill
              sizes="232px"
              className="object-contain"
              style={{
                filter: theme === "dark" ? "invert(1) brightness(1.2)" : "none",
              }}
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
