"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  apiBaseUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : "http://localhost:5000/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("ja-homes-token");
    const savedUser = localStorage.getItem("ja-homes-user");

    if (savedToken && savedUser) {
      requestAnimationFrame(() => {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      });
      
      // Verify token with backend
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            // Token is invalid/expired
            logout();
          }
        })
        .catch(() => {
          // If server is down, keep the local storage credentials for demo purposes
          console.warn("Backend server offline, using local credentials");
        })
        .finally(() => {
          requestAnimationFrame(() => {
            setLoading(false);
          });
        });
    } else {
      requestAnimationFrame(() => {
        setLoading(false);
      });
    }
  }, []);

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ja-homes-token");
    localStorage.removeItem("ja-homes-user");
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("ja-homes-token", data.token);
        localStorage.setItem("ja-homes-user", JSON.stringify(data.user));
        return { success: true, message: "Logged in successfully" };
      } else {
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login API error:", error);
      // Fallback local authentication for smooth local-only preview if backend is not running
      if (email && password.length >= 6) {
        const dummyUser = {
          id: "usr_local_" + Math.floor(1000 + Math.random() * 9000),
          name: email.split("@")[0].toUpperCase(),
          email: email.toLowerCase()
        };
        const dummyToken = "local_jwt_token_key";
        setToken(dummyToken);
        setUser(dummyUser);
        localStorage.setItem("ja-homes-token", dummyToken);
        localStorage.setItem("ja-homes-user", JSON.stringify(dummyUser));
        return { success: true, message: "Logged in via local credentials (Backend Offline)" };
      }
      return { success: false, message: "Backend is offline and invalid login credentials provided." };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("ja-homes-token", data.token);
        localStorage.setItem("ja-homes-user", JSON.stringify(data.user));
        return { success: true, message: "Registered successfully" };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Signup API error:", error);
      // Fallback local signup
      if (name && email && password.length >= 6) {
        const dummyUser = {
          id: "usr_local_" + Math.floor(1000 + Math.random() * 9000),
          name,
          email: email.toLowerCase()
        };
        const dummyToken = "local_jwt_token_key";
        setToken(dummyToken);
        setUser(dummyUser);
        localStorage.setItem("ja-homes-token", dummyToken);
        localStorage.setItem("ja-homes-user", JSON.stringify(dummyUser));
        return { success: true, message: "Registered via local storage (Backend Offline)" };
      }
      return { success: false, message: "Backend is offline and invalid registration details." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, apiBaseUrl: API_BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
