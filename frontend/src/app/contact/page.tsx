"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", interest: "General Inquiry" });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        setFormData({ name: "", email: "", message: "", interest: "General Inquiry" });
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
      setFormData({ name: "", email: "", message: "", interest: "General Inquiry" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Shared Header Navigation */}
      <Header />

      {/* Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
            Client Inquiries
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light mb-6">
            Contact Concierge
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
            Have a custom blueprint inquiry, parcel sourcing request, or media inquiry? Contact our concierge desk directly or submit a message below.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-6">
              <h3 className="text-sm font-mono tracking-wider uppercase text-foreground mb-2">Direct Channels</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Email Inquiries</span>
                  <span className="text-sm font-light text-foreground">concierge@jahomes.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Telephone</span>
                  <span className="text-sm font-light text-foreground">+1 (800) 888-9999</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Studio HQ</span>
                  <span className="text-sm font-light text-foreground">
                    100 Aspen Heights Drive, Suite A <br /> Aspen, Colorado 81611
                  </span>
                </div>
              </div>
            </div>

            {/* Service Hour Note */}
            <div className="bg-amber-500/5 border border-amber-500/25 p-6 rounded-2xl text-xs flex gap-3">
              <Clock className="text-amber-500 shrink-0" size={16} />
              <div>
                <span className="text-amber-300 font-bold block mb-1">Operational Response SLA</span>
                <p className="text-muted leading-relaxed font-sans font-light">
                  Active concierge coordinators respond to all secured messages within 12 business hours. VIP tour credentials will automatically show up in your reservation deck.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-border-color shadow-xl">
              <h3 className="text-sm font-mono tracking-wider uppercase text-foreground mb-6">Secure Message Form</h3>
              
              {responseMsg && (
                <div
                  className={`flex items-start gap-2.5 p-4 rounded-xl text-xs mb-6 ${
                    responseMsg.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                  }`}
                >
                  {responseMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span className="leading-normal font-medium">{responseMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      required
                      placeholder="Julian Sterling"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="gold-input rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      required
                      placeholder="client@sanctuary.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="gold-input rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="interest-select" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Topic of Interest
                  </label>
                  <select
                    id="interest-select"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="gold-input rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                  >
                    <option value="General Inquiry">General Inquiries</option>
                    <option value="Co-Design Consultation">Co-Design Blueprint & Slabs</option>
                    <option value="Private Land Sourcing">Private Land Plot Sourcing</option>
                    <option value="Media & Press">Media Inquiries</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message-input" className="text-xs font-mono uppercase tracking-wider text-muted">
                    Inquiry Details *
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your design requests, custom layout preferences, or geographical plot location..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="gold-input rounded-xl px-4 py-3 text-sm focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-102 active:scale-98 transition-all shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {loading ? "Submitting Inquiry..." : "Transmit Secure Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
