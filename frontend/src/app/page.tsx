"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Hotspot {
  id: number;
  top: string;
  left: string;
  title: string;
  description: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Hotspots Data
  const hotspots: Hotspot[] = [
    {
      id: 1,
      top: "62%",
      left: "32%",
      title: "Custom Travertine Fireplace",
      description: "Built with floor-to-ceiling split-face Italian travertine stone, housing a clean-burning bioethanol double-sided hearth with dual glass insulation."
    },
    {
      id: 2,
      top: "14%",
      left: "58%",
      title: "Exposed Cedar Timber Beams",
      description: "Structural solid cedar beams sourced sustainably, sandblasted for texture, and finished with a custom matte natural oil coating."
    },
    {
      id: 3,
      top: "40%",
      left: "82%",
      title: "Triple-Glazed Minimalist Glass",
      description: "12-foot high motorized sliding panels with solar-reflective smart tint and structural silicone joints for absolute panoramas."
    },
    {
      id: 4,
      top: "76%",
      left: "64%",
      title: "Bespoke Italian Lounge Suites",
      description: "Custom-configured modular low-profile sofa in premium stain-resistant Belgian linen, paired with solid black walnut accents."
    }
  ];

  // Disable preloader once video is ready to play
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        setLoading(false);
      } else {
        const handleCanPlay = () => {
          setLoading(false);
        };
        video.addEventListener("canplay", handleCanPlay);
        return () => {
          video.removeEventListener("canplay", handleCanPlay);
        };
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* 1. Loading Preloader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700">
          <div className="relative flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-gold font-light animate-pulse">
              JA Homes
            </h1>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-border-color"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin"></div>
            </div>
            <p className="text-muted tracking-wider text-xs font-mono uppercase">
              Streaming Cinematic Preview
            </p>
          </div>
        </div>
      )}

      {/* Shared Header Navigation */}
      <Header />

      {/* 3. Hero Video Section */}
      <section id="hero" className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Local Autoplaying High Quality Video */}
        <video
          ref={videoRef}
          src="/ja_homes_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          onPlay={() => setLoading(false)}
        />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

        {/* Dynamic Overlay CTA */}
        <div className="absolute inset-x-0 bottom-16 flex flex-col items-center justify-center px-6 pointer-events-none text-center z-20">
          <div className="max-w-2xl flex flex-col items-center animate-fade-in-up">
            <div className="mt-8 flex flex-col items-center gap-4 pointer-events-auto">
              <span className="text-[9px] tracking-[0.3em] text-amber-500 uppercase font-mono animate-bounce">
                Scroll to enter experience
              </span>
              <div className="flex gap-4">
                <Link
                  href="/projects"
                  className="bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                  id="hero-explore-portfolio"
                >
                  View Projects <ArrowRight size={14} />
                </Link>
                <Link
                  href="/book"
                  className="glass-panel text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105 border border-white/20"
                  id="hero-schedule-tour"
                >
                  Book Private Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade Gradient to transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* 4. Interactive Material Tour */}
      <section id="virtual-tour" className="py-24 bg-foreground/2 relative z-30 border-t border-b border-border-color">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Copy */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                Architectural Detailing
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light">
                Interactive Material Tour
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
                Hover or click on the interactive hotspots in the custom living room design to examine the craftsmanship, source materials, and smart technologies integrated into a typical JA home.
              </p>
              
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Compass size={14} />
                  </span>
                  <div>
                    <span className="text-xs font-mono text-foreground/80 block">Virtual Compass Integration</span>
                    <span className="text-xs text-muted font-light">Accented spatial positioning for seasonal sun angles.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Sparkles size={14} />
                  </span>
                  <div>
                    <span className="text-xs font-mono text-foreground/80 block">Certified Materials Sourcing</span>
                    <span className="text-xs text-muted font-light">Verified carbon-neutral woods and premium stone quarries.</span>
                  </div>
                </div>
              </div>

              {/* Custom Hotspot Description Display */}
              <div className="mt-6 min-h-[140px] p-5 glass-panel rounded-xl border border-amber-500/20 flex flex-col justify-center transition-all duration-300">
                {activeHotspot ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-serif text-amber-550 dark:text-amber-300 tracking-wide font-medium">
                        {activeHotspot.title}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-muted hover:text-foreground cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-muted leading-relaxed font-light font-sans">
                      {activeHotspot.description}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted py-4">
                    <p className="text-xs font-mono uppercase tracking-wider mb-1">Interactive Console</p>
                    <p className="text-xs font-light">Click any hotspot indicator on the panorama to inspect detail specifications.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive Hotspot Image Container */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border-color shadow-2xl">
                <Image
                  src="/villa_interior.png"
                  alt="Luxury Villa Living Room Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                {hotspots.map((hotspot) => {
                  const isActive = activeHotspot?.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot)}
                      className="absolute group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                      style={{ top: hotspot.top, left: hotspot.left }}
                      aria-label={`Hotspot details: ${hotspot.title}`}
                    >
                      <span className={`absolute inset-0 rounded-full bg-amber-500 opacity-60 ${
                        isActive ? "scale-150 animate-ping" : "animate-ping"
                      }`} />
                      <span className={`relative w-4 h-4 rounded-full border border-white transition-all duration-300 flex items-center justify-center text-[8px] font-bold ${
                        isActive ? "bg-amber-500 text-black scale-125" : "bg-background text-foreground hover:scale-110"
                      }`}>
                        {hotspot.id}
                      </span>
                      <span className="absolute bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 ease-out glass-panel text-[10px] text-foreground px-3 py-1.5 rounded whitespace-nowrap border border-amber-500/20 shadow-xl pointer-events-none">
                        {hotspot.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted px-2 font-mono">
                <span>Viewport: Mock 3D Pan (Living Area)</span>
                <span>Active Hotspots: {hotspots.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section to direct to Projects */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full relative z-30 text-center flex flex-col items-center gap-6">
        <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">Next Steps</span>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light max-w-xl">
          Craft Your Bespoke Residence
        </h2>
        <p className="text-muted text-sm md:text-base max-w-md font-light leading-relaxed font-sans">
          Navigate to our projects showcase to explore current structural completions or co-design your own architectural sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/projects"
            className="bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            Explore Projects
          </Link>
          <Link
            href="/book"
            className="bg-foreground/5 border border-border-color text-foreground font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-foreground/10 transition-all cursor-pointer"
          >
            Schedule Private Tour
          </Link>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
