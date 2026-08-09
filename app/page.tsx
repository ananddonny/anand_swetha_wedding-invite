"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Heart, ChevronDown, MapPin, CheckCircle2 } from 'lucide-react';

export default function WeddingInvitation() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const weddingDate = new Date("2026-08-30T09:00:00").getTime();

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 6 && !detailsVisible) {
      setDetailsVisible(true);
    }
  };

  // Handle AJAX Form Submission to stay on page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xyegegll", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your RSVP. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] text-[#F3EFEA] selection:bg-amber-500/30 overflow-x-hidden font-serif">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;600&display=swap');
        
        .font-script {
          font-family: 'Great Vibes', cursive;
        }
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Background Video Section */}
      <div className="fixed inset-0 z-0 h-[100dvh] w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        
        <motion.div 
          initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.15)" }}
          animate={detailsVisible ? { backdropFilter: "blur(3px)", backgroundColor: "rgba(0,0,0,0.35)" } : { backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.15)" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {detailsVisible && (
          <motion.main 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 max-w-md mx-auto pb-24 px-6 text-center"
          >
            {/* Hero Section */}
            <section className="min-h-[95vh] flex flex-col items-center justify-center pt-12 pb-6">
              <div className="text-amber-300 mb-4">
                <Heart size={28} className="fill-amber-300 mx-auto" />
              </div>
              <p className="font-cinzel text-sm md:text-base tracking-[0.3em] uppercase text-amber-200/90 mb-6">
                We're Getting Married
              </p>

              <div className="w-16 h-[1px] bg-amber-400/50 mb-6 mx-auto"></div>

              <h1 className="font-script text-7xl md:text-8xl text-amber-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none mb-3">
                Anand
              </h1>
              <div className="font-playfair text-sm md:text-base italic text-amber-100/90 space-y-1 mb-8">
                <p>B.E (Electronics &amp; Instrumentation Engineering)</p>
                <p className="text-amber-300/90 not-italic font-sans text-xs tracking-wider uppercase font-semibold">Managing Partner at Mani Offset</p>
              </div>

              <div className="font-script text-4xl text-amber-300/80 my-2">
                &amp;
              </div>

              <h2 className="font-script text-7xl md:text-8xl text-amber-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none mb-3">
                Swetha
              </h2>
              <div className="font-playfair text-sm md:text-base italic text-amber-100/90 space-y-1 mb-10">
                <p>B.Voc Sustainable Environment, MBA (HR)</p>
                <p className="text-amber-300/90 not-italic font-sans text-xs tracking-wider uppercase font-semibold">Payroll Associate at NTT DATA</p>
              </div>

              <div className="mt-2 mb-10 animate-bounce text-amber-300/80">
                <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-1">Scroll</p>
                <ChevronDown size={16} className="mx-auto" />
              </div>

              <p className="max-w-sm mx-auto font-playfair text-lg md:text-xl italic text-white leading-relaxed mt-4 drop-shadow-md">
                "Your presence would mean the world to us. We hope to celebrate this joyous occasion with you and your family."
              </p>
            </section>

            {/* Save the Date Section */}
            <section className="py-12">
              <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                <div className="p-8 bg-[#1A1108]/80 backdrop-blur-md rounded-2xl border border-amber-600/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                  <p className="font-cinzel text-sm md:text-base uppercase tracking-[0.25em] text-amber-400 mb-3 font-semibold">Reception</p>
                  <h3 className="font-serif text-4xl text-amber-400 mb-4 drop-shadow-md">Aug 29, 2026</h3>
                  <p className="font-cinzel text-sm md:text-base tracking-[0.15em] text-[#A88755] uppercase">Saturday • 6:30 PM Onwards</p>
                </div>

                <div className="p-8 bg-[#1A1108]/80 backdrop-blur-md rounded-2xl border border-amber-600/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                  <p className="font-cinzel text-sm md:text-base uppercase tracking-[0.25em] text-amber-400 mb-3 font-semibold">Wedding</p>
                  <h3 className="font-serif text-4xl text-amber-400 mb-4 drop-shadow-md">Aug 30, 2026</h3>
                  <p className="font-cinzel text-sm md:text-base tracking-[0.15em] text-[#A88755] uppercase">Sunday • 9:00 AM - 10:30 AM</p>
                </div>
              </div>
            </section>

            {/* Venue & Map Section */}
            <section className="py-12 w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <MapPin className="mx-auto text-amber-400 mb-3" size={28} strokeWidth={1.5} />
                <h2 className="font-cinzel text-3xl text-amber-400 tracking-[0.15em] mb-4">Venue</h2>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-amber-500/30"></div>
                  <Heart size={14} className="fill-[#A88755] text-[#A88755]" />
                  <div className="h-[1px] w-12 bg-amber-500/30"></div>
                </div>

                <h3 className="font-serif text-2xl text-white mb-1 drop-shadow-md">A N R Thirumana Maligai</h3>
                <p className="font-playfair text-amber-400 text-base md:text-lg">Tondiarpet, Chennai</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-8 bg-white/5 p-1">
                <div className="rounded-xl overflow-hidden relative pt-[60%]">
                  <iframe
                    src="https://maps.google.com/maps?q=A%20N%20R%20Thirumana%20Maligai,%20Tondiarpet,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <a 
                href="https://share.google/TFoHsW0kcuBGplQDR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#996D2D] hover:bg-[#B38337] text-white py-3.5 px-8 rounded font-sans text-sm font-semibold transition-all shadow-lg w-full md:w-auto"
              >
                View on Google Maps
              </a>
            </section>

            {/* Countdown Section */}
            <section className="py-16">
              <h2 className="font-cinzel text-lg tracking-widest text-amber-200 mb-8">Counting Down to Forever</h2>
              {isClient && (
                <Countdown 
                  date={weddingDate} 
                  renderer={({ days, hours, minutes, seconds }) => (
                    <div className="grid grid-cols-4 gap-2 font-serif">
                      {[
                        { label: 'Days', value: days },
                        { label: 'Hours', value: hours },
                        { label: 'Mins', value: minutes },
                        { label: 'Secs', value: seconds }
                      ].map((time) => (
                        <div key={time.label} className="flex flex-col items-center bg-black/40 backdrop-blur-md p-3 rounded-xl border border-amber-500/20">
                          <span className="text-2xl md:text-3xl text-amber-400 font-bold mb-1">{String(time.value).padStart(2, '0')}</span>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200/60 font-sans">{time.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              )}
            </section>

            {/* RSVP Section */}
            <section className="py-12">
              <Heart className="mx-auto text-amber-400 mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={32} />
              <h2 className="font-cinzel text-2xl text-white mb-6 tracking-wider">RSVP</h2>
              
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <input type="text" name="name" placeholder="Your Name*" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans" required />
                  <input type="email" name="email" placeholder="Email*" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans" required />
                  <select name="attendance" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all appearance-none font-sans" required>
                    <option value="" className="text-slate-900">Will you be attending?*</option>
                    <option value="Yes" className="text-slate-900">Yes, I'll be there!</option>
                    <option value="No" className="text-slate-900">Sorry, I can't make it</option>
                  </select>
                  <textarea name="message" placeholder="Your Message" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 h-28 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans"></textarea>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#996D2D] hover:bg-[#B38337] text-white py-4 rounded-xl font-cinzel tracking-[0.2em] uppercase text-xs font-semibold transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-[#1A1108]/90 backdrop-blur-md rounded-2xl border border-amber-600/40 shadow-2xl text-center"
                >
                  <CheckCircle2 className="mx-auto text-amber-400 mb-4" size={48} />
                  <h3 className="font-serif text-3xl text-amber-400 mb-2">Thank You!</h3>
                  <p className="font-playfair text-amber-100/90 text-sm">
                    Your RSVP has been submitted successfully. We look forward to celebrating with you!
                  </p>
                </motion.div>
              )}
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}