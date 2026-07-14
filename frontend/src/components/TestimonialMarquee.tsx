"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  quote: string;
  client: string;
  initials: string;
  property: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Working with JA Homes was an exceptional experience. Their professionalism, quality, and attention to detail exceeded our expectations.",
    client: "Nilmalya Kar",
    initials: "NK",
    property: "Villas at Aspen",
    stars: 5
  },
  {
    quote: "From the initial consultation to the final handover, the team demonstrated unmatched expertise. The custom eco-friendly integrations and premium finishes are truly breathtaking.",
    client: "Rohan & Priya",
    initials: "RP",
    property: "Om Sai Ashraya",
    stars: 5
  },
  {
    quote: "We were looking for a residence that perfectly balanced modern architecture with natural landscapes. JA Homes delivered a masterpiece that feels both luxurious and organically connected to the environment.",
    client: "Aman Gupta",
    initials: "AG",
    property: "Om Sai Ashraya",
    stars: 5
  },
  {
    quote: "The craftsmanship is unparalleled. Every material used, from the brushed oak flooring to the imported marble cladding, radiates quality. They genuinely redefine luxury real estate.",
    client: "Dr. Sanjay Verma",
    initials: "SV",
    property: "Alpine Crest Estate",
    stars: 5
  },
  {
    quote: "JA Homes managed our bespoke property acquisition with absolute discretion and efficiency. The biophilic design elements they incorporated have transformed our daily living experience.",
    client: "Kavita S.",
    initials: "KS",
    property: "Om Sai Ashraya",
    stars: 5
  }
];

// Subcomponent for each testimonial card to handle individual 3D tilt and staggered stars
function TestimonialCard({ t, onClick }: { t: Testimonial; onClick: () => void }) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile/touch screens
    if (window.matchMedia("(hover: none)").matches) return;

    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    // Calculate mouse position relative to card center
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Degrees of rotation (max 8 deg)
    const rotateX = Math.max(-8, Math.min(8, -y / 20));
    const rotateY = Math.max(-8, Math.min(8, x / 20));
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
      boxShadow: "0 25px 50px -12px rgba(41, 105, 194, 0.3)"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
      boxShadow: "none"
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="glass-card cursor-pointer border border-border-color/80 p-8 rounded-2xl w-[320px] md:w-[380px] shrink-0 relative overflow-hidden backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/marquee:opacity-60 hover:!opacity-100 hover:!scale-105 hover:!-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/40 hover:z-20 will-change-transform-opacity"
    >
      {/* Radial ambient glow on hover */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 bg-amber-500/[0.04] blur-3xl rounded-full pointer-events-none transition-opacity duration-500 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`} />

      {/* Large double quotes background */}
      <span className="text-[10rem] font-serif text-amber-550/[0.04] dark:text-amber-500/[0.04] leading-none select-none absolute -top-8 right-4 pointer-events-none">
        “
      </span>

      {/* Card Header: Initials and verification */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border-color/20">
        <div className="flex items-center gap-3">
          {/* Avatar initials with gold-gradient border */}
          <div className="w-11 h-11 rounded-full bg-gold-gradient text-black flex items-center justify-center font-mono font-semibold text-sm border border-white/10 shadow-md">
            {t.initials}
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold block">
              {t.client}
            </span>
            <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest block mt-0.5">
              {t.property}
            </span>
          </div>
        </div>

        {/* Staggered Stars Animation */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-0.5 text-amber-550 dark:text-amber-500">
            {Array.from({ length: t.stars }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 fill-current transition-all duration-500 ease-out-back ${
                  isHovered ? "scale-100 opacity-100" : "scale-75 opacity-70"
                }`}
                style={{
                  transitionDelay: isHovered ? `${i * 100}ms` : "0ms"
                }}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-[7px] font-mono text-muted/80 uppercase tracking-wider">Verified Purchase</span>
        </div>
      </div>

      {/* Card Quote */}
      <p className="text-sm leading-relaxed font-serif font-light text-foreground/80 italic relative z-10">
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>
  );
}

export default function TestimonialMarquee() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);

  // Triple the array to create seamless looping content
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-28 bg-foreground/[0.01] border-t border-b border-border-color/50 relative z-30 overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.015] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ScrollReveal className="flex flex-col gap-3">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
            Voices of Distinction
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light">
            Client Testimonials
          </h2>
        </ScrollReveal>
        <ScrollReveal className="flex flex-col items-start gap-4 md:items-end" delay={100}>
          <p className="text-muted text-xs md:text-sm font-light leading-relaxed max-w-sm md:text-right font-sans">
            Hear from our distinguished clients about their journey in crafting bespoke, luxury sustainable properties. Hover to pause marquee and tilt cards.
          </p>
          <button
            onClick={() => setShowAllReviews(true)}
            className="font-mono text-[9px] uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors border border-amber-500/20 hover:border-amber-500/40 px-4 py-2 rounded-full cursor-pointer"
          >
            Open Review Archive +
          </button>
        </ScrollReveal>
      </div>

      {/* Infinite scrolling Marquee wrapper */}
      <div className="relative w-full flex items-center overflow-x-hidden py-8">
        {/* Left & Right gradient masks to blend edges into background */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Double-width moving flex track */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] will-change-transform group/marquee">
          {marqueeItems.map((item, idx) => (
            <TestimonialCard key={idx} t={item} onClick={() => setSelectedReview(item)} />
          ))}
        </div>
      </div>

      {/* Archive Modal Overlay */}
      {showAllReviews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6">
          <div className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-3xl border border-border-color shadow-2xl p-8 overflow-y-auto flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-border-color pb-4 mb-6">
              <div>
                <span className="text-amber-500 text-[10px] font-mono uppercase tracking-wider block mb-1">Archive</span>
                <h3 className="text-2xl font-serif font-light text-foreground uppercase">ALL CLIENT REVIEWS</h3>
              </div>
              <button
                onClick={() => setShowAllReviews(false)}
                className="text-muted hover:text-foreground cursor-pointer font-mono text-xs uppercase tracking-widest border border-border-color hover:border-foreground/30 px-4 py-2 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-col gap-8 divide-y divide-border-color">
              {testimonials.map((t, idx) => (
                <div key={idx} className={`pt-6 ${idx === 0 ? "pt-0" : ""}`}>
                  <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-serif italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-foreground block">
                        — {t.client}
                      </span>
                      <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mt-0.5 pl-4">
                        {t.property}
                      </span>
                    </div>
                    <div className="flex gap-0.5 text-amber-550 dark:text-amber-500">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selected Specific Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6">
          <div className="glass-panel w-full max-w-xl rounded-3xl border border-border-color shadow-2xl p-8 flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-border-color pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center font-mono font-semibold text-lg border border-white/10 shadow-md">
                  {selectedReview.initials}
                </div>
                <div>
                  <span className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold block">
                    {selectedReview.client}
                  </span>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mt-0.5">
                    {selectedReview.property}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-muted hover:text-foreground cursor-pointer font-mono text-xs uppercase tracking-widest border border-border-color hover:border-foreground/30 px-4 py-2 rounded-lg"
              >
                ✕ Close
              </button>
            </div>
            
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-serif italic mb-6">
              &ldquo;{selectedReview.quote}&rdquo;
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-color/20">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Verified Purchase</span>
              <div className="flex gap-0.5 text-amber-550 dark:text-amber-500">
                {Array.from({ length: selectedReview.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
