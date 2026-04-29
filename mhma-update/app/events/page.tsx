"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface Event {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf?: {
    event_poster?: string;
    event_date?: string;
    event_time?: string;
    event_location?: string;
    event_description?: string;
    event_rsvp_link?: string;
    show_date?: boolean;
    show_time?: boolean;
    show_location?: boolean;
    show_description?: boolean;
  };
  featured_media?: number;
}

interface Slide {
  id: number;
  src: string;
  alt: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  eventRsvpLink: string;
  showDate: boolean;
  showTime: boolean;
  showLocation: boolean;
  showDescription: boolean;
}

export default function EventsPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
        // Fetch child pages of Events parent page (ID 277)
        const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=277&per_page=100`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();

        console.log("Fetched events:", data);

        // Transform WordPress events to slides format
        const eventSlides: Slide[] = await Promise.all(data.map(async (event: Event) => {
          console.log("Event ACF:", event.acf);

          // Format date from YYYYMMDD to MM/DD/YYYY
          let formattedDate = event.acf?.event_date || "";
          if (formattedDate && /^\d{8}$/.test(formattedDate)) {
            const year = formattedDate.substring(0, 4);
            const month = formattedDate.substring(4, 6);
            const day = formattedDate.substring(6, 8);
            formattedDate = `${month}/${day}/${year}`;
          }

          // Format time from 24-hour (HH:MM or HH:MM:SS) to 12-hour (H:MMam/pm)
          let formattedTime = event.acf?.event_time || "";
          if (formattedTime && /^\d{1,2}:\d{2}(:\d{2})?$/.test(formattedTime)) {
            const [hours, minutes] = formattedTime.split(':');
            const hour = parseInt(hours, 10);
            const ampm = hour >= 12 ? 'pm' : 'am';
            const hour12 = hour % 12 || 12;
            formattedTime = `${hour12}:${minutes}${ampm}`;
          }

          // Handle event_poster - could be media ID (number) or URL string
          let posterUrl = event.acf?.event_poster || "";
          if (typeof posterUrl === 'number') {
            try {
              const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${posterUrl}`);
              if (mediaResponse.ok) {
                const mediaData = await mediaResponse.json();
                posterUrl = mediaData.source_url;
                console.log("Fetched media URL:", posterUrl);
              }
            } catch (error) {
              console.error("Error fetching media URL:", error);
              posterUrl = "";
            }
          }

          console.log("Poster URL for", event.title.rendered, ":", posterUrl);

          return {
            id: event.id,
            src: posterUrl || "https://mhma.us/wp-content/uploads/2024/06/MHMA-Default-Event.webp",
            alt: event.title.rendered,
            eventName: event.title.rendered,
            eventDate: formattedDate,
            eventTime: formattedTime,
            eventLocation: event.acf?.event_location || "",
            eventDescription: event.acf?.event_description || "",
            eventRsvpLink: event.acf?.event_rsvp_link || "",
            showDate: event.acf?.show_date || false,
            showTime: event.acf?.show_time || false,
            showLocation: event.acf?.show_location || false,
            showDescription: event.acf?.show_description || false,
          };
        }));

        setSlides(eventSlides);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="events" />

      {/* Main Content */}
      <main className="pt-20">
        {/* Events Grid - Standalone cards with info below poster */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 uppercase">Events</h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upcoming events and activities for the community.
              </p>
            </header>

            {loading ? (
              <div className="text-center py-12">Loading events...</div>
            ) : slides.length === 0 ? (
              <div className="text-center py-12">No events found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slides.map((slide) => (
                  <div key={slide.id} className="group bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-2">
                    {/* Poster - Top - Much Larger */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Event Info - Below Poster with Gold Box - Only show if available */}
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                      {slide.showDate && slide.eventDate && (
                        <p className="text-gray-700 mb-2">
                          <span className="font-semibold text-amber-700">Date:</span> {slide.eventDate}
                        </p>
                      )}

                      {slide.showTime && slide.eventTime && (
                        <p className="text-gray-700 mb-2">
                          <span className="font-semibold text-amber-700">Time:</span> {slide.eventTime}
                        </p>
                      )}

                      {slide.showLocation && slide.eventLocation && (
                        <p className="text-gray-700 mb-2">
                          <span className="font-semibold text-amber-700">Location:</span> {slide.eventLocation}
                        </p>
                      )}

                      {slide.showDescription && slide.eventDescription && (
                        <p className="text-gray-600 mt-4 mb-4 text-sm">{slide.eventDescription}</p>
                      )}

                      {slide.eventRsvpLink && (
                        <a
                          href={slide.eventRsvpLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-md text-lg"
                        >
                          RSVP
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Together We Are Stronger Section */}
        <section
          className="py-24 px-4 bg-cover bg-center bg-fixed relative"
          style={{
            backgroundImage: "url('https://mhma.us/wp-content/uploads/2024/04/Community.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6">
              Together we are stronger
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Join us in our mission to build a vibrant Muslim community in Mountain House. Your support makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded transition-colors"
              >
                VOLUNTEER
              </Link>
              <Link
                href="/donate"
                target="_blank"
                className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors"
              >
                DONATE NOW
              </Link>
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
