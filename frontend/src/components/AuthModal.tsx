"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!email || !password || (isSignUp && !name)) {
      setMessage({ type: "error", text: "Please enter all fields." });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const res = await signup(name, email, password);
        if (res.success) {
          setMessage({ type: "success", text: res.message });
          setTimeout(() => {
            onClose();
            setName("");
            setEmail("");
            setPassword("");
            setMessage(null);
          }, 1500);
        } else {
          setMessage({ type: "error", text: res.message });
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          setMessage({ type: "success", text: res.message });
          setTimeout(() => {
            onClose();
            setEmail("");
            setPassword("");
            setMessage(null);
          }, 1500);
        } else {
          setMessage({ type: "error", text: res.message });
        }
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md glass-panel p-8 rounded-2xl border border-gold-500/20 shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header Tabs */}
        <div className="flex border-b border-border-color pb-4 mb-6">
          <button
            onClick={() => {
              setIsSignUp(false);
              setMessage(null);
            }}
            className={`flex-1 text-center pb-2 text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              !isSignUp ? "text-amber-500 font-bold border-b-2 border-amber-500" : "text-muted hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setMessage(null);
            }}
            className={`flex-1 text-center pb-2 text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              isSignUp ? "text-amber-500 font-bold border-b-2 border-amber-500" : "text-muted hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Response Alert */}
        {message && (
          <div
            className={`flex items-start gap-2.5 p-3 rounded-xl text-xs mb-4 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span className="leading-normal font-medium">{message.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-subtle" size={14} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-subtle" size={14} />
              <input
                type="email"
                placeholder="client@sanctuary.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-subtle" size={14} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="gold-input rounded-xl pl-9 pr-4 py-3 text-sm w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:scale-102 active:scale-98 transition-all shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Create Account" : "Access Sanctuary"}
          </button>
        </form>

        <p className="text-[10px] text-muted text-center mt-5 leading-normal">
          By signing in, you agree to our secure terms of service and encrypted data protocols.
        </p>
      </div>
    </div>
  );
}
