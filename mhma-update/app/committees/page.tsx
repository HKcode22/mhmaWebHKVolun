'use client';

import React, { useState } from 'react';
import { ChevronDown, Users, BookOpen, Facebook, Instagram, Twitter, Youtube, Linkedin, Map, BookMarked, MessageSquare, DollarSign, User } from 'lucide-react';

export default function CommitteesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mhmaDropdown, setMhmaDropdown] = useState(false);
  const [programsDropdown, setProgramsDropdown] = useState(false);

  const committees = [
    {
      name: 'Facilities Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Facility-committee.webp',
      href: '/committees/facilities-committee'
    },
    {
      name: 'Public Relations Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Public-Relations-committee.webp',
      href: '/committees/pr-committee'
    },
    {
      name: 'Finance Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Finance-committee.webp',
      href: '/committees/finance-committee'
    },
    {
      name: 'Membership Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Membership-committee.webp',
      href: '/committees/membership-committee'
    },
    {
      name: 'Zakat Committee',
      image: 'https://mhma.us/wp-content/uploads/2025/01/Zakat-committee.webp',
      href: '/committees/zakat-committee'
    },
    {
      name: 'Hidaya Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Hidaya-committee.webp',
      href: '/committees/hidaya-committee'
    },
    {
      name: 'Youth Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Youth-committee.webp',
      href: '/committees/youth-committee'
    },
    {
      name: 'Masjid Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Masjid-committee.webp',
      href: '/committees/masjid-committee'
    },
    {
      name: 'Fundraising Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Fundraising-committee.webp',
      href: '/committees/fundraising-committee'
    },
    {
      name: 'Funeral Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/08/Funeral-committee.webp',
      href: '/committees/funeral-committee'
    },
    {
      name: 'Education Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Education-committee.webp',
      href: '/committees/education-committee'
    },
    {
      name: 'Website Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Website-committee.webp',
      href: '/committees/website-committee'
    },
    {
      name: 'Events Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Events-committee.webp',
      href: '/committees/events-committee'
    },
    {
      name: 'Communication Committee',
      image: 'https://mhma.us/wp-content/uploads/2024/05/Communication-committee.webp',
      href: '/committees/communications-committee'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100 z-50 relative">
        <div className="max-w-7xl mx-auto pl-0 pr-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
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
              <a href="/" className="text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide">
                HOME
              </a>

              {/* MHMA Dropdown */}
              <div className="relative group">
                <div
                  className="flex items-center text-sm font-medium text-amber-500 transition-colors uppercase tracking-wide py-2 cursor-pointer"
                  onMouseEnter={() => setMhmaDropdown(true)}
                  onMouseLeave={() => setMhmaDropdown(false)}
                >
                  <Map className="w-4 h-4 mr-1" />
                  <a href="/mhmapage" className="hover:text-amber-500">MHMA</a>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </div>
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
                    <a href="/committees" className="flex items-center px-4 py-2 text-sm text-amber-500 bg-gray-50">
                      <Users className="w-4 h-4 mr-2" />
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

              <a href="/donate" className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide">
                <DollarSign className="w-4 h-4 mr-1" />
                DONATE
              </a>

              <a href="/login" className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors">
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
                <a href="/" className="block px-4 py-2 text-sm font-medium text-gray-800 uppercase">Home</a>
                <div className="px-4 py-2">
                  <span className="text-sm font-medium text-amber-500 uppercase flex items-center">
                    <Map className="w-4 h-4 mr-2" /> MHMA
                  </span>
                  <div className="ml-6 mt-2 space-y-2">
                    <a href="/board" className="block text-sm text-gray-600 hover:text-amber-500">Board</a>
                    <a href="/committees" className="block text-sm text-amber-500 font-medium">Committees</a>
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

      {/* Committees Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 uppercase tracking-wide">
            Mountain House Muslim Association Committees
          </h1>
          <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            The MHMA shall have statutory committees to assist the Board of Directors and Board of Trustees and encourage larger community involvement in the administration and operation of the MHMA. The committees&apos; goals, objectives, and budget shall be set annually by the board of directors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, index) => (
              <div key={index} className="text-center">
                <a 
                  href={committee.href}
                  className="block hover:opacity-90 transition-opacity"
                  aria-label={committee.name}
                >
                  <div className="relative mx-auto w-full max-w-[400px] overflow-hidden">
                    <img
                      src={committee.image}
                      alt={committee.name}
                      className="w-full h-auto object-cover"
                      width="500"
                      height="500"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
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

        <div className="py-6 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © Copyright 2010- 2026 | Mountain House Muslim Association
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/mhmuslims" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@mhmuslimassociation" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/mountain-house-muslim-association" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
