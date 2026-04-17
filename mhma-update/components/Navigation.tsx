"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check login state on mount and when localStorage changes
    const checkLoginState = () => {
      const token = localStorage.getItem("jwt_token");
      const storedUsername = localStorage.getItem("username");
      console.log("Navigation - Checking login state:", { token: !!token, username: storedUsername });
      setIsLoggedIn(!!token);
      setUsername(storedUsername || "");
    };

    checkLoginState();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      checkLoginState();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" alt="MHMA Logo" width={180} height={40} className="h-10 w-auto" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={`transition-colors font-medium ${currentPage === "home" ? "text-[#c9a227]" : "text-gray-700 hover:text-[#c9a227]"}`}>HOME</Link>
            <div className="relative" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
              <Link href="/mhmapage" className={`flex items-center transition-colors font-medium ${currentPage === "mhma" ? "text-[#c9a227]" : "text-gray-700 hover:text-[#c9a227]"}`}>
                MHMA<ChevronDown className="ml-1 h-4 w-4" />
              </Link>
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
              <Link href="/programs" className={`flex items-center transition-colors font-medium ${currentPage === "programs" ? "text-[#c9a227]" : "text-gray-700 hover:text-[#c9a227]"}`}>
                PROGRAMS<ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {programsDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ALL PROGRAMS</Link>
                  <Link href="/programs/maktab-program" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">MHMA MAKTAB</Link>
                  <Link href="/zakat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ZAKAT</Link>
                </div>
              )}
            </div>
            <Link href="/donate" target="_blank" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">DONATE</Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-[#c9a227] font-medium">DASHBOARD</Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">LOGIN</Link>
            )}
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
              <Link href="/mhmapage" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">MHMA</Link>
              <Link href="/board" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">BOARD</Link>
              <Link href="/committees" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">COMMITTEES</Link>
              <Link href="/programs" className="block px-3 py-2 text-[#c9a227] font-medium">PROGRAMS</Link>
              <Link href="/donate" target="_blank" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">DONATE</Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-2 text-[#c9a227] font-medium">DASHBOARD</Link>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium w-full text-left"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">LOGIN</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
