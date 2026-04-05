'use client';

import React, { useState } from 'react';
import { ChevronDown, Users, BookOpen, ChevronLeft, ChevronRight, Facebook, Instagram, Twitter, Youtube, Linkedin, Users2, GraduationCap, Baby, Heart, Map, BookMarked, MessageSquare, DollarSign, User } from 'lucide-react';

export default function MHMAPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mhmaDropdown, setMhmaDropdown] = useState(false);
  const [programsDropdown, setProgramsDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Navigation - White background */}
      <nav className="bg-white border-b border-gray-100 z-50 relative">
        <div className="max-w-7xl mx-auto pl-0 pr-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Completely Left */}
            <div className="flex-shrink-0 -ml-2">
              <a href="/" className="flex items-center">
                <img 
                  src="https://mhma.us/wp-content/uploads/2025/04/Logo-300x300-gold-on-white.webp" 
                  alt="Mountain House Muslim Association Logo" 
                  className="h-14 w-auto"
                  width="56"
                  height="56"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="/"
                className="text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide"
              >
                HOME
              </a>

              {/* MHMA Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center text-sm font-medium text-amber-500 transition-colors uppercase tracking-wide py-2"
                  onMouseEnter={() => setMhmaDropdown(true)}
                  onMouseLeave={() => setMhmaDropdown(false)}
                >
                  <Map className="w-4 h-4 mr-1" />
                  MHMA
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                {mhmaDropdown && (
                  <div
                    className="absolute left-0 top-full w-56 bg-white border border-gray-100 rounded shadow-xl py-2"
                    onMouseEnter={() => setMhmaDropdown(true)}
                    onMouseLeave={() => setMhmaDropdown(false)}
                  >
                    <a href="/board" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <Users className="w-4 h-4 mr-2" />
                      BOARD
                    </a>
                    <a href="/committees" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <Users2 className="w-4 h-4 mr-2" />
                      COMMITTEES
                    </a>
                    <a href="/bylaws" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <BookMarked className="w-4 h-4 mr-2" />
                      BYLAWS
                    </a>
                    <a href="/feedback" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      FEEDBACK
                    </a>
                  </div>
                )}
              </div>

              {/* Programs Dropdown */}
              <div className="relative group">
                <div
                  className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide py-2 cursor-pointer"
                  onMouseEnter={() => setProgramsDropdown(true)}
                  onMouseLeave={() => setProgramsDropdown(false)}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  <a href="/programs" className="hover:text-amber-500">PROGRAMS</a>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </div>
                {programsDropdown && (
                  <div
                    className="absolute left-0 top-full w-56 bg-white border border-gray-100 rounded shadow-xl py-2"
                    onMouseEnter={() => setProgramsDropdown(true)}
                    onMouseLeave={() => setProgramsDropdown(false)}
                  >
                    <a href="/programs" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <BookOpen className="w-4 h-4 mr-2" />
                      ALL PROGRAMS
                    </a>
                    <a href="/programs/maktab-program" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <BookOpen className="w-4 h-4 mr-2" />
                      MHMA MAKTAB
                    </a>
                    <a href="/zakat" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
                      <DollarSign className="w-4 h-4 mr-2" />
                      ZAKAT
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/donate"
                className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide"
              >
                <DollarSign className="w-4 h-4 mr-1" />
                DONATE
              </a>

              <a
                href="/login"
                className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors"
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-800"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <div className="space-y-3">
                <a href="/" className="block px-4 py-2 text-sm font-medium text-amber-500 uppercase">
                  Home
                </a>
                <div className="px-4 py-2">
                  <span className="text-sm font-medium text-gray-800 uppercase flex items-center">
                    <Map className="w-4 h-4 mr-2" /> MHMA
                  </span>
                  <div className="ml-6 mt-2 space-y-2">
                    <a href="/board" className="block text-sm text-gray-600 hover:text-amber-500">Board</a>
                    <a href="/committees" className="block text-sm text-gray-600 hover:text-amber-500">Committees</a>
                    <a href="/bylaws" className="block text-sm text-gray-600 hover:text-amber-500">Bylaws</a>
                    <a href="/feedback" className="block text-sm text-gray-600 hover:text-amber-500">Feedback</a>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <span className="text-sm font-medium text-gray-800 uppercase flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" /> Programs
                  </span>
                  <div className="ml-6 mt-2 space-y-2">
                    <a href="/programs" className="block text-sm text-gray-600 hover:text-amber-500">All Programs</a>
                    <a href="/programs/maktab-program" className="block text-sm text-gray-600 hover:text-amber-500">MHMA Maktab</a>
                    <a href="/zakat" className="block text-sm text-gray-600 hover:text-amber-500">Zakat</a>
                  </div>
                </div>
                <a href="/donate" className="block px-4 py-2 text-sm font-medium text-gray-800 uppercase">
                  <DollarSign className="w-4 h-4 inline mr-2" /> Donate
                </a>
                <a href="/login" className="block px-4 py-2 text-sm font-medium text-gray-800">
                  <User className="w-4 h-4 inline mr-2" /> Login
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mission Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 uppercase">
            We believe in unity and helping others.
          </h1>
          <a
            href="https://donate.stripe.com/aEU3g43Or9LdaLm6oo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded transition-colors uppercase tracking-wide"
          >
            DONATE
          </a>
          <div className="w-full max-w-xs h-1 bg-amber-500 mx-auto mt-8 mb-12"></div>
          <p className="text-xl text-gray-700 mb-8 italic">
            <strong><em>Mountain House Muslim Association</em> is a local non-profit focused on serving the Muslim community in Mountain House and surrounding areas.</strong>
          </p>
          <p className="text-lg text-gray-800 font-bold text-left mb-4">Our mission:</p>
          <blockquote className="text-xl text-gray-700 leading-relaxed text-left border-l-4 border-amber-500 pl-6 italic">
            <p className="mb-4">
              Mountain House Muslim Association (MHMA) is a Masjid dedicated to strengthening faith, building community, and serving the greater good. We strive to cultivate a vibrant, welcoming environment rooted in Islamic values where individuals and families can grow spiritually and connect meaningfully with one another.
            </p>
            <p className="mb-4">
              Through regular congregational prayers, educational programs, and community gatherings, we seek to promote unity within the Muslim community and foster understanding and respect across faiths. We believe that meaningful relationships and open dialogue build stronger neighborhoods and a more compassionate society.
            </p>
            <p className="mb-4">
              MHMA is deeply committed to nurturing the next generation. We provide a safe and supportive environment for our youth through religious education, mentorship, sports, leadership development, and wholesome recreational activities. Our goal is to help young people develop strong character, confidence, and a lasting sense of belonging grounded in faith.
            </p>
            <p>
              Through worship, service, and community engagement, we aim to strengthen families, empower youth, and contribute positively to the spiritual and civic life of Mountain House and beyond.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Quote Section with Parallax Background */}
      <section 
        className="py-20 relative bg-fixed bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://98047a93e85b1c32a36b-endpoint.azureedge.net/wpblobe6f96f32c8/wp-content/uploads/2016/08/avada-charity-journal-banner5.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-6">
            "There is no exercise better for the heart than reaching down and lifting people up."
          </blockquote>
          <div className="text-white font-semibold">
            Asad Jafri - Youth Director
          </div>
        </div>
      </section>

      {/* Program Cards Section */}
      <section className="flex flex-wrap">
        {/* Community Service - Red/Salmon */}
        <div className="w-full md:w-1/2 lg:w-1/4 bg-[#e57373] py-16 px-8 text-center">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4">Community Service</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            We believe in continuous involvement in the local community and strive to play a positive role in building a strong bond with our neighbors.
          </p>
        </div>

        {/* Religious Activities - Yellow/Amber */}
        <div className="w-full md:w-1/2 lg:w-1/4 bg-[#ffc107] py-16 px-8 text-center">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v2h20V7L12 2zm0 2.5L18.5 7h-13L12 4.5zM4 10v10h16V10H4zm14 8H6v-6h12v6z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4">Religious Activities</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            The Mountain House Muslim Association organizes many religious activities, including Jumma and Taraweeh Prayers at the Unity Center and Eid prayers at the central park.
          </p>
        </div>

        {/* Education - Teal */}
        <div className="w-full md:w-1/2 lg:w-1/4 bg-[#4db6ac] py-16 px-8 text-center">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4">Education</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            We run the popular WISH weekend school program, organize Islamic lectures, Halaqas, and Maktab for the Mountain House Muslim community.
          </p>
        </div>

        {/* Youth Clubs - Gray/Charcoal */}
        <div className="w-full md:w-1/2 lg:w-1/4 bg-[#616161] py-16 px-8 text-center">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M12 12v8"/>
              <path d="M8 16l4-4 4 4"/>
              <path d="M8 20l4-4 4 4"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4">Youth Clubs</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            We are constantly working on programs to keep our youth engaged in healthy activities and have several youth clubs, a Boy Scout troop, and many other organized activities.
          </p>
        </div>
      </section>

      {/* Equality and Fairness Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl font-bold text-gray-800 mb-4">We believe in equality and fairness.</p>
          <p className="text-gray-600 italic">
            The MHMA operates a strict non-discrimination policy prohibiting discrimination against any person or population protected under applicable US law and others. MHMA does not require adherence to or conversion to religious doctrine for a person or population to benefit from its programs or gain employment with the organization.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Footer Logo */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img 
              src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" 
              alt="MHMA Logo" 
              className="h-16 mx-auto"
              width="300"
              height="61"
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © Copyright 2010- 2026 | Mountain House Muslim Association
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/mhma95391" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/mhma.ig/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/mhmuslims" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@mhmuslimassociation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/mountain-house-muslim-association" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
