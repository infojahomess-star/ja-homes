"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import TextType from "../components/TextType";

interface HotspotSpec {
  label: string;
  value: string;
}

interface Hotspot {
  id: number;
  top: string;
  left: string;
  title: string;
  subtitle: string;
  description: string;
  swatchGradient: string;
  specCode: string;
  specs: HotspotSpec[];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<number | null>(null);

  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [fadeTestimonial, setFadeTestimonial] = useState(true);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  // Testimonials Archive
  const testimonials = [
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
      property: "Sapphire Heights",
      stars: 5
    },
    {
      quote: "We were looking for a residence that perfectly balanced modern architecture with natural landscapes. JA Homes delivered a masterpiece that feels both luxurious and organically connected to the environment.",
      client: "Aman Gupta",
      initials: "AG",
      property: "Zenith Penthouse",
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
      property: "Azure Cove Mansion",
      stars: 5
    }
  ];

  const handleNextTestimonial = () => {
    setFadeTestimonial(false);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      setFadeTestimonial(true);
    }, 200);
  };

  const handlePrevTestimonial = () => {
    setFadeTestimonial(false);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFadeTestimonial(true);
    }, 200);
  };

  // Hotspots Data
  const hotspots: Hotspot[] = [
    {
      id: 1,
      top: "62%",
      left: "32%",
      title: "Custom Travertine Fireplace",
      subtitle: "Tivoli Stone Quarry",
      description: "Built with floor-to-ceiling split-face Italian travertine stone, housing a clean-burning bioethanol double-sided hearth with dual glass insulation.",
      swatchGradient: "bg-gradient-to-tr from-[#A69784] via-[#D5C7B6] to-[#EAE2D8] border border-white/20 shadow-inner",
      specCode: "MAT-TRAV-01",
      specs: [
        { label: "Origin", value: "Tivoli, Italy" },
        { label: "Material", value: "Split-face Classico Travertine" },
        { label: "Carbon Footprint", value: "Net Zero Certified" },
        { label: "Thermal Conductivity", value: "0.48 W/m·K" }
      ]
    },
    {
      id: 2,
      top: "14%",
      left: "58%",
      title: "Exposed Cedar Timber Beams",
      subtitle: "Reclaimed Pacific Northwest Timber",
      description: "Structural solid cedar beams sourced sustainably, sandblasted for texture, and finished with a custom matte natural oil coating.",
      swatchGradient: "bg-gradient-to-tr from-[#4E2F17] via-[#85532A] to-[#B07B50] border border-white/20 shadow-inner",
      specCode: "MAT-WOOD-02",
      specs: [
        { label: "Origin", value: "Pacific Northwest, USA" },
        { label: "Material", value: "Reclaimed Old-Growth Cedar" },
        { label: "Carbon Footprint", value: "Carbon-Negative Offset" },
        { label: "Finish Quality", value: "Hand-Sandblasted Matte Oil" }
      ]
    },
    {
      id: 3,
      top: "40%",
      left: "82%",
      title: "Triple-Glazed Minimalist Glass",
      subtitle: "Electrochromic Solar Glass",
      description: "12-foot high motorized sliding panels with solar-reflective smart tint and structural silicone joints for absolute panoramas.",
      swatchGradient: "bg-gradient-to-tr from-[#1B365D]/40 via-[#5E7A9C]/20 to-[#E0F2FE]/50 border border-amber-500/30 backdrop-blur-xs",
      specCode: "MAT-GLAS-03",
      specs: [
        { label: "Origin", value: "Bavaria, Germany" },
        { label: "Glass Type", value: "Triple-Glazed Low-E Tint" },
        { label: "Solar Heat Gain (SHGC)", value: "0.22 (Dynamic shading)" },
        { label: "Motorization", value: "Integrated Smart Home Drive" }
      ]
    },
    {
      id: 4,
      top: "76%",
      left: "64%",
      title: "Bespoke Italian Lounge Suites",
      subtitle: "Belgian Linen & Black Walnut Base",
      description: "Custom-configured modular low-profile sofa in premium stain-resistant Belgian linen, paired with solid black walnut accents.",
      swatchGradient: "bg-gradient-to-tr from-[#A8A297] via-[#D5CEB6] to-[#E5E0D5] border border-white/20 shadow-inner",
      specCode: "MAT-FURN-04",
      specs: [
        { label: "Fabric Sourcing", value: "Antwerp, Belgium (Double-woven linen)" },
        { label: "Support Base", value: "Hand-Carved American Black Walnut" },
        { label: "Toxicity Rating", value: "VOC-Free Natural Beeswax Polish" },
        { label: "Upholstery Rating", value: "100,000 Martindale Rubs" }
      ]
    }
  ];

  const currentDisplayHotspot = hoveredHotspotId 
    ? hotspots.find(h => h.id === hoveredHotspotId) 
    : activeHotspot;

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
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white shadow-[0_4px_20px_rgba(14,140,226,0.3)] hover:shadow-[0_6px_25px_rgba(14,140,226,0.5)] text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                  id="hero-explore-portfolio"
                >
                  View Projects <ArrowRight size={14} />
                </Link>
                <Link
                  href="/book"
                  className="glass-panel text-amber-300 hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-500 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-500/30 hover:border-transparent hover:shadow-[0_4px_15px_rgba(14,140,226,0.25)]"
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
      <section id="virtual-tour" className="py-28 bg-gradient-to-b from-background via-foreground/[0.01] to-background relative z-30 overflow-hidden border-t border-border-color/50">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <ScrollReveal className="flex flex-col gap-3">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                Architectural Detailing
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light">
                The Materiality of Luxury
              </h2>
            </ScrollReveal>
            <ScrollReveal className="max-w-md" delay={100}>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed font-sans">
                Every surface is crafted to bring biophilic harmony and structural perfection. Interact with the swatches or layout hotspots to pan the camera viewport and inspect our architectural specifications.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Material Selector & Console (Grid span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Swatches List */}
              <ScrollReveal className="flex flex-col gap-4">
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.25em]">Select Material Specification</span>
                <div className="flex flex-col gap-3">
                  {hotspots.map((hotspot) => {
                    const isSelected = activeHotspot?.id === hotspot.id;
                    const isHovered = hoveredHotspotId === hotspot.id;
                    const isActive = isSelected || isHovered;
                    
                    return (
                      <button
                        key={hotspot.id}
                        onClick={() => {
                          if (isSelected) {
                            setActiveHotspot(null);
                          } else {
                            setActiveHotspot(hotspot);
                          }
                        }}
                        onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                        onMouseLeave={() => setHoveredHotspotId(null)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-350 cursor-pointer ${
                          isActive
                            ? "bg-amber-500/[0.04] border-amber-500/40 shadow-[0_4px_20px_-8px_rgba(41,105,194,0.15)]"
                            : "bg-card/40 border-border-color hover:border-amber-500/20 hover:bg-card/70"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Swatch circle */}
                          <div className={`w-8 h-8 rounded-full shrink-0 transition-transform duration-350 ${hotspot.swatchGradient} ${
                            isActive ? "scale-110 ring-2 ring-amber-500/40" : ""
                          }`} />
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono text-amber-500 font-bold">0{hotspot.id}</span>
                              <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                                {hotspot.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted font-light block mt-0.5">
                              {hotspot.subtitle}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-350 ${
                            isActive ? "bg-amber-500 animate-pulse scale-125" : "bg-muted/40"
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Dynamic Specifications Console */}
              <ScrollReveal className="w-full" delay={100}>
                <div 
                  key={currentDisplayHotspot ? currentDisplayHotspot.id : "empty"}
                  className="glass-card rounded-2xl border border-border-color shadow-xl overflow-hidden animate-fade-in-up"
                >
                  {/* Console Header */}
                  <div className="bg-foreground/[0.02] border-b border-border-color px-6 py-4 flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                      {currentDisplayHotspot ? `Console: ${currentDisplayHotspot.specCode}` : "Console: Idle Mode"}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      currentDisplayHotspot ? "bg-[#25D366] animate-pulse" : "bg-amber-500/50"
                    }`} />
                  </div>

                  {currentDisplayHotspot ? (
                    <div className="p-6 flex flex-col gap-5">
                      <div>
                        <h3 className="text-base font-serif text-amber-500 tracking-wide font-medium">
                          {currentDisplayHotspot.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted leading-relaxed font-light mt-2">
                          {currentDisplayHotspot.description}
                        </p>
                      </div>

                      {/* Technical specifications table */}
                      <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border-color/50">
                        {currentDisplayHotspot.specs.map((spec, index) => (
                          <div key={index} className="flex justify-between items-center text-[10px] md:text-xs py-1 font-mono">
                            <span className="text-muted font-light">{spec.label}</span>
                            <span className="text-foreground/90 font-medium text-right max-w-[200px] truncate">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                      <div className="w-10 h-10 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500/40 mb-3 animate-pulse">
                        <Compass size={18} />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted mb-1">
                        System Awaiting Input
                      </span>
                      <p className="text-[11px] text-muted/80 max-w-[260px] font-light">
                        Select a material specification swatch or click an image hotspot to examine detailing.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Immersive Camera Viewport (Grid span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <ScrollReveal className="w-full" delay={150}>
                {/* Outer Viewport Container with corner frame borders */}
                <div className="relative group rounded-2xl overflow-hidden border border-border-color shadow-2xl bg-black aspect-[16/10] w-full">
                  
                  {/* Technical Overlay HUD Brackets */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/30 z-30 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/30 z-30 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/30 z-30 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/30 z-30 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>

                  {/* HUD Text Overlays */}
                  <div className="absolute top-5 left-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="text-foreground/80 tracking-widest">LIVE FOCUS VIEW</span>
                  </div>
                  
                  <div className="absolute top-5 right-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none">
                    <span>COORD: {currentDisplayHotspot ? `[X: ${currentDisplayHotspot.left} | Y: ${currentDisplayHotspot.top}]` : "[X: 50% | Y: 50%]"}</span>
                  </div>
                  
                  <div className="absolute bottom-5 left-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none flex gap-4">
                    <span>ZOOM: {currentDisplayHotspot ? "1.30X" : "1.00X"}</span>
                    <span>LENS: 24MM F/2.8</span>
                  </div>

                  <div className="absolute bottom-5 right-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none">
                    <span>SYSTEM: {currentDisplayHotspot ? "CALIBRATING MATERIAL" : "ACTIVE SEARCHING"}</span>
                  </div>

                  {/* Panoramic Zoomable Image Container */}
                  <div 
                    className="w-full h-full overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: currentDisplayHotspot ? "scale(1.3)" : "scale(1)",
                      transformOrigin: currentDisplayHotspot ? `${currentDisplayHotspot.left} ${currentDisplayHotspot.top}` : "center center"
                    }}
                  >
                    <Image
                      src="/villa_interior.png"
                      alt="Luxury Villa Living Room Interior"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-opacity duration-700"
                      priority
                    />
                  </div>

                  {/* Hotspots overlay (zooms with image so it stays aligned) */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                      transform: currentDisplayHotspot ? "scale(1.3)" : "scale(1)",
                      transformOrigin: currentDisplayHotspot ? `${currentDisplayHotspot.left} ${currentDisplayHotspot.top}` : "center center",
                      transition: "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    {hotspots.map((hotspot) => {
                      const isSelected = activeHotspot?.id === hotspot.id;
                      const isHovered = hoveredHotspotId === hotspot.id;
                      const isActive = isSelected || isHovered;
                      const isAnyActive = !!currentDisplayHotspot;
                      
                      return (
                        <button
                          key={hotspot.id}
                          onClick={() => {
                            if (isSelected) {
                              setActiveHotspot(null);
                            } else {
                              setActiveHotspot(hotspot);
                            }
                          }}
                          onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                          onMouseLeave={() => setHoveredHotspotId(null)}
                          className={`absolute pointer-events-auto group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                            isAnyActive && !isActive ? "opacity-30 scale-90" : "opacity-100"
                          }`}
                          style={{ top: hotspot.top, left: hotspot.left }}
                          aria-label={`Hotspot details: ${hotspot.title}`}
                        >
                          {/* Pulsing ring */}
                          <span className={`absolute inset-0 rounded-full bg-amber-500 transition-all duration-500 ${
                            isActive ? "opacity-60 scale-150 animate-ping" : "opacity-40 animate-pulse"
                          }`} />
                          
                          {/* Inner circle */}
                          <span className={`relative w-5 h-5 rounded-full border border-white/40 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold ${
                            isActive ? "bg-amber-500 text-black scale-110" : "bg-black/60 text-white backdrop-blur-xs hover:scale-110"
                          }`}>
                            0{hotspot.id}
                          </span>

                          {/* Hover tooltip */}
                          <span className="absolute bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 ease-out glass-panel text-[10px] font-mono uppercase tracking-wider text-foreground px-3 py-1.5 rounded whitespace-nowrap border border-amber-500/20 shadow-xl pointer-events-none z-30">
                            {hotspot.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </ScrollReveal>
              
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted px-2 font-mono uppercase tracking-widest">
                <span>Viewport: 3D Camera Pan (Living Area)</span>
                <span>Active Hotspots: {hotspots.length}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. What Our Clients Are Saying (Testimonials) */}
      <section className="py-28 bg-foreground/[0.01] border-t border-b border-border-color/50 relative z-30 overflow-hidden">
        {/* Subtle radial ambient light background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side: Editorial context & Controls (Col span 5) */}
            <ScrollReveal className="lg:col-span-5 flex flex-col gap-8 justify-between h-full">
              <div className="flex flex-col gap-4">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">
                  Voices of Distinction
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light">
                  Client Testimonials
                </h2>
                <p className="text-muted text-xs md:text-sm font-light leading-relaxed font-sans mt-2 max-w-sm">
                  Discover the experiences of our distinguished clients who collaborated with JA Homes to turn their vision of bespoke luxury living into reality.
                </p>
              </div>

              {/* Progress and controls block */}
              <div className="flex flex-col gap-6 mt-6 md:mt-12">
                
                {/* Modern Index & Slide indicator */}
                <div className="flex items-center gap-6">
                  <div className="font-mono text-xs text-muted flex items-baseline gap-1">
                    <span className="text-base font-bold text-amber-500">0{activeTestimonial + 1}</span>
                    <span>/</span>
                    <span>0{testimonials.length}</span>
                  </div>
                  
                  {/* Sliding Progress Line */}
                  <div className="w-40 h-[2px] bg-border-color/60 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${100 / testimonials.length}%`,
                        transform: `translateX(${activeTestimonial * 100}%)`
                      }}
                    />
                  </div>
                </div>

                {/* Control Arrows */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevTestimonial}
                    className="w-12 h-12 rounded-full border border-border-color/80 flex items-center justify-center text-foreground hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 active:scale-90 cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  <button
                    onClick={handleNextTestimonial}
                    className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-90 cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                  
                  <button
                    onClick={() => setShowAllTestimonials(true)}
                    className="ml-4 font-mono text-[9px] uppercase tracking-widest text-muted hover:text-amber-500 transition-colors border-b border-muted/30 hover:border-amber-500 pb-1 cursor-pointer"
                  >
                    View Archive +
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Side: Immersive testimonial card (Col span 7) */}
            <div className="lg:col-span-7 w-full relative">
              <ScrollReveal className="w-full" delay={150}>
                {/* Outer decorative card shadow ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent blur-xl rounded-3xl -z-10 pointer-events-none" />

                <div 
                  key={activeTestimonial}
                  className="glass-card border border-border-color/80 p-8 md:p-12 rounded-3xl relative overflow-hidden backdrop-blur-md animate-fade-in-up"
                >
                  {/* Glowing amber radial background inside card */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/[0.03] blur-3xl rounded-full pointer-events-none" />
                  
                  {/* Giant ambient quotation mark in background */}
                  <span className="text-[12rem] font-serif text-amber-550/[0.04] leading-none select-none absolute -top-8 right-6 pointer-events-none">“</span>
                  
                  {/* Card Header: Client profile & stars */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-border-color/30">
                    <div className="flex items-center gap-4">
                      {/* Initials Badge */}
                      <div className="w-14 h-14 rounded-full bg-gold-gradient text-black flex items-center justify-center font-mono font-semibold text-lg border border-white/10 shadow-lg">
                        {testimonials[activeTestimonial].initials}
                      </div>
                      
                      <div>
                        <span className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold block">
                          {testimonials[activeTestimonial].client}
                        </span>
                        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mt-0.5">
                          {testimonials[activeTestimonial].property}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating HUD */}
                    <div className="flex flex-col gap-1 items-start sm:items-end">
                      <div className="flex gap-1 text-amber-550 dark:text-amber-500">
                        {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-[8px] font-mono text-muted uppercase tracking-wider">Verified Purchase</span>
                    </div>
                  </div>

                  {/* Card Body: Quote */}
                  <p className="text-base md:text-lg leading-relaxed font-serif font-light text-foreground/90 italic">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Modal Overlay */}
      {showAllTestimonials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6">
          <div className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-3xl border border-border-color shadow-2xl p-8 overflow-y-auto flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-border-color pb-4 mb-6">
              <div>
                <span className="text-amber-500 text-[10px] font-mono uppercase tracking-wider block mb-1">Archive</span>
                <h3 className="text-2xl font-serif font-light text-foreground">ALL CLIENT REVIEWS</h3>
              </div>
              <button
                onClick={() => setShowAllTestimonials(false)}
                className="text-muted hover:text-foreground cursor-pointer font-mono text-xs uppercase tracking-widest border border-border-color hover:border-foreground/30 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-col gap-8 divide-y divide-border-color">
              {testimonials.map((t, idx) => (
                <div key={idx} className={`pt-6 ${idx === 0 ? "pt-0" : ""}`}>
                  <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-serif italic mb-4">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-foreground block">
                        — {t.client}
                      </span>
                      <span className="text-[9px] font-mono text-amber-550 dark:text-amber-500 uppercase tracking-widest block mt-0.5 pl-4">
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

      {/* CTA section to direct to Projects */}
      <ScrollReveal className="w-full relative bg-black overflow-hidden py-24 px-6 my-12">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="https://res.cloudinary.com/dtmqv7oqq/video/upload/v1782285983/Futuristic_city_skyline_at_night_202606241246_xqfvb1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background pointer-events-none" />

        <div className="relative z-30 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">Next Steps</span>
          <TextType
            text="Craft Your Bespoke Residence"
            as="h2"
            className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light max-w-xl"
            typingSpeed={75}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
            startOnVisible={true}
          />
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
              className="bg-foreground/5 border border-border-color text-[#faf9f6] hover:bg-foreground/10 text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
            >
              Schedule Private Tour
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919811086206?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
