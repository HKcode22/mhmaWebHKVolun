"use client";

import { useState } from "react";
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
  Landmark,
  BookOpen,
  Heart,
  User,
} from "lucide-react";

export default function MaktabProgramPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" alt="MHMA Logo" width={180} height={40} className="h-10 w-auto" />
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">HOME</Link>
              <div className="relative" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <Landmark className="mr-1 h-4 w-4" />
                  MHMA
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/board" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">BOARD</Link>
                    <Link href="/committees" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">COMMITTEES</Link>
                    <Link href="/bylaws" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">BYLAWS</Link>
                    <Link href="/feedback" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">FEEDBACK</Link>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={() => setProgramsDropdownOpen(true)} onMouseLeave={() => setProgramsDropdownOpen(false)}>
                <button className="flex items-center text-[#c9a227] font-medium">
                  <BookOpen className="mr-1 h-4 w-4" />
                  PROGRAMS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ALL PROGRAMS</Link>
                    <Link href="/programs/maktab-program" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">MHMA MAKTAB</Link>
                    <Link href="/zakat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ZAKAT</Link>
                  </div>
                )}
              </div>
              <Link href="/donate" className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                <Heart className="mr-1 h-4 w-4" />
                DONATE
              </Link>
              <Link href="/login" className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                <User className="mr-1 h-4 w-4" />
                LOGIN
              </Link>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-[#c9a227] p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">HOME</Link>
                <Link href="/board" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">BOARD</Link>
                <Link href="/committees" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">COMMITTEES</Link>
                <Link href="/programs" className="block px-3 py-2 text-[#c9a227] font-medium">PROGRAMS</Link>
                <Link href="/donate" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">DONATE</Link>
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">LOGIN</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        <section className="py-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 py-16 px-6 md:px-12 lg:px-16">
              <div className="mb-8">
                <Image src="https://mhma.us/wp-content/uploads/2026/02/MHMA-Maktab-2025-26.jpg" alt="Maktab Program" width={900} height={500} className="rounded-lg shadow-lg w-full" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">Our Responsibility</h1>
              <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
              <div className="prose max-w-none">
                <ul className="list-disc pl-6 text-gray-700 space-y-4 mb-8">
                  <li>Allah (SWT) has showered upon us an abundance of bounties. From among all the bounties that Allah (SWT) has favored us with, without a doubt the greatest bounty is being apart of this great and beautiful religion, Islam. It is an obligation upon us to learn about Islam and impart it to the next generation. If we do not perform this duty we will be held accountable in the court of Allah (SWT) on the Day of Judgment.</li>
                  <li>Our Prophet mentioned, <strong>"All of you are shepherds and you will all be asked about your flock." (Bukhari)</strong> This narration teaches us two things. First, every person is responsible of someone or something else. Second, everyone will be questioned by Allah (SWT) as to how we carried out this responsibility.</li>
                  <li>Our children are our greatest responsibility. This is such a responsibility that the entire community will be held accountable and every parent as well. It is an obligation upon us, as a community member and as a parent, to impart this religion to our children.</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4">Goal</h2>
                <p className="text-gray-700 mb-6">
                  The goal of this Maktab program is to provide children with the opportunity to learn proper Qur'anic recitation, obtain a comprehensive Islamic education, and receive the necessary training to become familiar with Islamic norms and values (Tarbiayyah), to remain steadfast through the challenges they face in society.
                </p>

                <div className="my-8">
                  <Image src="https://mhma.us/wp-content/uploads/2024/06/4.jpg" alt="Maktab Students" width={800} height={450} className="rounded-lg shadow-lg" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4">Website</h2>
                <p className="text-gray-700 mb-6">
                  <strong>Maktab:</strong> <Link href="https://maktab.mhma.us" target="_blank" className="text-[#c9a227] hover:underline">https://maktab.mhma.us</Link>
                </p>

                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4">FAQs</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 p-4 bg-gray-50">What are the guidelines for the students?</h3>
                    <div className="p-4">
                      <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                        <li>Students must arrive on time and be picked up on time every day.</li>
                        <li>Students must come to class wearing clean clothes.</li>
                        <li>Students must come to class wearing modest attire (loose clothing). Full hijab must be Observed by the girls and boys are encouraged to wear Kufi (headgear).</li>
                        <li>Students must be respectful to the teachers, peers, and the facility at all times.</li>
                        <li>Students are not allowed to leave the facility premises without permission.</li>
                        <li>Students are not allowed to use any electronic devices in the class.</li>
                        <li>Students must be punctual with their attendance and complete homework on time.</li>
                      </ol>
                      <p className="mt-4 font-semibold">Violations:</p>
                      <ul className="list-disc pl-6 text-gray-700">
                        <li>First violation: talk with the student</li>
                        <li>Second violation: meeting with parents</li>
                        <li>Third violation: suspension or possible expulsion</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 p-4 bg-gray-50">What are the guidelines for the parents?</h3>
                    <div className="p-4">
                      <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Parents should show importance to their child's Islamic education.</li>
                        <li>Parents should ensure their child arrives to class on time and leaves on time.</li>
                        <li>They should check their WhatsApp daily for updates by teachers & admins.</li>
                        <li>Parents are NOT allowed to have conversations near the class where it becomes a distraction.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 p-4 bg-gray-50">What is the Curriculum of the Maktab program?</h3>
                    <div className="p-4">
                      <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                        <li><strong>Quran</strong> – teaching Qaidah with correct pronunciation, reading Quran, and memorizing of surahs.</li>
                        <li><strong>Tajweed</strong> – Teaching tajweed rules with its application.</li>
                        <li><strong>Islamic studies</strong> – Consisting of basic Aqeedah, Seerah, fiqh, quranic stories, hadiths and other general Islamic Studies.</li>
                      </ol>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 p-4 bg-gray-50">Who are the teachers of the Maktab program?</h3>
                    <div className="p-4">
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Shaykh Tamim Tarin (Oversight)</li>
                        <li>Ustadah Khadija</li>
                        <li>Shaykh Fawaz Anwer</li>
                        <li>Ustadah Islem</li>
                        <li>Ustadah Sarah</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8">
              <div className="mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977704984784!2d-121.5405094!3d37.7786645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900c02b5b8f353%3A0xa8e69c4f6e63c44a!2sMountain%20House%20Unity%20Center!5e0!3m2!1sen!2sus!4v1699400000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <Link href="/programs" className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors">Back to Programs</Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" alt="MHMA Logo" width={200} height={45} className="h-12 w-auto" />
            </div>
            <div className="flex space-x-4 mb-8">
              <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2Fmhmatweets" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/mountain-house-muslim-association/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@MHMAYouTube" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
            <div className="text-center text-gray-400 text-sm"><p>Copyright 2024 MHMA - Mountain House Muslim Association</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
