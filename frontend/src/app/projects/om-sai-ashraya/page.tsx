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
  layoutGrid: {
    name: string;
    colSpan: string;
    rowSpan: string;
    bg: string;
    dimensions: string;
  }[];
}

export default function OmSaiAshrayaDetail() {
  const [activePlanTab, setActivePlanTab] = useState("ground-east");

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
      id: "ground-east",
      name: "Ground Floor Plan",
      area: "800 SQFT",
      facing: "East Facing",
      road: "30'0\" Wide Road",
      specs: [
        { room: "Portico / Parking", dimensions: "17'0\" x 14'10\"" },
        { room: "Drawing / Dining Room", dimensions: "13'4\" x 12'10\"" },
        { room: "Bedroom", dimensions: "13'4\" x 10'0\"" },
        { room: "Toilet", dimensions: "5'0\" x 8'6\"" },
        { room: "Staircase", dimensions: "7'10\" x 9'4\"" }
      ],
      layoutGrid: [
        { name: "Portico / Parking", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-amber-500/10 border-amber-500/30", dimensions: "17'0\" x 14'10\"" },
        { name: "Drawing / Dining", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-blue-500/10 border-blue-500/30", dimensions: "13'4\" x 12'10\"" },
        { name: "Bedroom", colSpan: "col-span-2", rowSpan: "row-span-1", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "13'4\" x 10'0\"" },
        { name: "Toilet", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-rose-500/10 border-rose-500/30", dimensions: "5'0\" x 8'6\"" },
        { name: "Staircase", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-indigo-500/10 border-indigo-500/30", dimensions: "7'10\" x 9'4\"" }
      ]
    },
    {
      id: "first-east",
      name: "First Floor Plan",
      area: "914 SQFT",
      facing: "East Facing",
      road: "N/A",
      specs: [
        { room: "Drawing / Dining", dimensions: "10'8\" x 18'3\"" },
        { room: "Bedroom 1", dimensions: "11'0\" x 10'6\"" },
        { room: "Master Bedroom", dimensions: "11'0\" x 12'8\"" },
        { room: "Toilet 1", dimensions: "10'3\" x 4'0\"" },
        { room: "Toilet 2 (Master)", dimensions: "9'0\" x 4'3\"" },
        { room: "Kitchen", dimensions: "7'10\" x 9'8\"" },
        { room: "Puja Room", dimensions: "7'10\" x 3'6\"" },
        { room: "Balcony", dimensions: "10'8\" x 4'0\"" },
        { room: "Staircase", dimensions: "7'10\" x 12'10\"" }
      ],
      layoutGrid: [
        { name: "Drawing / Dining", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-blue-500/10 border-blue-500/30", dimensions: "10'8\" x 18'3\"" },
        { name: "Master Bedroom", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "11'0\" x 12'8\"" },
        { name: "Bedroom 1", colSpan: "col-span-1", rowSpan: "row-span-2", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "11'0\" x 10'6\"" },
        { name: "Kitchen", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-amber-500/10 border-amber-500/30", dimensions: "7'10\" x 9'8\"" },
        { name: "Balcony", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-indigo-500/10 border-indigo-500/30", dimensions: "10'8\" x 4'0\"" },
        { name: "Toilet 1", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-rose-500/10 border-rose-500/30", dimensions: "10'3\" x 4'0\"" },
        { name: "Toilet 2", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-rose-500/10 border-rose-500/30", dimensions: "9'0\" x 4'3\"" },
        { name: "Puja Room", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-yellow-500/10 border-yellow-500/30", dimensions: "7'10\" x 3'6\"" }
      ]
    },
    {
      id: "second-east",
      name: "Second Floor Plan",
      area: "650 SQFT",
      facing: "East Facing",
      road: "N/A",
      specs: [
        { room: "Family Lounge", dimensions: "10'3\" x 12'10\"" },
        { room: "Bedroom 1", dimensions: "11'0\" x 10'6\"" },
        { room: "Bedroom 2", dimensions: "11'0\" x 12'8\"" },
        { room: "Toilet", dimensions: "7'2\" x 4'3\"" },
        { room: "Open Terrace", dimensions: "19'0\" x 13'0\"" },
        { room: "Staircase", dimensions: "7'10\" x 12'10\"" }
      ],
      layoutGrid: [
        { name: "Open Terrace", colSpan: "col-span-3", rowSpan: "row-span-2", bg: "bg-teal-500/10 border-teal-500/30", dimensions: "19'0\" x 13'0\"" },
        { name: "Bedroom 2", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "11'0\" x 12'8\"" },
        { name: "Family Lounge", colSpan: "col-span-2", rowSpan: "row-span-1", bg: "bg-blue-500/10 border-blue-500/30", dimensions: "10'3\" x 12'10\"" },
        { name: "Bedroom 1", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "11'0\" x 10'6\"" },
        { name: "Toilet", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-rose-500/10 border-rose-500/30", dimensions: "7'2\" x 4'3\"" }
      ]
    },
    {
      id: "ground-south",
      name: "Ground Floor (South Facing)",
      area: "800 SQFT",
      facing: "South Facing (S-W)",
      road: "30'0\" Wide Road",
      specs: [
        { room: "Parking / Portico", dimensions: "16'0\" x 13'9\"" },
        { room: "Drawing / Dining Room", dimensions: "14'9\" x 10'0\"" },
        { room: "Bedroom", dimensions: "15'2\" x 10'0\"" },
        { room: "Toilet", dimensions: "9'0\" x 4'3\"" },
        { room: "Staircase", dimensions: "14'4\" x 7'10\"" }
      ],
      layoutGrid: [
        { name: "Parking / Portico", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-amber-500/10 border-amber-500/30", dimensions: "16'0\" x 13'9\"" },
        { name: "Bedroom", colSpan: "col-span-2", rowSpan: "row-span-2", bg: "bg-emerald-500/10 border-emerald-500/30", dimensions: "15'2\" x 10'0\"" },
        { name: "Drawing / Dining", colSpan: "col-span-2", rowSpan: "row-span-1", bg: "bg-blue-500/10 border-blue-500/30", dimensions: "14'9\" x 10'0\"" },
        { name: "Staircase", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-indigo-500/10 border-indigo-500/30", dimensions: "14'4\" x 7'10\"" },
        { name: "Toilet", colSpan: "col-span-1", rowSpan: "row-span-1", bg: "bg-rose-500/10 border-rose-500/30", dimensions: "9'0\" x 4'3\"" }
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
              Interactive Floor Plans
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light font-sans mt-3">
              Explore the G+2 structure dimensions. Select a plan to view its built-up area, room specifications, and orientation.
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
                {plan.name} ({plan.area})
              </button>
            ))}
          </ScrollReveal>

          {/* Current Floor Plan Visualizer */}
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" delay={100}>
            
            {/* Specs list (5 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between glass-panel p-6 rounded-2xl border border-border-color">
              <div>
                <div className="mb-6">
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

                <div className="flex flex-col gap-3 font-mono text-xs">
                  {currentPlan.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border-color last:border-0 text-muted">
                      <span className="flex items-center gap-2 text-foreground font-light">
                        <Check size={12} className="text-amber-500" />
                        {spec.room}
                      </span>
                      <span>{spec.dimensions}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border-color">
                <Link
                  href={`/book?property=Omm%20Sai%20Villa%20-${encodeURIComponent(currentPlan.name)}`}
                  className="w-full text-center bg-foreground/5 hover:bg-foreground/10 text-xs font-semibold uppercase tracking-wider py-3 rounded-xl border border-border-color hover:border-amber-500/30 text-foreground transition-all cursor-pointer block"
                >
                  Book Private Site Visit
                </Link>
              </div>
            </div>

            {/* Virtual Blueprint Grid (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-center glass-panel p-8 rounded-2xl border border-border-color min-h-[350px] relative overflow-hidden bg-foreground/[0.01]">
              <div className="absolute inset-0 noise-overlay z-10" />
              
              {/* Compass Indicator */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1 font-mono text-[9px] text-muted">
                <Compass size={22} className="text-amber-500 animate-pulse" />
                <span className="uppercase tracking-widest">{currentPlan.facing}</span>
              </div>

              {/* Title inside grid */}
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted/60 mb-6 block z-20">
                Visual Spatial Layout Blueprint (Not to Exact Scale)
              </span>

              {/* Blueprint Simulation */}
              <div className="grid grid-cols-4 gap-3 h-[300px] z-20">
                {currentPlan.layoutGrid.map((cell, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center text-center p-4 border rounded-xl transition-all duration-300 hover:scale-102 hover:bg-amber-500/15 ${cell.colSpan} ${cell.rowSpan} ${cell.bg}`}
                  >
                    <span className="font-serif text-foreground font-light text-sm tracking-wide leading-tight">
                      {cell.name}
                    </span>
                    <span className="font-mono text-muted text-[10px] mt-1.5 opacity-80">
                      {cell.dimensions}
                    </span>
                  </div>
                ))}
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
    </div>
  );
}
