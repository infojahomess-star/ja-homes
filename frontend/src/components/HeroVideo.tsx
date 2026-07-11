"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TextType from "./TextType";
import { motionVariants } from "./motion-variants";

interface HeroVideoProps {
  videoSrc?: string;
  title: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
}

export default function HeroVideo({
  videoSrc = "/ja_homes_video.mp4",
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
}: HeroVideoProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Trigger entry transition (camera pull-back & fade-in)
    const entryTimer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    // Stagger video display slightly to ensure buffer
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 300);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* 1. Cinematic Black Entry Overlay (fades out on load) */}
      <div
        className={`absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-1500 ease-out-quint ${
          hasEntered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 2. Full-bleed Autoplaying Video Container */}
      <div
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          hasEntered ? "scale-100" : "scale-110"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-80" : "opacity-0"
          }`}
        />
      </div>

      {/* 3. Dark Gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/95 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none" />

      {/* 4. Content Overlay */}
      <div className="absolute inset-x-0 bottom-24 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none">
        <div className="max-w-3xl flex flex-col items-center gap-6">
          
          {/* Subtitle */}
          <span
            className={`text-amber-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] transition-all duration-1000 delay-[600ms] ${
              hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subtitle}
          </span>

          {/* Headline Text: Staggered typing animation after 0.5s buffer */}
          <div className="min-h-[60px] md:min-h-[110px] flex items-center justify-center">
            {hasEntered && (
              <TextType
                text={title}
                as="h1"
                className="text-4xl md:text-6xl font-serif text-foreground tracking-wide font-light leading-tight"
                typingSpeed={60}
                initialDelay={500}
                showCursor={true}
                cursorCharacter="|"
                loop={false}
              />
            )}
          </div>

          {/* Call to Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto transition-all duration-1000 delay-[1200ms] ${
              hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              href={cta1Link}
              className={`bg-gold-gradient text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 ${motionVariants.ctaInteractive}`}
              id="hero-explore-projects"
            >
              {cta1Text} <ArrowRight size={14} />
            </Link>
            
            <Link
              href={cta2Link}
              className={`glass-panel text-[#faf9f6] border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-full ${motionVariants.ctaInteractive}`}
              id="hero-schedule-tour"
            >
              {cta2Text}
            </Link>
          </div>

        </div>
      </div>

      {/* Subtle bottom scroll prompt */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] text-muted/60 uppercase tracking-[0.25em] pointer-events-none transition-opacity duration-1000 delay-[1800ms] ${
          hasEntered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-block animate-bounce">↓ Scroll to explore</span>
      </div>
    </section>
  );
}
