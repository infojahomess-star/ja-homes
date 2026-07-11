"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Compass,
  Clock,
  Mail,
  Phone,
  User,
  X,
  CheckCircle2,
  AlertCircle,
  Video,
  Plane,
  MapPin,
  Map,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../context/AuthContext";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  tourType: string;
  property: string;
  config?: {
    cladding: string;
    flooring: string;
    amenity: string;
    totalPrice: string;
  } | null;
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const { token, user, apiBaseUrl } = useAuth();

  // Booking Form State
  const [selectedProperty, setSelectedProperty] = useState("The Alpine Crest");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [tourType, setTourType] = useState("In-Person Private Tour");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [bookedPass, setBookedPass] = useState<Booking | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Custom configuration parsed from URL
  const [customConfig, setCustomConfig] = useState<{
    cladding: string;
    flooring: string;
    amenity: string;
    totalPrice: string;
  } | null>(null);

  // Load user details if logged in
  useEffect(() => {
    if (user) {
      const frameId = requestAnimationFrame(() => {
        setFormData(prev => ({
          ...prev,
          name: user.name,
          email: user.email
        }));
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [user]);

  // Load bookings from API or local storage fallback
  const fetchBookings = useCallback(async () => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const emailQuery = !token && formData.email ? `?email=${encodeURIComponent(formData.email)}` : "";
      
      const res = await fetch(`${apiBaseUrl}/bookings${emailQuery}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setMyBookings(data);
        return;
      }
    } catch (e) {
      console.warn("Express backend offline, loading bookings from localStorage");
    }

    // Local Storage Fallback
    const saved = localStorage.getItem("ja_homes_bookings");
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch {
        setMyBookings([]);
      }
    }
  }, [token, formData.email, apiBaseUrl]);

  // Initialize and parse URL parameters
  useEffect(() => {
    const custom = searchParams.get("custom") === "true";
    const propertyParam = searchParams.get("property");
    const cladding = searchParams.get("cladding") || "Standard";
    const flooring = searchParams.get("flooring") || "Standard";
    const amenity = searchParams.get("amenity") || "Standard";
    const totalPrice = searchParams.get("price") || "12,500,000";

    const frameId = requestAnimationFrame(() => {
      if (custom) {
        setSelectedProperty("Custom Configured Estate");
        setCustomConfig({
          cladding,
          flooring,
          amenity,
          totalPrice
        });
      } else if (propertyParam) {
        setSelectedProperty(propertyParam);
      }
      fetchBookings();
    });
    return () => cancelAnimationFrame(frameId);
  }, [searchParams, fetchBookings]);

  // Fetch bookings on email change (for guests to load passes)
  useEffect(() => {
    if (!token && formData.email) {
      const frameId = requestAnimationFrame(() => {
        fetchBookings();
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [formData.email, token, fetchBookings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!formData.name || !formData.email || !formData.phone || !bookingDate) {
      setFormFeedback({ type: "error", text: "Please fill out all required fields." });
      return;
    }

    const isCustom = selectedProperty === "Custom Configured Estate";
    const bookingPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: bookingDate,
      timeSlot: bookingTime,
      tourType: tourType,
      property: selectedProperty,
      config: isCustom ? customConfig : null
    };

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: "POST",
        headers,
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        const newBooking = await response.json();
        setBookedPass(newBooking);
        setFormFeedback({ type: "success", text: "Appointment securely scheduled!" });
        
        const savedBookings = JSON.parse(localStorage.getItem("ja_homes_bookings") || "[]");
        localStorage.setItem("ja_homes_bookings", JSON.stringify([newBooking, ...savedBookings]));
        
        fetchBookings();
        setBookingDate("");
        window.dispatchEvent(new Event("storage"));
        return;
      }
    } catch (error) {
      console.warn("Express backend offline, scheduling booking locally");
    }

    // Local Storage Fallback Booking
    const newLocalBooking: Booking = {
      id: "JAH-" + Math.floor(100000 + Math.random() * 900000),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: bookingDate,
      timeSlot: bookingTime,
      tourType: tourType,
      property: selectedProperty,
      config: isCustom ? customConfig : null
    };

    const updated = [newLocalBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem("ja_homes_bookings", JSON.stringify(updated));
    setBookedPass(newLocalBooking);
    setFormFeedback({ type: "success", text: "Scheduled locally (Backend server offline)." });
    setBookingDate("");
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/bookings/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        if (bookedPass?.id === id) {
          setBookedPass(null);
        }
        
        const saved = JSON.parse(localStorage.getItem("ja_homes_bookings") || "[]");
        const filtered = saved.filter((b: Booking) => b.id !== id);
        localStorage.setItem("ja_homes_bookings", JSON.stringify(filtered));

        fetchBookings();
        window.dispatchEvent(new Event("storage"));
        return;
      }
    } catch (e) {
      console.warn("Express backend offline, deleting booking locally");
    }

    // Local delete
    const filteredLocal = myBookings.filter(b => b.id !== id);
    setMyBookings(filteredLocal);
    localStorage.setItem("ja_homes_bookings", JSON.stringify(filteredLocal));
    if (bookedPass?.id === id) {
      setBookedPass(null);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Laser scan keyframe animation for barcodes */}
      <style>{`
        @keyframes laser-scan {
          0% { top: 0%; opacity: 0.3; }
          50% { top: 100%; opacity: 0.9; }
          100% { top: 0%; opacity: 0.3; }
        }
        @keyframes glow-drift-slow {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          50% { transform: translate(-45%, -55%) scale(1.1) rotate(180deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); }
        }
        .laser-scanning-line {
          animation: laser-scan 3s ease-in-out infinite;
        }
        .floating-glow-bg {
          animation: glow-drift-slow 20s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glow elements */}
      <div className="absolute top-10 left-10 -z-10 w-[400px] h-[400px] bg-amber-500/[0.03] blur-[140px] rounded-full floating-glow-bg pointer-events-none" />
      <div className="absolute bottom-20 right-10 -z-10 w-[500px] h-[500px] bg-amber-500/[0.025] blur-[150px] rounded-full floating-glow-bg pointer-events-none" />

      {/* Header Intro Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out translate-y-0 opacity-100">
        <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
          Consultation & Viewing
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light mb-6">
          Book Your Consultation
        </h1>
        <div className="flex flex-col gap-4 text-foreground/80 text-sm md:text-base leading-relaxed font-sans font-light">
          <p>
            Schedule an exclusive viewing session with our principal design architects. Configure structural footprints, preview biophilic floorplans, and secure private tours.
          </p>
          <div className="flex items-center gap-2 justify-center text-xs border border-border-color bg-foreground/[0.02] dark:bg-white/[0.01] p-3 rounded-2xl max-w-lg mx-auto mt-2">
            <Sparkles size={13} className="text-amber-500 shrink-0" />
            <span className="text-foreground/70">Fill out the fields to instantly generate your encrypted VIP Viewing Pass.</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        
        {/* Left Side: Contact details & VIP Pass */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Direct Concierge Block */}
          <div className="glass-panel p-6 rounded-2xl border border-border-color relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-mono tracking-wider uppercase text-foreground mb-4 flex items-center gap-2">
              <Compass size={16} className="text-amber-500" />
              Direct Concierge
            </h3>
            <div className="flex flex-col gap-4 text-xs font-mono text-foreground/80">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-amber-500" />
                <a href="mailto:info.jahomess@gmail.com" className="hover:text-amber-500 transition-colors duration-300">info.jahomess@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-amber-500" />
                <a href="tel:+919811086206" className="hover:text-amber-500 transition-colors duration-300">+91 98110 86206</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-amber-500" />
                <a href="tel:+919348402331" className="hover:text-amber-500 transition-colors duration-300">+91 93484 02331</a>
              </div>
            </div>
          </div>

          {/* Configuration alert if active */}
          {selectedProperty === "Custom Configured Estate" && customConfig && (
            <div className="bg-amber-500/[0.04] border border-amber-500/25 p-5 rounded-2xl text-xs flex gap-3 animate-fade-in-up">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <div>
                <span className="text-amber-550 dark:text-amber-300 font-bold block mb-1">Custom Specs Active</span>
                <p className="text-foreground/70 leading-relaxed font-sans font-light">
                  You are booking a viewing for a custom blueprint costing ${customConfig.totalPrice}. 
                  Specs loaded: Cladding ({customConfig.cladding}), Flooring ({customConfig.flooring}), Amenity ({customConfig.amenity}).
                </p>
              </div>
            </div>
          )}

          {/* Booked Pass rendering styled like a luxury ticket */}
          {bookedPass && (
            <div className="bg-gradient-to-br from-amber-500/[0.08] via-foreground/[0.03] to-amber-500/[0.04] p-6 rounded-3xl border border-amber-500/30 relative overflow-hidden animate-fade-in-up shadow-xl shadow-amber-500/[0.02]">
              {/* Ticket Punch Notches */}
              <div className="absolute top-1/2 -left-3.5 w-7 h-7 rounded-full bg-background border-r border-amber-500/30 z-20 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3.5 w-7 h-7 rounded-full bg-background border-l border-amber-500/30 z-20 -translate-y-1/2" />
              
              {/* Gold dash border separator */}
              <div className="absolute top-1/2 left-4 right-4 h-px border-t border-dashed border-amber-500/30 -translate-y-1/2 z-10" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Upper Ticket half */}
              <div className="pb-16 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    VIP Viewing Pass
                  </span>
                  <span className="text-[10px] font-mono text-foreground/50">{bookedPass.id}</span>
                </div>

                <div className="flex flex-col gap-2.5 text-xs font-mono text-foreground/80">
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Attendee:</span>
                    <span className="font-semibold text-foreground">{bookedPass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Residence:</span>
                    <span className="font-serif font-semibold text-foreground">{bookedPass.property}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Tour Format:</span>
                    <span className="text-foreground">{bookedPass.tourType}</span>
                  </div>
                </div>
              </div>

              {/* Lower Ticket half */}
              <div className="pt-16 flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-xs font-mono text-foreground/80">
                  <div className="flex justify-between items-center bg-amber-500/5 border border-amber-500/10 px-3 py-1.5 rounded-xl">
                    <span className="text-foreground/50">Date & Window:</span>
                    <span className="text-amber-600 dark:text-amber-300 font-bold">{bookedPass.date} ({bookedPass.timeSlot})</span>
                  </div>
                  {bookedPass.config && (
                    <div className="pt-2 text-[10px] text-foreground/70">
                      <span className="text-amber-550 dark:text-amber-300 uppercase block mb-1 font-bold">Custom Specs:</span>
                      Cladding: {bookedPass.config.cladding} | Flooring: {bookedPass.config.flooring} | Est. Value: ${bookedPass.config.totalPrice}
                    </div>
                  )}
                </div>

                {/* Animated Barcode with Laser Scan */}
                <div className="flex flex-col items-center gap-2 mt-2">
                  <div className="w-full h-10 bg-foreground/[0.04] dark:bg-white/[0.02] rounded-lg relative overflow-hidden flex items-center justify-center opacity-75 border border-foreground/10">
                    {/* Laser scanning line */}
                    <div className="absolute left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_8px_#f59e0b] z-20 laser-scanning-line" />
                    
                    <div className="w-11/12 h-6 flex justify-around items-center">
                      {[5, 2, 8, 1, 4, 7, 2, 9, 3, 4, 6, 8, 1, 5, 2, 9, 5, 8, 3, 2, 9].map((val, idx) => (
                        <div
                          key={idx}
                          className="bg-foreground/80 dark:bg-white/80"
                          style={{
                            width: `${(val % 3) + 1.2}px`,
                            height: "100%",
                            opacity: val % 2 === 0 ? 0.95 : 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[7px] font-mono tracking-widest text-foreground/50 uppercase">
                    Encrypted VIP Concierge Barcode
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Right Side: Booking Form Container */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel p-8 rounded-2xl border border-border-color shadow-xl relative overflow-hidden">
            
            {formFeedback && (
              <div
                className={`flex items-start gap-2.5 p-4 rounded-xl text-xs mb-6 transition-all duration-300 ${
                  formFeedback.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                }`}
              >
                {formFeedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span className="leading-normal font-medium">{formFeedback.text}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
              
              {/* Property Select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="property-select" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  Select Estate
                </label>
                <select
                  id="property-select"
                  value={selectedProperty}
                  onChange={(e) => {
                    setSelectedProperty(e.target.value);
                    if (e.target.value !== "Custom Configured Estate") {
                      setCustomConfig(null);
                    }
                  }}
                  className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3.5 text-sm text-foreground transition-all duration-300 outline-none cursor-pointer"
                >
                  <option value="The Alpine Crest" className="bg-background text-foreground">The Alpine Crest — Aspen ($14.8M)</option>
                  <option value="The Azure Cove" className="bg-background text-foreground">The Azure Cove — Malibu ($18.5M)</option>
                  <option value="The Zenith Penthouse" className="bg-background text-foreground">The Zenith Penthouse — Manhattan ($12.2M)</option>
                  <option value="Custom Configured Estate" className="bg-background text-foreground">Custom Configured Estate (From co-design dashboard)</option>
                </select>
              </div>

              {/* Date & Time Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date-input" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date-input"
                    name="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-foreground transition-all duration-300 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="time-select" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                    Time Window
                  </label>
                  <select
                    id="time-select"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-foreground transition-all duration-300 outline-none cursor-pointer"
                  >
                    <option value="10:00 AM" className="bg-background text-foreground">Morning (10:00 AM)</option>
                    <option value="01:00 PM" className="bg-background text-foreground">Midday (01:00 PM)</option>
                    <option value="04:00 PM" className="bg-background text-foreground">Golden Hour (04:00 PM)</option>
                    <option value="07:00 PM" className="bg-background text-foreground">Dusk (07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Viewing Format Buttons */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  Viewing Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "In-Person Private Tour", icon: MapPin },
                    { label: "Virtual Guided Tour", icon: Video },
                    { label: "Drone Flyover Tour", icon: Plane }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = tourType === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setTourType(item.label)}
                        className={`py-3.5 px-4 rounded-xl border text-[10px] font-semibold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? "border-amber-500 bg-amber-500/10 text-amber-505 dark:text-amber-300 shadow-md shadow-amber-500/5 scale-[1.02]"
                            : "border-border-color bg-foreground/[0.02] dark:bg-white/[0.01] hover:border-foreground/20 text-foreground/75 hover:scale-[1.01]"
                        }`}
                      >
                        <Icon size={12} className={isActive ? "text-amber-500 animate-pulse" : "text-foreground/50"} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-border-color my-2" />

              {/* Client Info details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-foreground/45" size={14} />
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      required
                      placeholder="Lord/Lady Sterling"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl pl-9 pr-4 py-3.5 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-foreground/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email-input" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-foreground/45" size={14} />
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      required
                      placeholder="client@sanctuary.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl pl-9 pr-4 py-3.5 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-foreground/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone-input" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                    Phone Contact *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-foreground/45" size={14} />
                    <input
                      type="tel"
                      id="phone-input"
                      name="phone"
                      required
                      placeholder="+91 98110 86206"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl pl-9 pr-4 py-3.5 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-foreground/30"
                    />
                  </div>
                </div>
              </div>

              {/* Special Arrangements input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message-input" className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  Special Arrangements
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={3}
                  placeholder="Specify confidential arrangements, security requirements, or helipad access request details..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-foreground/[0.02] dark:bg-white/[0.01] border border-foreground/10 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-foreground/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2 hover:shadow-amber-500/20 group/btn"
                id="submit-booking-button"
              >
                Submit Booking Request
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bookings Passes Deck */}
      {myBookings.length > 0 && (
        <section id="bookings-dashboard" className="pt-16 border-t border-border-color">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block mb-2">
                Reservation Deck
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-wide font-light">
                My Active Viewing Passes
              </h2>
            </div>
            <span className="self-start text-[10px] text-foreground/60 font-mono bg-foreground/[0.02] border border-border-color px-3 py-1.5 rounded-full tracking-wider uppercase">
              Synchronized Encrypted Passes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-br from-amber-500/[0.02] via-foreground/[0.01] to-amber-500/[0.03] p-6 rounded-3xl border border-amber-500/10 hover:border-amber-500/20 flex flex-col justify-between relative overflow-hidden group/deck transition-all duration-500 shadow-md shadow-black/5"
                id={`booking-pass-${booking.id}`}
              >
                {/* Micro ticket notch circles */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-background border-r border-amber-500/15 z-10 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-background border-l border-amber-500/15 z-10 -translate-y-1/2" />

                <div>
                  <div className="flex justify-between items-start border-b border-border-color pb-3 mb-4">
                    <div>
                      <span className="text-sm font-serif text-foreground font-semibold block uppercase tracking-wide">
                        {booking.property}
                      </span>
                      <span className="text-[9px] font-mono text-foreground/50">{booking.id}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="text-foreground/40 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Cancel Appointment"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 text-xs font-mono text-foreground/80 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500/70">Date:</span>
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500/70">Window:</span>
                      <span>{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500/70">Format:</span>
                      <span>{booking.tourType}</span>
                    </div>
                    {booking.config && (
                      <div className="mt-3 pt-3 border-t border-border-color text-[10px] text-foreground/60 leading-normal">
                        <span className="text-amber-600 dark:text-amber-300 block mb-0.5 uppercase tracking-wide font-bold">Specs:</span>
                        Env: {booking.config.cladding} | Floor: {booking.config.flooring} | Est. Value: ${booking.config.totalPrice}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono bg-foreground/[0.02] p-2.5 rounded-xl border border-border-color">
                  <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                    <CheckCircle2 size={12} className="animate-pulse" />
                    Confirmed Pass
                  </span>
                  <span className="text-foreground/45">Concierge Desk</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function Booking() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Shared Header Navigation */}
      <Header />

      {/* Spacer */}
      <div className="h-28" />

      {/* Content wrapper with Suspense */}
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <span className="text-sm font-mono text-muted uppercase animate-pulse">
              Loading concierge desk...
            </span>
          </div>
        }
      >
        <BookingPageContent />
      </Suspense>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
