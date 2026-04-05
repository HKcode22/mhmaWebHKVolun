'use client';

import React, { useState } from 'react';
import { ChevronDown, Users, BookOpen, Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, Map, BookMarked, MessageSquare, DollarSign, User } from 'lucide-react';

export default function BoardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mhmaDropdown, setMhmaDropdown] = useState(false);
  const [programsDropdown, setProgramsDropdown] = useState(false);

  const boardOfDirectors = [
    {
      name: 'Umar Sear',
      title: 'President',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Umar-Sear-300-x-350.jpg',
      socials: [
        { type: 'facebook', url: 'https://www.facebook.com/umar.sear/', color: '#3b5998' },
        { type: 'youtube', url: 'https://www.youtube.com/@UmarSear', color: '#cd201f' },
        { type: 'linkedin', url: 'https://www.linkedin.com/in/usear/', color: '#0077b5' },
        { type: 'email', url: 'mailto:umar.sear@mhma.info', color: '#000000' },
        { type: 'phone', url: 'tel:4087221043', color: '#000000' }
      ]
    },
    {
      name: 'Asad Siddique',
      title: 'General Secretary',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Asad-Siddiqui-300-x-350-257x300.jpg',
      socials: [{ type: 'email', url: 'mailto:asad.siddique@mhma.info', color: '#000000' }]
    },
    {
      name: 'Saqib Malik',
      title: 'Treasurer',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Saqib-Malik-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:saqib.malik@mhma.info', color: '#000000' }]
    },
    {
      name: 'Mohamed Mohamed',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2025/11/Mohamed-Mohamed.jpg',
      socials: [{ type: 'email', url: 'mailto:asif.alvi@mhma.info', color: '#000000' }]
    },
    {
      name: 'Sadia Khan',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Sadia-Khan-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:sadia.khan@mhma.info', color: '#000000' }]
    },
    {
      name: 'Sarfaraz Shaikh',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Sarfaraz-Shaik-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:sarfaraz.shaikh@mhma.info', color: '#000000' }]
    },
    {
      name: 'Mohamed Basha',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Mohammad-Basha-300-x-350-257x300.jpg',
      socials: [{ type: 'email', url: 'mailto:mohamed.basha@mhma.info', color: '#000000' }]
    },
    {
      name: 'Oussama Saafien',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Oussama-Saafien-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:oussama.saafien@mhma.info', color: '#000000' }]
    },
    {
      name: 'Faisal Shahid',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/08/Syed-Shahid-profile.webp',
      socials: [{ type: 'email', url: 'mailto:faisal.shahid@mhma.info', color: '#000000' }]
    }
  ];

  const boardOfTrustees = [
    {
      name: 'Asad Jafri',
      title: 'Director',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Asad-Jafri-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:asad.jafri@mhma.info', color: '#000000' }]
    },
    {
      name: 'Zafar Khan',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Zafar-Khan-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:zafar.khan@mhma.info', color: '#000000' }]
    },
    {
      name: 'Kanishka Ramyar',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2025/11/Kanishka-Ramyar.jpg',
      socials: [{ type: 'email', url: 'mailto:kanishka.ramyar@mhma.info', color: '#000000' }]
    },
    {
      name: 'Shahzad Ali',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Shehzad-Ali-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:shahzad.ali@mhma.info', color: '#000000' }]
    },
    {
      name: 'Tariq Khan',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Tariq-Khan-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:tariq.khan@mhma.info', color: '#000000' }]
    },
    {
      name: 'Owais Khalid',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2024/01/Owais-Khalid-300-x-350.jpg',
      socials: [{ type: 'email', url: 'mailto:owais.khalid@mhma.info', color: '#000000' }]
    },
    {
      name: 'Nazeer Shaik',
      title: 'Trustee',
      image: 'https://mhma.us/wp-content/uploads/2025/11/Nazeer-Shaik.jpg',
      socials: [{ type: 'email', url: 'mailto:nazeer.shaik@mhma.info', color: '#000000' }]
    }
  ];

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return null;
    }
  };

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
                    <a href="/board" className="flex items-center px-4 py-2 text-sm text-amber-500 bg-gray-50">
                      <Users className="w-4 h-4 mr-2" />
                      BOARD
                    </a>
                    <a href="/committees" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-500">
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
                    <a href="/board" className="block text-sm text-amber-500 font-medium">Board</a>
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

      {/* Board of Directors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 uppercase tracking-wide">
            Board of Directors
          </h1>
          <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            The MHMA Board of Directors manages the day-to-day operations of our organization. Consisting of nine elected members from the Mountain House community, the Board includes a <strong>President</strong>, <strong>Secretary</strong>, and <strong>Treasurer</strong>, along with additional <strong>directors</strong> to meet our community&apos;s functional needs. The Board oversees daily operations and administrative matters, implements programs and services for the community, manages operational finances and budgets, coordinates committees and community activities, and executes the vision set by the Board of Trustees. Board members serve four-year terms and meet at least once a month to discuss and guide <strong>MHMA&apos;s operations</strong>, with all meetings including an open session where voting members may attend as observers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardOfDirectors.map((person, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3 mx-auto w-48 h-56 overflow-hidden rounded shadow-lg border-4 border-gray-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white p-6 border border-gray-100 rounded shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-amber-500 text-sm uppercase tracking-wide mb-4">{person.title}</p>
                  <div className="flex justify-center space-x-3">
                    {person.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target={social.type !== 'email' && social.type !== 'phone' ? '_blank' : undefined}
                        rel={social.type !== 'email' && social.type !== 'phone' ? 'noopener noreferrer' : undefined}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors text-gray-600"
                        style={{ color: social.color }}
                        aria-label={social.type}
                      >
                        {getSocialIcon(social.type)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Trustees Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 uppercase tracking-wide">
            Board of Trustees
          </h1>
          <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            The MHMA Board of Trustees provides <strong>strategic leadership</strong> and <strong>governance oversight</strong> for our organization. Consisting of seven members, the Trustees ensure MHMA remains true to its mission and <strong>Islamic principles</strong>. The Board of Trustees holds and manages all <strong>MHMA property</strong> in trust for the community, and is responsible for all <strong>regulatory compliance</strong>, insurance, and legal matters. They oversee major decisions including <strong>construction</strong> and <strong>fundraising</strong>, provide advisory support to the Board of Directors. Board members serve four-year staggered terms to ensure continuity of leadership and work collaboratively with the Board of Directors, meeting regularly to ensure alignment on MHMA&apos;s <strong>direction</strong> and <strong>goals</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardOfTrustees.map((person, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3 mx-auto w-48 h-56 overflow-hidden rounded shadow-lg border-4 border-gray-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white p-6 border border-gray-100 rounded shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-amber-500 text-sm uppercase tracking-wide mb-4">{person.title}</p>
                  <div className="flex justify-center space-x-3">
                    {person.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target={social.type !== 'email' ? '_blank' : undefined}
                        rel={social.type !== 'email' ? 'noopener noreferrer' : undefined}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors text-gray-600"
                        style={{ color: social.color }}
                        aria-label={social.type}
                      >
                        {getSocialIcon(social.type)}
                      </a>
                    ))}
                  </div>
                </div>
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
