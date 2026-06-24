"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Mail,
  Layers,
  Hammer,
  Waves,
  Clock,
  Check,
  ArrowRight,
  Download,
  AlertCircle
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Property {
  id: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  image: string;
  tag: string;
  progress: number;
  status: string;
}

interface ConfigOption {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export default function Projects() {
  const router = useRouter();

  // Configurator State
  const [selectedCladding, setSelectedCladding] = useState("slate");
  const [selectedFlooring, setSelectedFlooring] = useState("concrete");
  const [selectedAmenity, setSelectedAmenity] = useState("pool");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Properties Data
  const properties: Property[] = [
    {
      id: "alpine-crest",
      title: "The Alpine Crest",
      price: "$14,800,000",
      beds: 5,
      baths: 6,
      sqft: 8200,
      location: "Aspen, Colorado",
      image: "/alpine_crest.jpg",
      tag: "Signature Mountain",
      progress: 100,
      status: "Fully Completed & Commissioned"
    },
    {
      id: "azure-cove",
      title: "The Azure Cove",
      price: "$18,500,000",
      beds: 6,
      baths: 7,
      sqft: 9500,
      location: "Malibu, California",
      image: "/azure_cove.png",
      tag: "Coastal Oceanfront",
      progress: 85,
      status: "Envelope Glazing & Finishes"
    },
    {
      id: "zenith-penthouse",
      title: "The Zenith Penthouse",
      price: "$12,200,000",
      beds: 4,
      baths: 4.5,
      sqft: 6100,
      location: "Manhattan, New York",
      image: "/zenith_penthouse.png",
      tag: "City Skyline",
      progress: 60,
      status: "Interior Framing & HVAC"
    }
  ];

  // Config Options
  const claddingOptions: ConfigOption[] = [
    { id: "slate", name: "Obsidian Slate", price: 0, desc: "Textured charcoal natural stone cladding" },
    { id: "teak", name: "Honduran Teak Wood", price: 150000, desc: "Weather-resistant warm hardwood siding" },
    { id: "marble", name: "Bianco Carrara Marble", price: 350000, desc: "Premium polished Italian stone slab paneling" }
  ];

  const flooringOptions: ConfigOption[] = [
    { id: "concrete", name: "Polished Concrete", price: 0, desc: "Industrial raw concrete finish with micro-gloss" },
    { id: "oak", name: "Smoked European Oak", price: 90000, desc: "Wide-plank brushed hardwood with dark stain" },
    { id: "travertine", name: "Tumbled Travertine", price: 180000, desc: "Natural warm beige stone tiles imported from Italy" }
  ];

  const amenityOptions: ConfigOption[] = [
    { id: "pool", name: "Infinity Edge Plunge Pool", price: 250000, desc: "Heated saltwater pool overlooking vistas" },
    { id: "spa", name: "Glass Wellness Spa & Sauna", price: 180000, desc: "Hemlock dry sauna and aromatherapy steam room" },
    { id: "garage", name: "4-Car Elevator Garage", price: 420000, desc: "Hydraulic automated basement vehicle lift" }
  ];

  const getSelectedCladdingObj = () => claddingOptions.find(o => o.id === selectedCladding)!;
  const getSelectedFlooringObj = () => flooringOptions.find(o => o.id === selectedFlooring)!;
  const getSelectedAmenityObj = () => amenityOptions.find(o => o.id === selectedAmenity)!;

  const getBasePrice = () => 12500000;
  const getTotalPrice = () => {
    return getBasePrice() + getSelectedCladdingObj().price + getSelectedFlooringObj().price + getSelectedAmenityObj().price;
  };
  const getBuildTime = () => {
    let baseTime = 14;
    if (selectedCladding === "marble") baseTime += 2;
    if (selectedFlooring === "travertine") baseTime += 1;
    if (selectedAmenity === "garage") baseTime += 2;
    return baseTime;
  };

  const handleApplyConfig = () => {
    const query = new URLSearchParams({
      custom: "true",
      cladding: getSelectedCladdingObj().name,
      flooring: getSelectedFlooringObj().name,
      amenity: getSelectedAmenityObj().name,
      price: getTotalPrice().toLocaleString()
    }).toString();
    router.push(`/book?${query}`);
  };

  const handleScheduleViewing = (propertyName: string) => {
    router.push(`/book?property=${encodeURIComponent(propertyName)}`);
  };

  const handleDownloadBlueprints = (propertyName: string) => {
    setDownloadSuccess(propertyName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Hero Header spacer */}
      <div className="h-28" />

      {/* Main projects grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
            Signature Enclaves
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light mb-6">
            Luxury Real Estate Projects
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
            Explore our architectural achievements across diverse natural landscapes. 
            Review progress logs, download site blueprint drafts, or co-design a custom build below.
          </p>
        </div>

        {/* Download blueprint Success Banner */}
        {downloadSuccess && (
          <div className="max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-400 mb-8 flex items-center gap-3 animate-fade-in-up">
            <Check className="shrink-0" size={16} />
            <div>
              <span className="font-bold block">Blueprint Download Initialized</span>
              <span>Encrypted PDF schemas for {downloadSuccess} have been prepared.</span>
            </div>
          </div>
        )}

        {/* Listings Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {properties.map((property) => (
            <div
              key={property.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
              id={`project-card-${property.id}`}
            >
              {/* Image Container */}
              <div className="relative h-72 md:h-80 overflow-hidden group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="glass-panel-light text-[10px] text-amber-300 font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-amber-500/10">
                    {property.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-serif text-foreground font-light tracking-wide">
                    {property.price}
                  </span>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-serif text-foreground tracking-wide font-light">
                    {property.title}
                  </h2>
                  <div className="flex items-center gap-1 text-muted text-xs font-sans">
                    <MapPin size={12} className="text-amber-500" />
                    <span>{property.location.split(",")[0]}</span>
                  </div>
                </div>

                <p className="text-muted text-xs md:text-sm font-light font-sans mb-6 flex-1">
                  Features custom environmental automation, high-performance triple-glazed panels, private wellness facilities, and sustainable timber architectures.
                </p>

                {/* Progress bar for construction stage */}
                <div className="mb-6 flex flex-col gap-2 font-mono text-[10px] text-muted">
                  <div className="flex justify-between items-center">
                    <span>Stage: {property.status}</span>
                    <span className="text-amber-500 font-bold">{property.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-gradient transition-all duration-1000"
                      style={{ width: `${property.progress}%` }}
                    />
                  </div>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border-color text-xs font-mono text-muted mb-6">
                  <div className="flex flex-col items-center gap-1">
                    <Bed size={14} className="text-amber-500/80" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-r border-border-color">
                    <Bath size={14} className="text-amber-500/80" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Maximize size={14} className="text-amber-500/80" />
                    <span>{property.sqft.toLocaleString()} SqFt</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleScheduleViewing(property.title)}
                    className="flex-1 text-center bg-foreground/5 hover:bg-foreground/10 text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl border border-border-color hover:border-amber-500/30 text-foreground transition-all cursor-pointer"
                  >
                    Schedule Tour
                  </button>
                  <button
                    onClick={() => handleDownloadBlueprints(property.title)}
                    className="p-3 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/20 text-amber-400 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    title="Download Blueprints"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Sanctuary Configurator Section */}
        <section id="configurator" className="border-t border-border-color pt-24 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
              Co-Design Console
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide font-light mb-6">
              Design Your Own Sanctuary
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
              Interact with our materials configurator to build a custom estimate. Apply your specs directly to book a private briefing session.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Options grid (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Cladding */}
              <div className="glass-panel p-6 rounded-2xl border border-border-color">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Layers size={14} />
                  </span>
                  <div>
                    <h3 className="text-sm font-mono tracking-wider uppercase text-foreground">1. Exterior Envelope</h3>
                    <p className="text-xs text-muted">Select structural outer finish and envelope cladding</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {claddingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedCladding(opt.id)}
                      className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedCladding === opt.id
                          ? "border-amber-500 bg-amber-500/5"
                          : "border-border-color bg-foreground/2 hover:border-border-color/80"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-foreground">{opt.name}</span>
                        {selectedCladding === opt.id && <Check size={14} className="text-amber-500" />}
                      </div>
                      <p className="text-xs text-muted leading-normal mb-3 font-light font-sans">{opt.desc}</p>
                      <span className="text-xs font-mono text-amber-500">
                        {opt.price === 0 ? "Standard Finish" : `+ $${opt.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flooring */}
              <div className="glass-panel p-6 rounded-2xl border border-border-color">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Hammer size={14} />
                  </span>
                  <div>
                    <h3 className="text-sm font-mono tracking-wider uppercase text-foreground">2. Living Flooring</h3>
                    <p className="text-xs text-muted">Select premium timber planks or travertine stone slabs</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {flooringOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedFlooring(opt.id)}
                      className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedFlooring === opt.id
                          ? "border-amber-500 bg-amber-500/5"
                          : "border-border-color bg-foreground/2 hover:border-border-color/80"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-foreground">{opt.name}</span>
                        {selectedFlooring === opt.id && <Check size={14} className="text-amber-500" />}
                      </div>
                      <p className="text-xs text-muted leading-normal mb-3 font-light font-sans">{opt.desc}</p>
                      <span className="text-xs font-mono text-amber-500">
                        {opt.price === 0 ? "Standard Finish" : `+ $${opt.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenity */}
              <div className="glass-panel p-6 rounded-2xl border border-border-color">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Waves size={14} />
                  </span>
                  <div>
                    <h3 className="text-sm font-mono tracking-wider uppercase text-foreground">3. Signature Amenity</h3>
                    <p className="text-xs text-muted">Add custom-engineered high-end installations</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {amenityOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedAmenity(opt.id)}
                      className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedAmenity === opt.id
                          ? "border-amber-500 bg-amber-500/5"
                          : "border-border-color bg-foreground/2 hover:border-border-color/80"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-foreground">{opt.name}</span>
                        {selectedAmenity === opt.id && <Check size={14} className="text-amber-500" />}
                      </div>
                      <p className="text-xs text-muted leading-normal mb-3 font-light font-sans">{opt.desc}</p>
                      <span className="text-xs font-mono text-amber-500">
                        {`+ $${opt.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Invoice Sidebar (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 flex flex-col gap-6 shadow-xl">
                <div className="border-b border-border-color pb-4">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-muted uppercase block mb-1">
                    Custom Quotation
                  </span>
                  <h3 className="text-xl font-serif text-foreground tracking-wide">Sanctuary Summary</h3>
                </div>

                <div className="flex flex-col gap-4 text-xs font-mono">
                  <div className="flex justify-between items-center text-muted">
                    <span>Base Blueprint Design</span>
                    <span className="text-foreground">${getBasePrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted">
                    <span className="max-w-[180px] truncate">Cladding: {getSelectedCladdingObj().name}</span>
                    <span className="text-foreground">
                      {getSelectedCladdingObj().price === 0
                        ? "Included"
                        : `+$${getSelectedCladdingObj().price.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-muted">
                    <span className="max-w-[180px] truncate">Flooring: {getSelectedFlooringObj().name}</span>
                    <span className="text-foreground">
                      {getSelectedFlooringObj().price === 0
                        ? "Included"
                        : `+$${getSelectedFlooringObj().price.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-muted pb-4 border-b border-border-color">
                    <span className="max-w-[180px] truncate">Amenity: {getSelectedAmenityObj().name}</span>
                    <span className="text-foreground">
                      +${getSelectedAmenityObj().price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted py-1">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-amber-500" />
                      Est. Build Duration
                    </span>
                    <span className="text-foreground font-bold">{getBuildTime()} Months</span>
                  </div>
                </div>

                <div className="bg-foreground/5 p-4 rounded-xl border border-border-color flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">
                    Estimated Total Investment
                  </span>
                  <span className="text-3xl font-serif text-gold font-light tracking-wide">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleApplyConfig}
                    className="w-full bg-gold-gradient text-black hover:scale-102 active:scale-98 text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-all font-sans text-center shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    Apply to Private Tour <ArrowRight size={12} className="inline ml-1" />
                  </button>
                  <p className="text-[9px] text-muted text-center leading-normal">
                    Pricing includes luxury logistics and landscape architecture. All material contracts are lock-in guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
