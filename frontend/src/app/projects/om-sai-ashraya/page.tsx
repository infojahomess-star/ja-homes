"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Compass,
  Maximize,
  Grid,
  Shield,
  Activity,
  Layers,
  TreePine,
  ArrowLeft,
  Check,
  Calendar,
  Building,
  Navigation,
  Droplets,
  Zap,
  Info,
  ExternalLink
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ScrollReveal from "../../../components/ScrollReveal";

interface FloorPlanSpec {
  room: string;
  dimensions: string;
  icon?: React.ReactNode;
}

interface FloorPlan {
  id: string;
  name: string;
  area: string;
  facing: string;
  road: string;
  specs: FloorPlanSpec[];
  image: string;
  description: string;
  layoutGrid?: {
    name: string;
    colSpan: string;
    rowSpan: string;
    bg: string;
    dimensions: string;
  }[];
}

export default function OmSaiAshrayaDetail() {
  const [activePlanTab, setActivePlanTab] = useState("ground-914");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const contactInfo = {
    developer: "Omm Sai Villa Phase-2",
    contactPerson: "Arabindam Mohanty",
    phones: ["6370327326", "9938381694"],
    email: "arabindamohanty6847@gmail.com",
    address: "Amanpada, Near DPS Kalinga, Phulnakhara, Odisha"
  };

  const amenities = [
    { name: "Gated Community", desc: "Fully secure perimeter boundary walls", icon: <Shield size={18} /> },
    { name: "24/7 Security", desc: "Round-the-clock trained security guards", icon: <Shield size={18} /> },
    { name: "CCTV Surveillance", desc: "HD camera monitoring at all key entries", icon: <Activity size={18} /> },
    { name: "Concrete Roads", desc: "Wide cement concrete interior pathways", icon: <Layers size={18} /> },
    { name: "Street Lighting", desc: "Well-lit community roads for safety", icon: <Zap size={18} /> },
    { name: "Interlocked Driveways", desc: "Premium designer tile footpaths", icon: <Grid size={18} /> },
    { name: "24/7 Water Supply", desc: "Individual water supply connection", icon: <Droplets size={18} /> },
    { name: "Individual Septic Tank", desc: "Independent private safety tank", icon: <Layers size={18} /> },
    { name: "Individual Soak Pit", desc: "Dedicated drainage soak pit system", icon: <Droplets size={18} /> },
    { name: "Main Road Side Trees", desc: "Aesthetic green tree plantations", icon: <TreePine size={18} /> },
    { name: "Vastu Compliant Plan", desc: "Perfect directional energy mapping", icon: <Compass size={18} /> },
    { name: "Super Structure Building", desc: "Earthquake-resistant masonry", icon: <Building size={18} /> },
    { name: "3D Animation Blueprints", desc: "Virtual rendering walkthroughs", icon: <Layers size={18} /> },
    { name: "Community Temple", desc: "Serene workspace for prayer", icon: <Building size={18} /> },
    { name: "Property Management", desc: "On-call post-handover maintenance", icon: <Grid size={18} /> }
  ];

  const distances = [
    { destination: "Phulnakhara-Niali NH (316A)", distance: "1.8 Kms" },
    { destination: "Synergy College", distance: "2.4 Kms" },
    { destination: "Trinath Bazar", distance: "3.0 Kms" },
    { destination: "Phulnakhara Square", distance: "4.0 Kms" },
    { destination: "New Sum Hospital", distance: "4.0 Kms" },
    { destination: "Hi-Tech Medical College", distance: "11.0 Kms" },
    { destination: "Rasulgarh", distance: "12.0 Kms" },
    { destination: "Link Road, Cuttack", distance: "14.0 Kms" },
    { destination: "Baramunda, Bhubaneswar", distance: "16.0 Kms" },
    { destination: "Bhubaneswar Railway Station", distance: "17.0 Kms" }
  ];

  const floorPlans: FloorPlan[] = [
    {
      id: "ground-914",
      name: "Ground Floor Plan (914 SQFT)",
      area: "914 SQFT",
      facing: "East Facing",
      road: "30'0\" Wide Road",
      image: "/projects/om-sai-ashraya/ground-floor-914.jpg",
      description: "This layout features a massive Portico (17'0\" x 14'10\") that accommodates two full-sized vehicles side-by-side. The entrance is Vastu-aligned facing East, flowing directly into a spacious Drawing/Dining room (13'4\" x 12'10\"). The ground-floor bedroom (13'4\" x 10'0\") is tucked away in the back for ultimate privacy, adjacent to a dedicated deck and green lawn area.",
      specs: [
        { room: "Portico / Parking (Double Car)", dimensions: "17'0\" x 14'10\"" },
        { room: "Drawing / Dining Room", dimensions: "13'4\" x 12'10\"" },
        { room: "Bedroom with deck access", dimensions: "13'4\" x 10'0\"" },
        { room: "Toilet", dimensions: "5'0\" x 8'6\"" },
        { room: "Staircase", dimensions: "7'10\" x 9'4\"" }
      ]
    },
    {
      id: "ground-920",
      name: "Ground Floor Plan (920 SQFT)",
      area: "920 SQFT",
      facing: "North-East Facing",
      road: "30'0\" Wide Road",
      image: "/projects/om-sai-ashraya/ground-floor-920.jpg",
      description: "A wider ground-floor layout offering a generous 16'0\" x 13'9\" double parking bay. The interior flows from a front-facing Drawing/Dining hall (14'9\" x 10'0\") to an expansive ground floor Bed Room (15'2\" x 10'0\"), perfect for elders or guests, with cross-ventilation and a large 9'0\" x 4'3\" bathroom.",
      specs: [
        { room: "Parking / Portico (Double Car)", dimensions: "16'0\" x 13'9\"" },
        { room: "Drawing / Dining Room", dimensions: "14'9\" x 10'0\"" },
        { room: "Bed Room (Large)", dimensions: "15'2\" x 10'0\"" },
        { room: "Toilet (Spacious)", dimensions: "9'0\" x 4'3\"" },
        { room: "Staircase", dimensions: "14'4\" x 7'10\"" }
      ]
    },
    {
      id: "second-920",
      name: "Second Floor Plan (920 SQFT)",
      area: "920 SQFT",
      facing: "North-East Facing",
      road: "N/A",
      image: "/projects/om-sai-ashraya/second-floor-920.jpg",
      description: "Designed for premium leisure, the second floor features a vast Bed Room (14'9\" x 12'0\") with extensive wardrobe space, a dedicated peaceful Puja Room (10'0\" x 4'8\"), a cozy Living Hall (15'2\" x 10'0\"), and an open Kitchenette. The highlight is the gorgeous 15'2\" x 11'0\" Open Terrace with a Pergola, offering a perfect outdoor lounge, accessible via both main stairs and a spiral M.S. Stair.",
      specs: [
        { room: "Bed Room (Master size)", dimensions: "14'9\" x 12'0\"" },
        { room: "Living Hall / Family Lounge", dimensions: "15'2\" x 10'0\"" },
        { room: "Puja Room (Dedicated)", dimensions: "10'0\" x 4'8\"" },
        { room: "Open Terrace / Pergola", dimensions: "15'2\" x 11'0\"" },
        { room: "Toilet", dimensions: "9'0\" x 4'3\"" },
        { room: "Staircase", dimensions: "14'4\" x 7'10\"" }
      ]
    }
  ];

  const currentPlan = floorPlans.find(plan => plan.id === activePlanTab) || floorPlans[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <Header />

      {/* Hero Banner with Ken Burns Effect */}
      <section className="relative h-[70vh] w-full bg-black overflow-hidden flex items-center justify-center border-b border-border-color">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Omm Sai Villa Rendering"
            fill
            className="object-cover opacity-70 animate-ken-burns"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background pointer-events-none" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 mt-16">
          <ScrollReveal className="flex flex-col gap-4 max-w-3xl">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-500 hover:text-amber-400 mb-2 transition-colors cursor-pointer group"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Back to Projects
            </Link>

            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
              Premium Residential Enclave
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#faf9f6] tracking-wide font-light uppercase leading-tight">
              OMM SAI VILLA
            </h1>
            <p className="text-white/80 text-sm md:text-lg font-light leading-relaxed font-sans max-w-xl">
              Phase-2 luxury residential development offering contemporary independent homes. Emerging along the twin city road corridor.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="glass-panel-light text-[10px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full text-foreground border border-white/10 flex items-center gap-1.5">
                <Compass size={11} className="text-amber-500" /> Vastu Compliant
              </span>
              <span className="glass-panel-light text-[10px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full text-foreground border border-white/10 flex items-center gap-1.5">
                <Maximize size={11} className="text-amber-500" /> 800 - 914 SQFT BUILT UP
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Details Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col gap-24">
        
        {/* Overview & Contact Card Row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main pitch */}
          <ScrollReveal className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.3em]">Welcome to Elite Living</span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide font-light">
              Bespoke Spaces Built For Generations
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
              Omm Sai Villa is a luxury residential development offering spacious and contemporary independent homes in the twin city road corridor (Near DPS Kalinga, Phulnakhara). It serves as a dream investment opportunity and a premier destination for you and your family.
            </p>
            <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
              Striking features include qualitative construction, state-of-the-art architecture, premium facilities, and strict high-security measures. Experience peaceful community living with individual water supply, septic systems, and landscaped green avenues.
            </p>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                <span className="text-muted font-mono text-[10px] uppercase block tracking-wider">Facing Options</span>
                <span className="text-foreground text-sm font-semibold font-sans">East & South Facing</span>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                <span className="text-muted font-mono text-[10px] uppercase block tracking-wider">Access Roads</span>
                <span className="text-foreground text-sm font-semibold font-sans">30&apos;0&quot; Wide Main Road</span>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                <span className="text-muted font-mono text-[10px] uppercase block tracking-wider">Architecture</span>
                <span className="text-foreground text-sm font-semibold font-sans">Modern G+2 Structure</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Card */}
          <ScrollReveal className="lg:col-span-5 w-full" delay={150}>
            <div className="glass-panel p-8 rounded-3xl border border-amber-500/20 flex flex-col gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="border-b border-border-color pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-amber-500 uppercase block mb-1">
                  Secure Inquiry
                </span>
                <h3 className="text-xl font-serif text-foreground tracking-wide font-light uppercase">Developer Contact</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Building size={14} />
                  </div>
                  <div>
                    <span className="text-muted text-[10px] font-mono uppercase block">Project Name</span>
                    <span className="text-foreground text-xs font-semibold">{contactInfo.developer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Building size={14} />
                  </div>
                  <div>
                    <span className="text-muted text-[10px] font-mono uppercase block">Authorized Coordinator</span>
                    <span className="text-foreground text-xs font-semibold">{contactInfo.contactPerson}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="text-muted text-[10px] font-mono uppercase block">Mobile Phone</span>
                    <div className="flex flex-col text-xs font-semibold text-foreground">
                      {contactInfo.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className="hover:text-amber-500 transition-colors">
                          +91 {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="text-muted text-[10px] font-mono uppercase block">Direct Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-foreground text-xs font-semibold hover:text-amber-500 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <a
                  href={`https://wa.me/91${contactInfo.phones[0]}?text=Hi,%20I%20am%20interested%20in%20Omm%20Sai%20Villa%20Phase-2`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-gradient text-black hover:scale-102 active:scale-98 text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-all font-sans text-center shadow-lg shadow-amber-500/10 cursor-pointer block"
                >
                  Connect on WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Interactive Floor Plans Section */}
        <section className="flex flex-col gap-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
              Architectural Schematics
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide font-light">
              Premium 3D Floor Plans
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light font-sans mt-3">
              Explore the detailed spatial layout renderings of Omm Sai Villa. Select a layout tab to view the high-resolution 3D blueprint, dimensions, and spatial configuration.
            </p>
          </ScrollReveal>

          {/* Plan Selector Tabs */}
          <ScrollReveal className="flex flex-wrap justify-center gap-2 border-b border-border-color pb-4">
            {floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlanTab(plan.id)}
                className={`px-5 py-3 text-xs font-mono tracking-wider transition-all duration-300 border-b-2 cursor-pointer ${
                  activePlanTab === plan.id
                    ? "border-amber-500 text-amber-500 bg-amber-500/5 font-semibold"
                    : "border-transparent text-muted hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {plan.name}
              </button>
            ))}
          </ScrollReveal>

          {/* Current Floor Plan Visualizer */}
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" delay={100}>
            
            {/* Specs & Layout Description list (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 rounded-2xl border border-border-color">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mb-1">
                    Dimensions Summary
                  </span>
                  <h3 className="text-xl font-serif text-foreground font-light">{currentPlan.name}</h3>
                  <div className="flex gap-4 mt-2 text-xs font-mono text-muted">
                    <span>Built-up: <strong className="text-foreground">{currentPlan.area}</strong></span>
                    <span>Facing: <strong className="text-foreground">{currentPlan.facing}</strong></span>
                  </div>
                  {currentPlan.road !== "N/A" && (
                    <div className="text-[10px] font-mono text-muted mt-1">
                      Access: <strong className="text-foreground">{currentPlan.road}</strong>
                    </div>
                  )}
                </div>

                <div className="border-t border-border-color/50 pt-4">
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mb-2">
                    Spatial Flow & Design
                  </span>
                  <p className="text-muted text-xs leading-relaxed font-sans font-light">
                    {currentPlan.description}
                  </p>
                </div>

                <div className="border-t border-border-color/50 pt-4">
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mb-3">
                    Detailed Specifications
                  </span>
                  <div className="flex flex-col gap-2.5 font-mono text-xs">
                    {currentPlan.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-border-color/30 last:border-0 text-muted">
                        <span className="flex items-center gap-2 text-foreground font-light">
                          <Check size={12} className="text-amber-500" />
                          {spec.room}
                        </span>
                        <span>{spec.dimensions}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border-color/50">
                <Link
                  href={`/book?property=Omm%20Sai%20Villa%20-${encodeURIComponent(currentPlan.name)}`}
                  className="w-full text-center bg-foreground/5 hover:bg-foreground/10 text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl border border-border-color hover:border-amber-500/30 text-foreground transition-all cursor-pointer block"
                >
                  Book Private Site Visit
                </Link>
              </div>
            </div>

            {/* 3D Floor Plan Rendering Viewport (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center glass-panel p-4 rounded-2xl border border-border-color relative overflow-hidden bg-foreground/[0.01] group">
              <div className="absolute inset-0 noise-overlay z-10 pointer-events-none" />
              
              {/* Compass Indicator */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1 font-mono text-[9px] text-muted bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border-color/50">
                <Compass size={18} className="text-amber-500 animate-pulse" />
                <span className="uppercase tracking-widest font-semibold">{currentPlan.facing}</span>
              </div>

              {/* Title inside viewport */}
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted/60 mb-4 ml-2 block z-20">
                High-Fidelity 3D Floor Plan Rendering
              </span>

              {/* Image Viewport Container */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full h-[400px] rounded-xl overflow-hidden cursor-zoom-in z-20 border border-border-color/50 transition-all duration-500 group-hover:border-amber-500/30"
              >
                <Image
                  src={currentPlan.image}
                  alt={currentPlan.name}
                  fill
                  className="object-contain p-2 transition-transform duration-750 group-hover:scale-103"
                  sizes="(max-w-7xl) 100vw, 800px"
                  priority
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <div className="bg-background/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-amber-500/30 text-amber-500 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize size={14} /> Click to View HD Layout
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Amenities Section */}
        <section className="flex flex-col gap-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
              Curated Luxuries
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide font-light">
              Premium Project Amenities
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light font-sans mt-3">
              Omm Sai Villa incorporates contemporary community facilities and custom independent services to elevate your security, accessibility, and luxury.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {amenities.map((amenity, idx) => (
              <ScrollReveal key={idx} delay={idx * 50} className="w-full">
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 shrink-0">
                    {amenity.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-foreground mb-1">
                      {amenity.name}
                    </h3>
                    <p className="text-muted text-xs leading-normal font-sans font-light">
                      {amenity.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Location & Key Distances Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Key Distances Column (7 cols) */}
          <ScrollReveal className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.3em] mb-2 block">
                Accessibility Roadmap
              </span>
              <h2 className="text-3xl font-serif text-foreground tracking-wide font-light">
                Key Distances & Connectivity
              </h2>
              <p className="text-muted text-xs md:text-sm font-sans font-light mt-3 leading-relaxed">
                Located near Delhi Public School (DPS Kalinga) in Amanpada, Phulnakhara. The enclave connects easily to key hubs across Bhubaneswar and Cuttack twin cities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distances.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 glass-panel rounded-xl border border-border-color">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 font-mono text-[9px] font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 flex justify-between items-center text-xs font-mono">
                    <span className="text-muted font-light truncate max-w-[180px]">{item.destination}</span>
                    <span className="text-amber-500 font-bold shrink-0">{item.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Interactive Map Column (5 cols) */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6" delay={150}>
            <div className="flex-1 min-h-[300px] relative rounded-3xl overflow-hidden border border-border-color shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=Amanpada,%20Near%20DPS%20Kalinga,%20Phulnakhara&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) invert(0.08) contrast(1.1)", minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Omm Sai Villa Location Map"
              ></iframe>
            </div>

            <div className="flex gap-3">
              <a
                href="https://share.google/F6gxsXy9KhpTmDwh5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-amber-500/10 hover:bg-amber-500 hover:text-black text-xs font-semibold uppercase tracking-wider py-4 rounded-xl border border-amber-500/20 text-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2 font-mono"
              >
                View on Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox / Modal for HD Floor Plan */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 transition-all duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="absolute top-4 right-4 z-50 flex gap-4">
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border-color hover:border-amber-500/30 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              title="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] flex flex-col justify-center items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-border-color bg-zinc-950 p-2 shadow-2xl animate-scale-up">
              <Image
                src={currentPlan.image}
                alt={currentPlan.name}
                fill
                className="object-contain"
                sizes="(max-w-6xl) 100vw, 1200px"
              />
            </div>
            
            <div className="text-center max-w-2xl px-4">
              <h4 className="text-xl font-serif text-[#faf9f6] tracking-wide uppercase">{currentPlan.name}</h4>
              <p className="text-amber-500 font-mono text-xs uppercase tracking-widest mt-1.5">
                {currentPlan.area} &bull; {currentPlan.facing} &bull; {currentPlan.road}
              </p>
              <p className="text-white/60 font-sans font-light text-xs mt-2 leading-relaxed">
                {currentPlan.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
