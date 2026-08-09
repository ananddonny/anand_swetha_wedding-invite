"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Clock, Heart, ChevronDown } from 'lucide-react';

export default function WeddingInvitation() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const weddingDate = new Date("2026-12-10T17:00:00").getTime();

  // Trigger content reveal smoothly at 6 seconds while video plays fully
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 6 && !detailsVisible) {
      setDetailsVisible(true);
    }
  };

  return (
    <div className="relative min-h-screen text-[#F3EFEA] selection:bg-amber-500/30 overflow-x-hidden font-serif">
      {/* Import Google Fonts for Royal Script & Classic Serifs */}
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
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dynamic Blur Overlay (20% Intensity) */}
        <motion.div 
          initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.2)" }}
          animate={detailsVisible ? { backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.4)" } : { backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.2)" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Content with smooth mobile-first layout */}
      <AnimatePresence>
        {detailsVisible && (
          <motion.main 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 max-w-md mx-auto pb-24 px-6 text-center"
          >
            {/* Hero Section matching reference style */}
            <section className="min-h-[92vh] flex flex-col items-center justify-center py-12">
              <div className="text-amber-300 mb-2">
                <Heart size={20} className="fill-amber-300 mx-auto" />
              </div>
              <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-amber-200/90 mb-6">
                We're Getting Married
              </p>

              <div className="w-16 h-[1px] bg-amber-400/50 mb-6 mx-auto"></div>

              {/* Groom Details */}
              <h1 className="font-script text-7xl md:text-8xl text-amber-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none mb-3">
                Anand
              </h1>
              <div className="font-playfair text-sm md:text-base italic text-amber-100/90 space-y-0.5 mb-8">
                <p>Son of Mr. &amp; Mrs. Shunmuga Sundaram</p>
                <p>B.E., M.S.</p>
                <p className="text-amber-300/90 not-italic font-sans text-xs tracking-wider uppercase">Business Owner</p>
              </div>

              {/* Ampersand */}
              <div className="font-script text-4xl text-amber-300/80 my-2">
                &amp;
              </div>

              {/* Bride Details */}
              <h2 className="font-script text-7xl md:text-8xl text-amber-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none mb-3">
                Swetha
              </h2>
              <div className="font-playfair text-sm md:text-base italic text-amber-100/90 space-y-0.5 mb-10">
                <p>Daughter of Mr. &amp; Mrs. Family Name</p>
                <p>B.Tech, M.S.</p>
                <p className="text-amber-300/90 not-italic font-sans text-xs tracking-wider uppercase">Software Professional</p>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-4 animate-bounce text-amber-300/80">
                <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-1">Scroll</p>
                <ChevronDown size={16} className="mx-auto" />
              </div>
            </section>

            {/* Event Date Box */}
            <section className="py-12">
              <div className="p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 shadow-[0_0_30px_rgba(0,0,0,0.4)] text-amber-50">
                <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-amber-300 mb-1">Save the Date</p>
                <h3 className="font-serif text-3xl md:text-4xl text-amber-400 mb-1">Dec 10, 2026</h3>
                <p className="font-playfair text-xs tracking-widest text-amber-100/70 uppercase">Thursday • 5:00 PM</p>
              </div>
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

            {/* Program Timeline */}
            <section className="py-16 px-6 bg-black/50 backdrop-blur-md rounded-3xl border border-amber-500/20 shadow-2xl my-8">
              <h2 className="font-cinzel text-2xl text-amber-400 mb-10 tracking-wider">Program Timeline</h2>
              <div className="space-y-8 text-left">
                {[
                  { time: "4:00 PM", title: "Guest Arrival", date: "Dec 10, 2026", location: "ITC Grand Chola, Chennai" },
                  { time: "5:00 PM", title: "Wedding Ceremony", date: "Dec 10, 2026", location: "Main Hall" },
                  { time: "7:30 PM", title: "Dinner Reception", date: "Dec 10, 2026", location: "Banquet Gardens" },
                ].map((event, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-b border-white/10 pb-6 last:border-none last:pb-0">
                    <div className="mt-1 bg-amber-500/20 p-2.5 rounded-full text-amber-400 border border-amber-500/30 flex-shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-white mb-0.5">{event.title}</h3>
                      <p className="font-playfair text-xs text-amber-200/70">{event.date} • {event.time}</p>
                      <p className="font-sans text-[11px] text-amber-400/90 mt-1 uppercase tracking-wider font-semibold">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* RSVP Section */}
            <section className="py-16">
              <Heart className="mx-auto text-amber-400 mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={28} />
              <h2 className="font-cinzel text-2xl text-white mb-6 tracking-wider">RSVP</h2>
              <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name*" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans" required />
                <input type="email" placeholder="Email*" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans" required />
                <select className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all appearance-none font-sans" required>
                  <option value="" className="text-slate-900">Will you be attending?*</option>
                  <option value="yes" className="text-slate-900">Yes, I'll be there!</option>
                  <option value="no" className="text-slate-900">Sorry, I can't make it</option>
                </select>
                <textarea placeholder="Your Message" className="w-full p-3.5 text-sm border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-md text-white placeholder-amber-200/40 h-28 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sans"></textarea>
                <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-cinzel tracking-[0.2em] uppercase text-xs font-semibold transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                  Send Message
                </button>
              </form>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}