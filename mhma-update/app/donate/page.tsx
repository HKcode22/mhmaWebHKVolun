"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  X,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare,
  Users,
  FileText,
  Building2,
  ClipboardList,
  Heart,
  User,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function DonatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mhmaDropdownOpen, setMhmaDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [countersLoaded, setCountersLoaded] = useState(false);

  // Stats for the counter section
  const stats = [
    { label: "Target", value: "1,500,000", suffix: "" },
    { label: "Pledged", value: "750,000", suffix: "" },
    { label: "Donated", value: "350,000", suffix: "" },
  ];

  useEffect(() => {
    // Simulate counter animation
    const timer = setTimeout(() => setCountersLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                  alt="MHMA Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                HOME
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setMhmaDropdownOpen(true)}
                onMouseLeave={() => setMhmaDropdownOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <Building2 className="mr-1 h-4 w-4" /> MHMA
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {mhmaDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/board"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <Users className="mr-2 h-4 w-4" /> BOARD
                    </Link>
                    <Link
                      href="/committees"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <Users className="mr-2 h-4 w-4" /> COMMITTEES
                    </Link>
                    <Link
                      href="/bylaws"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <FileText className="mr-2 h-4 w-4" /> BYLAWS
                    </Link>
                    <Link
                      href="/feedback"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> FEEDBACK
                    </Link>
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                onMouseLeave={() => setProgramsDropdownOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <ClipboardList className="mr-1 h-4 w-4" /> PROGRAMS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/programs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      ALL PROGRAMS
                    </Link>
                    <Link
                      href="/programs/maktab-program"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      MHMA MAKTAB
                    </Link>
                    <Link
                      href="/zakat"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      ZAKAT
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/donate"
                className="flex items-center text-[#c9a227] font-medium"
              >
                <Heart className="mr-1 h-4 w-4" /> DONATE
              </Link>
              <Link
                href="/login"
                className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                <User className="mr-1 h-4 w-4" /> LOGIN
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#c9a227] p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  HOME
                </Link>
                <Link
                  href="/mhmapage"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  MHMA
                </Link>
                <Link
                  href="/board"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  BOARD
                </Link>
                <Link
                  href="/committees"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  COMMITTEES
                </Link>
                <Link
                  href="/bylaws"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  BYLAWS
                </Link>
                <Link
                  href="/feedback"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  FEEDBACK
                </Link>
                <Link
                  href="/programs"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  ALL PROGRAMS
                </Link>
                <Link
                  href="/programs/maktab-program"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  MHMA MAKTAB
                </Link>
                <Link
                  href="/zakat"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  ZAKAT
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  LOGIN
                </Link>
                <Link
                  href="/donate"
                  className="block px-3 py-2 text-[#c9a227] font-medium"
                >
                  DONATE
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Donation Section */}
        <section className="min-h-[600px]">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Donation Form */}
            <div className="lg:w-2/3 bg-gray-100 py-16 px-8 lg:px-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                  Make a difference, donate now!
                </h2>
                
                {/* Stripe Buy Button */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div ref={(el) => {
                    if (el && typeof window !== 'undefined') {
                      // Clear and inject Stripe button
                      el.innerHTML = '';
                      const script = document.createElement('script');
                      script.src = 'https://js.stripe.com/v3/buy-button.js';
                      script.async = true;
                      el.appendChild(script);
                      
                      const button = document.createElement('stripe-buy-button');
                      button.setAttribute('buy-button-id', 'buy_btn_1O6UR8KkhNmRB0QYd4bijFKq');
                      button.setAttribute('publishable-key', 'pk_live_51Nz3brKkhNmRB0QYiQmU7j48IR0VIVgI5fUW9boK2NGoz2ZzhCSn8n4EivbkAzovFpZja1l4mAyFshV5izioBIJK00h8ttma6x');
                      el.appendChild(button);
                    }
                  }} />
                </div>

                <p className="text-gray-600 mt-6 text-sm">
                  Your donation helps us continue serving the Mountain House Muslim community through educational programs, religious services, and community building activities.
                </p>
              </div>
            </div>

            {/* Right Side - Stats with Background */}
            <div 
              className="lg:w-1/3 py-16 px-8 relative bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://mhma.us/wp-content/uploads/2016/08/home-content-bg-1.jpg)',
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10">
                <div className="space-y-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center text-white">
                      <p className="text-sm uppercase tracking-wider mb-2 opacity-80">
                        {stat.label}
                      </p>
                      <p className="text-5xl md:text-6xl font-bold">
                        {stat.value}
                        {stat.suffix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3">
          {/* Address */}
          <div 
            className="py-20 px-8 text-center text-white relative bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://mhma.us/wp-content/uploads/2016/08/donate3.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-[#c9a227]/90"></div>
            <div className="relative z-10">
              <MapPin className="w-14 h-14 mx-auto mb-6" />
              <div className="space-y-1 text-lg">
                <p>250 East Main Street,</p>
                <p>Mountain House,</p>
                <p>CA 95391</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div 
            className="py-20 px-8 text-center text-white relative bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://mhma.us/wp-content/uploads/2016/08/donate2.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-[#1a1a1a]/90"></div>
            <div className="relative z-10">
              <Mail className="w-14 h-14 mx-auto mb-6" />
              <p className="text-lg">
                <a 
                  href="mailto:board@mhma.info" 
                  className="hover:text-[#c9a227] transition-colors"
                >
                  board@mhma.info
                </a>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div 
            className="py-20 px-8 text-center text-white relative bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://mhma.us/wp-content/uploads/2016/08/donate1.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-[#b49c2e]/90"></div>
            <div className="relative z-10">
              <Phone className="w-14 h-14 mx-auto mb-6" />
              <p className="text-lg">
                <a 
                  href="tel:4087221043" 
                  className="hover:text-white/80 transition-colors"
                >
                  408.722.1043
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                alt="MHMA Logo"
                width={200}
                height={45}
                className="h-12 w-auto"
              />
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              <a
                href="https://www.facebook.com/mhma95391"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mhma.ig/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fmhmatweets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mountain-house-muslim-association/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@MHMAYouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
              <p>Copyright 2024 MHMA - Mountain House Muslim Association</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
