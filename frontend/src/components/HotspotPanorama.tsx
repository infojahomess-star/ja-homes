"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Compass, Sparkles, X, Layers, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motionVariants } from "./motion-variants";

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
  specCode: string;
  specs: HotspotSpec[];
  closeupUrl: string;
  colorSwatch: string;
}

export default function HotspotPanorama() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<number | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 1,
      top: "62%",
      left: "32%",
      title: "Italian Travertine Fireplace",
      subtitle: "Tivoli Stone Quarry",
      description: "Built with floor-to-ceiling split-face Italian travertine stone, housing a clean-burning bioethanol double-sided hearth with dual glass insulation.",
      specCode: "MAT-TRAV-01",
      closeupUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      colorSwatch: "bg-[#D2C3B2]",
      specs: [
        { label: "Origin", value: "Tivoli, Italy" },
        { label: "Material", value: "Split-face Classico Travertine" },
        { label: "Carbon Footprint", value: "Net Zero Certified" },
        { label: "Thermal Rating", value: "0.48 W/m·K" }
      ]
    },
    {
      id: 2,
      top: "14%",
      left: "58%",
      title: "Exposed Cedar Timber Beams",
      subtitle: "Reclaimed Pacific Northwest Timber",
      description: "Structural solid cedar beams sourced sustainably, sandblasted for texture, and finished with a custom matte natural oil coating.",
      specCode: "MAT-WOOD-02",
      closeupUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
      colorSwatch: "bg-[#8B5A2B]",
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
      specCode: "MAT-GLAS-03",
      closeupUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      colorSwatch: "bg-[#E0EEEE]",
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
      specCode: "MAT-FURN-04",
      closeupUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      colorSwatch: "bg-[#EAE6DF]",
      specs: [
        { label: "Fabric Sourcing", value: "Antwerp, Belgium (Linen)" },
        { label: "Support Base", value: "American Black Walnut" },
        { label: "Toxicity Rating", value: "VOC-Free Natural Beeswax" },
        { label: "Upholstery Rating", value: "100,000 Martindale Rubs" }
      ]
    }
  ];

  const currentDisplayHotspot = hoveredHotspotId
    ? hotspots.find((h) => h.id === hoveredHotspotId)
    : selectedHotspot;

  return (
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
          
          {/* Left Column: Material Selector (Grid span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Swatches List */}
            <ScrollReveal className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.25em]">Select Material Specification</span>
              <div className="flex flex-col gap-3">
                {hotspots.map((hotspot) => {
                  const isSelected = selectedHotspot?.id === hotspot.id;
                  const isHovered = hoveredHotspotId === hotspot.id;
                  const isActive = isSelected || isHovered;
                  
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedHotspot(null);
                        } else {
                          setSelectedHotspot(hotspot);
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
                        <div className={`w-8 h-8 rounded-full shrink-0 transition-transform duration-350 border border-white/10 ${hotspot.colorSwatch} ${
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

            {/* Static Compass Info */}
            <ScrollReveal className="mt-2 flex flex-col gap-4" delay={100}>
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
            </ScrollReveal>
          </div>

          {/* Right Column: Immersive Camera Viewport (Grid span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ScrollReveal className="w-full" delay={150}>
              {/* Outer Viewport Container with corner frame borders */}
              <div className="relative group rounded-2xl overflow-hidden border border-border-color shadow-2xl bg-black aspect-[16/10] w-full">
                
                {/* Technical Overlay HUD Brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/30 z-40 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/30 z-40 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/30 z-40 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/30 z-40 pointer-events-none transition-colors group-hover:border-amber-500/60 duration-500"></div>

                {/* HUD Text Overlays */}
                <div className="absolute top-5 left-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-foreground/80 tracking-widest">LIVE FOCUS VIEW</span>
                </div>
                
                <div className="absolute top-5 right-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none">
                  <span>COORD: {currentDisplayHotspot ? `[X: ${currentDisplayHotspot.left} | Y: ${currentDisplayHotspot.top}]` : "[X: 50% | Y: 50%]"}</span>
                </div>
                
                <div className="absolute bottom-5 left-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none flex gap-4">
                  <span>ZOOM: {selectedHotspot ? "2.40X (CLOSEUP)" : currentDisplayHotspot ? "1.30X (PREVIEW)" : "1.00X (PAN)"}</span>
                </div>

                <div className="absolute bottom-5 right-8 z-30 font-mono text-[9px] text-muted/60 pointer-events-none">
                  <span>SYSTEM: {selectedHotspot ? "CROSSFADE DETAIL" : currentDisplayHotspot ? "PREVIEW DETAIL" : "KEN BURNS PAN"}</span>
                </div>

                {/* Panorama Viewport Wrapper */}
                <div
                  className="w-full h-full relative overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: selectedHotspot 
                      ? "scale(2.4)" 
                      : currentDisplayHotspot 
                      ? "scale(1.3)" 
                      : "scale(1.04)",
                    transformOrigin: selectedHotspot 
                      ? `${selectedHotspot.left} ${selectedHotspot.top}` 
                      : currentDisplayHotspot 
                      ? `${currentDisplayHotspot.left} ${currentDisplayHotspot.top}` 
                      : "center center"
                  }}
                >
                  {/* Slow auto-panning Ken Burns Image */}
                  <Image
                    src="/villa_interior.jpg"
                    alt="Luxury Villa Living Room Interior"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover ${selectedHotspot ? "" : "animate-ken-burns"}`}
                    priority
                  />

                  {/* Closeup Detail Image Crossfade Layer */}
                  {hotspots.map((hotspot) => {
                    const isCloseupActive = selectedHotspot?.id === hotspot.id;
                    return (
                      <div
                        key={hotspot.id}
                        className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                          isCloseupActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={hotspot.closeupUrl}
                          alt={`${hotspot.title} closeup detail`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover"
                        />
                      </div>
                    );
                  })}

                  {/* Hotspots overlay markers */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {hotspots.map((hotspot) => {
                      const isSelected = selectedHotspot?.id === hotspot.id;
                      const isHovered = hoveredHotspotId === hotspot.id;
                      const isActive = isSelected || isHovered;
                      const isAnyActive = !!selectedHotspot || !!hoveredHotspotId;
                      
                      return (
                        <button
                          key={hotspot.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedHotspot(null);
                            } else {
                              setSelectedHotspot(hotspot);
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
                          {/* Pulsing radar-ping ring */}
                          <span className={`absolute inset-0 rounded-full bg-amber-500 transition-all duration-500 ${
                            isActive ? "opacity-80 scale-150 animate-ping" : "opacity-40 animate-ping"
                          }`} />
                          
                          {/* Inner circle */}
                          <span className={`relative w-5 h-5 rounded-full border border-white/40 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold ${
                            isActive ? "bg-amber-500 text-black scale-110" : "bg-black/70 text-white backdrop-blur-xs hover:scale-110"
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

                {/* Slide-in Caption Panel from the Right */}
                <div
                  className={`absolute top-0 right-0 h-full w-72 md:w-80 bg-black/90 border-l border-border-color z-30 p-6 flex flex-col justify-between backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    selectedHotspot ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  {selectedHotspot ? (
                    <div className="flex flex-col h-full justify-between gap-6">
                      <div className="flex flex-col gap-4">
                        {/* Panel Header */}
                        <div className="flex items-center justify-between border-b border-border-color pb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                            SPEC: {selectedHotspot.specCode}
                          </span>
                          <button
                            onClick={() => setSelectedHotspot(null)}
                            className="text-muted hover:text-foreground p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Title and description */}
                        <div>
                          <span className="text-[9px] font-mono text-muted uppercase tracking-widest">
                            {selectedHotspot.subtitle}
                          </span>
                          <h3 className="text-lg font-serif text-foreground font-semibold mt-1">
                            {selectedHotspot.title}
                          </h3>
                          <p className="text-xs text-muted leading-relaxed font-light mt-3">
                            {selectedHotspot.description}
                          </p>
                        </div>

                        {/* Technical Spec Table */}
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border-color/30">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-muted mb-1">
                            Tech Specs
                          </span>
                          {selectedHotspot.specs.map((spec, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-[10px] md:text-xs py-1.5 border-b border-border-color/10 font-mono"
                            >
                              <span className="text-muted font-light">{spec.label}</span>
                              <span className="text-foreground/90 font-medium text-right max-w-[150px] truncate">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Panel Footer */}
                      <div className="flex items-center gap-2 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                          <Check size={10} />
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-muted leading-snug">
                          Material Verified for Eco-Build Compliance
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

              </div>
            </ScrollReveal>
            
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted px-2 font-mono uppercase tracking-widest">
              <span>Viewport: Camera Lens Viewport</span>
              <span>Active Hotspots: {hotspots.length}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
