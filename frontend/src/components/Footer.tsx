import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-foreground/3 border-t border-border-color py-16 px-6 relative z-30 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col">
          <span className="text-xl font-serif tracking-widest text-gold font-light">JA HOMES</span>
          <span className="text-[8px] font-mono tracking-[0.3em] text-muted uppercase mt-1">
            Architectural Refinement &copy; 2026
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-mono uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-amber-500 transition-colors">Experience</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
          <Link href="/projects" className="hover:text-amber-500 transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
          <Link href="/book" className="hover:text-amber-500 transition-colors">Booking</Link>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1">
            Next.js <ExternalLink size={10} />
          </a>
        </div>

        <div className="text-muted/60 text-[10px] font-mono max-w-xs leading-normal">
          Designed for absolute aesthetic visual excellence. Frame sequence captured via Veo AI video generators. All properties are hypothetical demonstrations.
        </div>
      </div>
    </footer>
  );
}
