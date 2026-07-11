"use client";

import React, { useEffect, useRef, useState } from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  spec: string;
  phone?: string;
  delay?: number;
  objectPosition?: string;
}

export default function TeamCard({
  name,
  role,
  bio,
  image,
  spec,
  phone,
  delay = 0,
  objectPosition,
}: TeamMemberProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentEl = cardRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass-panel p-4 rounded-2xl border border-border-color group flex flex-col gap-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 rotate-0 translate-y-0 scale-100"
          : "opacity-0 rotate-2 translate-y-10 scale-95"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* 1. Portrait Image Box (fully visible, no text overlays) */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-border-color bg-foreground/[0.02]">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105 ${objectPosition || "object-center"}`}
        />
        {/* Specs Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[8px] font-mono text-amber-500 bg-black/75 backdrop-blur-md border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            {spec}
          </span>
        </div>
      </div>

      {/* 2. Card Content details below image (fully visible) */}
      <div className="flex flex-col gap-2 p-0.5">
        
        {/* Role & Name */}
        <span className="text-amber-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
          {role}
        </span>
        <h3 className="text-lg font-serif text-foreground font-semibold tracking-wide">
          {name}
        </h3>

        {/* Bio description */}
        <p className="text-xs text-foreground/80 font-normal leading-relaxed font-sans">
          {bio}
        </p>

        {/* WhatsApp Phone Link */}
        {phone && (
          <a
            href={`https://wa.me/${phone}?text=Hi%2C%20I%27m%20interested%20in%20JA%20Homes.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-500 hover:text-amber-400 font-semibold hover:gap-2 self-start transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.3a.75.75 0 0 0 .916.938l5.65-1.473A11.936 11.936 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.98-1.367l-.356-.212-3.695.963.988-3.596-.232-.37A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
