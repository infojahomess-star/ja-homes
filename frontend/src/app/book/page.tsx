"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Compass,
  Clock,
  Mail,
  Phone,
  User,
  X,
  CheckCircle2,
  AlertCircle
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
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  // Load bookings from API or local storage fallback
  const fetchBookings = async () => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // If user is not logged in but has local email, check by query param
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
  };

  // Initialize and parse URL parameters
  useEffect(() => {
    const custom = searchParams.get("custom") === "true";
    const propertyParam = searchParams.get("property");

    if (custom) {
      setSelectedProperty("Custom Configured Estate");
      setCustomConfig({
        cladding: searchParams.get("cladding") || "Standard",
        flooring: searchParams.get("flooring") || "Standard",
        amenity: searchParams.get("amenity") || "Standard",
        totalPrice: searchParams.get("price") || "12,500,000"
      });
    } else if (propertyParam) {
      setSelectedProperty(propertyParam);
    }

    fetchBookings();
  }, [searchParams, token, apiBaseUrl]);

  // Fetch bookings on email change (for guests to load passes)
  useEffect(() => {
    if (!token && formData.email) {
      fetchBookings();
    }
  }, [formData.email]);

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
        
        // Sync local storage as well for backup
        const savedBookings = JSON.parse(localStorage.getItem("ja_homes_bookings") || "[]");
        localStorage.setItem("ja_homes_bookings", JSON.stringify([newBooking, ...savedBookings]));
        
        fetchBookings();

        // Reset fields
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
        
        // Update local storage backup
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
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
          Concierge Desk
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light mb-6">
          Schedule Private Viewing
        </h1>
        <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
          Complete the form below to lock in a private tour appointment. You will receive an encrypted VIP viewing pass stored in your local profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Contact info and Pass render (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-border-color">
            <h3 className="text-sm font-mono tracking-wider uppercase text-foreground mb-4">Direct Contact</h3>
            <div className="flex flex-col gap-4 text-xs font-mono text-muted">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber-500" />
                <span>concierge@jahomes.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500" />
                <span>+1 (800) 888-9999</span>
              </div>
            </div>
          </div>

          {/* Configuration alert if active */}
          {selectedProperty === "Custom Configured Estate" && customConfig && (
            <div className="bg-amber-500/5 border border-amber-500/25 p-5 rounded-2xl text-xs flex gap-3">
              <AlertCircle className="text-amber-500 shrink-0" size={16} />
              <div>
                <span className="text-amber-300 font-bold block mb-1">Custom Specs Active</span>
                <p className="text-muted leading-relaxed font-sans font-light">
                  You are booking a viewing for a custom blueprint costing ${customConfig.totalPrice}. 
                  Specs loaded: Cladding ({customConfig.cladding}), Flooring ({customConfig.flooring}), Amenity ({customConfig.amenity}).
                </p>
              </div>
            </div>
          )}

          {/* Booked Pass rendering */}
          {bookedPass && (
            <div className="bg-foreground/2 p-6 rounded-2xl border-2 border-dashed border-amber-500/30 relative overflow-hidden animate-fade-in-up">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-border-color pb-3 mb-4">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                  VIP Viewing Pass
                </span>
                <span className="text-[10px] font-mono text-muted">{bookedPass.id}</span>
              </div>

              <div className="flex flex-col gap-2.5 text-xs font-mono text-foreground/90">
                <div className="flex justify-between">
                  <span className="text-muted">Attendee:</span>
                  <span className="font-semibold">{bookedPass.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Residence:</span>
                  <span className="font-serif font-semibold">{bookedPass.property}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Scheduled Date:</span>
                  <span className="text-amber-550 dark:text-amber-300 font-bold">{bookedPass.date} ({bookedPass.timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tour Format:</span>
                  <span>{bookedPass.tourType}</span>
                </div>
                {bookedPass.config && (
                  <div className="mt-3 pt-3 border-t border-border-color text-[10px]">
                    <span className="text-amber-550 dark:text-amber-300 uppercase block mb-1 font-bold">Custom Config:</span>
                    <div className="text-muted leading-normal">
                      Cladding: {bookedPass.config.cladding} <br />
                      Flooring: {bookedPass.config.flooring} <br />
                      Amenity: {bookedPass.config.amenity} <br />
                      Est. Value: ${bookedPass.config.totalPrice}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border-color flex flex-col items-center gap-1.5">
                <div className="w-full h-8 bg-foreground/5 rounded relative overflow-hidden flex items-center justify-center opacity-65">
                  <div className="w-11/12 h-6 flex justify-around items-center">
                    {[4, 2, 8, 1, 3, 7, 2, 9, 4, 3, 5, 8, 1, 6, 2, 7, 5, 9, 3, 1, 8].map((val, idx) => (
                      <div
                        key={idx}
                        className="bg-foreground/70"
                        style={{
                          width: `${(val % 3) + 1}px`,
                          height: "100%",
                          opacity: val % 2 === 0 ? 0.9 : 0.4
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[8px] font-mono tracking-widest text-muted">
                  SECURE QR ENCRYPTED PASS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Booking Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-2xl border border-border-color shadow-xl">
            {formFeedback && (
              <div
                className={`flex items-start gap-2.5 p-4 rounded-xl text-xs mb-6 ${
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
              <div className="flex flex-col gap-2">
                <label htmlFor="property-select" className="text-xs font-mono uppercase tracking-wider text-muted">
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
                  className="gold-input rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="The Alpine Crest">The Alpine Crest — Aspen ($14.8M)</option>
                  <option value="The Azure Cove">The Azure Cove — Malibu ($18.5M)</option>
                  <option value="The Zenith Penthouse">The Zenith Penthouse — Manhattan ($12.2M)</option>
                  <option value="Custom Configured Estate">Custom Configured Estate (From co-design dashboard)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date-input"
                    name="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="gold-input rounded-xl px-4 py-3 text-sm w-full focus:border-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="time-select" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Time Window
                  </label>
                  <select
                    id="time-select"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="gold-input rounded-xl px-4 py-3 text-sm w-full focus:border-amber-500"
                  >
                    <option value="10:00 AM">Morning (10:00 AM)</option>
                    <option value="01:00 PM">Midday (01:00 PM)</option>
                    <option value="04:00 PM">Golden Hour (04:00 PM)</option>
                    <option value="07:00 PM">Dusk (07:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted">
                  Viewing Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["In-Person Private Tour", "Virtual Guided Tour", "Drone Flyover Tour"].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setTourType(format)}
                      className={`py-3 rounded-xl border text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                        tourType === format
                          ? "border-amber-500 bg-amber-500/10 text-amber-505 dark:text-amber-300"
                          : "border-border-color bg-foreground/2 hover:border-border-color/80 text-muted"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border-color my-2" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-subtle" size={14} />
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      required
                      placeholder="Lord/Lady Sterling"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-subtle" size={14} />
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      required
                      placeholder="client@sanctuary.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Phone Contact *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-subtle" size={14} />
                    <input
                      type="tel"
                      id="phone-input"
                      name="phone"
                      required
                      placeholder="+1 (555) 0199"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                  Special Arrangements
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={3}
                  placeholder="Specify confidential credentials, private airstrip access, or security request details..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="gold-input rounded-xl px-4 py-3 text-sm w-full focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-black font-semibold text-sm uppercase tracking-widest py-4 rounded-xl hover:scale-102 active:scale-98 transition-all shadow-lg shadow-amber-500/10 cursor-pointer animate-pulse-gold"
                id="submit-booking-button"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bookings Passes Deck */}
      {myBookings.length > 0 && (
        <section id="bookings-dashboard" className="pt-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block mb-2">
                Reservation Deck
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-wide font-light">
                My Active Viewing Passes
              </h2>
            </div>
            <span className="text-xs text-muted font-mono bg-foreground/3 border border-border-color px-3 py-1.5 rounded-full">
              Synchronized Local/Server
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="glass-panel p-6 rounded-2xl border border-amber-500/10 flex flex-col justify-between relative overflow-hidden"
                id={`booking-pass-${booking.id}`}
              >
                <div>
                  <div className="flex justify-between items-start border-b border-border-color pb-3 mb-4">
                    <div>
                      <span className="text-xs font-serif text-foreground font-light block">
                        {booking.property}
                      </span>
                      <span className="text-[10px] font-mono text-muted">{booking.id}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="text-muted hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Cancel Appointment"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 text-xs font-mono text-muted mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">Date:</span>
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">Window:</span>
                      <span>{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">Format:</span>
                      <span>{booking.tourType}</span>
                    </div>
                    {booking.config && (
                      <div className="mt-3 pt-3 border-t border-border-color text-[10px] text-muted/80">
                        <span className="text-amber-550 dark:text-amber-300 block mb-0.5 uppercase tracking-wide font-bold">Custom Config:</span>
                        Env: {booking.config.cladding} | Floor: {booking.config.flooring} | Est. Value: ${booking.config.totalPrice}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono bg-foreground/3 p-2.5 rounded-lg border border-border-color">
                  <span className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 size={12} />
                    Confirmed Pass
                  </span>
                  <span className="text-muted">Concierge Desk</span>
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
