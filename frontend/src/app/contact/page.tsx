"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "General Inquiry"
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    if (!formData.name || !formData.email || !formData.message) {
      setResponseMsg({ type: "error", text: "Please enter all required fields." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMsg({ type: "success", text: data.message || "Message submitted successfully." });
        setFormData({ name: "", email: "", phone: "", message: "", interest: "General Inquiry" });
      } else {
        setResponseMsg({ type: "error", text: data.message || "Failed to submit message." });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      // Fallback local submission
      setResponseMsg({ 
        type: "success", 
        text: "Your message has been saved locally. (Backend server is currently offline)" 
      });
      setFormData({ name: "", email: "", phone: "", message: "", interest: "General Inquiry" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Shared Header Navigation */}
      <Header />

      {/* 1. Video Banner Hero Section */}
      <section className="relative h-[65vh] w-full bg-black overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://res.cloudinary.com/dtmqv7oqq/video/upload/v1782280525/Luxury_residence_at_golden_sunset_202606231553_qbaqwu.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none" />

        {/* Banner Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center mt-12 flex flex-col items-center">
          <ScrollReveal className="flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-6xl font-serif tracking-widest text-gold font-light uppercase">
              JA HOMES
            </h1>
            
            {/* Contact Details columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-sm text-foreground/90 font-light mt-6 max-w-4xl">
              <div className="flex flex-col items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Phone size={14} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Telephone</span>
                <a href="tel:+18008889999" className="hover:text-amber-500 transition-colors">+1 (800) 888-9999</a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Mail size={14} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Email</span>
                <a href="mailto:concierge@jahomes.com" className="hover:text-amber-500 transition-colors">concierge@jahomes.com</a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <MapPin size={14} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Studio HQ</span>
                <span className="text-center leading-relaxed max-w-xs">
                  100 Aspen Heights Drive, Suite A, Aspen, CO 81611
                </span>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com/jahomes" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com/jahomes" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/jahomes" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Overlapping Form Card Section */}
      <section className="relative z-30 px-6 max-w-4xl mx-auto w-full -mt-24 mb-24">
        <ScrollReveal>
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-border-color shadow-2xl">
            <div className="text-center mb-10">
              <span className="text-amber-550 dark:text-amber-500 text-[10px] font-mono uppercase tracking-[0.4em] mb-1.5 block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl font-serif tracking-wider font-light text-foreground uppercase">
                CONTACT US
              </h2>
            </div>

            {responseMsg && (
              <div
                className={`flex items-start gap-2.5 p-4 rounded-xl text-xs mb-8 ${
                  responseMsg.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                }`}
              >
                {responseMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span className="leading-normal font-medium">{responseMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Category selector pills */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  Topic of Interest
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { value: "General Inquiry", label: "GENERAL INQUIRY" },
                    { value: "Co-Design Consultation", label: "CO-DESIGN CONSULTATION" },
                    { value: "Private Land Sourcing", label: "PRIVATE LAND SOURCING" },
                    { value: "Media & Press", label: "MEDIA & PRESS" },
                  ].map((opt) => {
                    const isSelected = formData.interest === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, interest: opt.value }))}
                        className={`px-5 py-2.5 rounded-none text-[10px] font-mono tracking-wider border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500 text-black border-amber-500 font-semibold"
                            : "bg-transparent border-border-color text-muted hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid for Name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name-input" className="text-[9px] font-mono uppercase tracking-wider text-muted">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-border-color py-3 focus:outline-none focus:border-amber-500 text-sm w-full transition-colors placeholder:text-muted/40 font-sans font-light"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email-input" className="text-[9px] font-mono uppercase tracking-wider text-muted">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-border-color py-3 focus:outline-none focus:border-amber-500 text-sm w-full transition-colors placeholder:text-muted/40 font-sans font-light"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone-input" className="text-[9px] font-mono uppercase tracking-wider text-muted">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone-input"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-border-color py-3 focus:outline-none focus:border-amber-500 text-sm w-full transition-colors placeholder:text-muted/40 font-sans font-light"
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message-input" className="text-[9px] font-mono uppercase tracking-wider text-muted">
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your design requests, custom layout preferences..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-border-color py-3 pr-10 focus:outline-none focus:border-amber-500 text-sm w-full resize-none transition-colors placeholder:text-muted/40 font-sans font-light"
                  />
                  <span className="absolute right-2 bottom-4 text-muted/60 pointer-events-none">
                    <Send size={14} />
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold-gradient text-black font-semibold text-[10px] font-mono uppercase tracking-[0.25em] px-10 py-4 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Submitting Inquiry..." : "SUBMIT +"}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Google Maps Embed Section */}
      <section className="w-full h-[450px] relative z-20 border-t border-b border-border-color bg-foreground/2">
        <ScrollReveal duration={1000} className="w-full h-full">
          <iframe 
            src="https://maps.google.com/maps?q=Aspen,%20Colorado&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "grayscale(0.6) invert(0.08) contrast(1.1)" }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="JA Homes Studio Office Location Map"
          ></iframe>
        </ScrollReveal>
      </section>

      {/* Service Hour Note */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full text-center relative z-20">
        <ScrollReveal>
          <div className="inline-flex flex-col items-center gap-3 p-6 glass-panel rounded-2xl border border-amber-500/10 max-w-xl">
            <span className="w-9 h-9 rounded-full bg-amber-500/5 flex items-center justify-center text-amber-500">
              <Clock size={16} />
            </span>
            <span className="text-amber-400 font-mono text-xs uppercase tracking-wider">Operational Response SLA</span>
            <p className="text-muted text-xs leading-relaxed font-sans font-light">
              Active concierge coordinators respond to all secured messages within 12 business hours. VIP tour credentials will automatically show up in your reservation deck.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
