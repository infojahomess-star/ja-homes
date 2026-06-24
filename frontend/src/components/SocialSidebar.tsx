"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function SocialSidebar() {
  const socialLinks: SocialLink[] = [
    {
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      ),
      label: "Facebook",
      href: "https://facebook.com/jahomes",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      href: "https://instagram.com/jahomes",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/company/jahomes",
    },
    {
      icon: <Phone size={18} />,
      label: "+1 (800) 888-9999",
      href: "tel:+18008889999",
    },
    {
      icon: <Mail size={18} />,
      label: "concierge@jahomes.com",
      href: "mailto:concierge@jahomes.com",
    },
  ];

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
      {socialLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 rounded-full glass-panel border border-border-color hover:border-amber-500/30 text-foreground hover:text-amber-500 transition-all duration-300 hover:scale-110 hover:-translate-x-1 shadow-lg active:scale-95"
          aria-label={link.label}
        >
          {link.icon}
          
          {/* Tooltip */}
          <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 ease-out origin-right glass-panel text-[10px] text-foreground font-mono px-3 py-1.5 rounded-lg border border-amber-500/20 shadow-xl whitespace-nowrap pointer-events-none">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}
