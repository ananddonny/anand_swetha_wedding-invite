"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Clock, Heart } from 'lucide-react';

export default function WeddingInvitation() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Target Date: December 10, 2026, 17:00:00
  const weddingDate = new Date("2026-12-10T17:00:00").getTime();

  // Handle video timing: pause at 6 seconds and trigger the reveal
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 6) {
      videoRef.current.pause();
      setDetailsVisible(true);
    }
  };

  return (
    <div className="relative min-h-screen text-amber-50 selection:bg-amber-500/30 overflow-x-hidden">
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
        
        {/* Dynamic Blur Overlay that fades in right at 6 seconds */}
        <motion.div 
          initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.3)" }}
          animate={detailsVisible ? { backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.6)" } : { backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0.3)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Content (Reveals after 6 seconds) */}
      <AnimatePresence>
        {detailsVisible && (
          <motion.main 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 max-w-3xl mx-auto pb-24 px-4"
          >
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center text-center py-20">
              <p className="text-sm uppercase tracking-widest text-amber-200/70 mb-6 drop-shadow-md">We're getting married</p>
              <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 drop-shadow-2xl">
                Anand <br/>
                <span className="text-amber-500 text-5xl italic font-light">&</span><br/> 
                Swetha
              </h1>
              <p className="font-serif text-xl italic text-amber-100/90 mb-12 drop-shadow-md">Request the honour of your presence</p>
              <p className="max-w-md text-slate-200 leading-relaxed drop-shadow-md">
                With hearts full of love and joy, we warmly invite you to share in the celebration of our union. Your presence would mean the world to us as we begin this beautiful journey together.
              </p>
            </section>

            {/* Event Date / Reveal Box */}
            <section className="py-20">
              <div className="text-center max-w-sm mx-auto">
                <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] text-white">
                  <p className="font-serif text-xl text-amber-400 mb-2">Save the Date</p>
                  <h3 className="font-serif text-4xl mb-1 drop-shadow-lg">Dec 10, 2026</h3>
                  <p className="text-amber-100/70 uppercase tracking-widest text-xs mt-2">Thursday • 5:00 PM</p>
                </div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="py-24 text-center">
              <h2 className="font-serif text-3xl mb-12 text-white drop-shadow-md">Counting Down to Forever</h2>
              {isClient && (
                <Countdown 
                  date={weddingDate} 
                  renderer={({ days, hours, minutes, seconds }) => (
                    <div className="flex justify-center gap-4 md:gap-8 font-serif">
                      {[
                        { label: 'Days', value: days },
                        { label: 'Hours', value: hours },
                        { label: 'Minutes', value: minutes },
                        { label: 'Seconds', value: seconds }
                      ].map((time) => (
                        <div key={time.label} className="flex flex-col items-center bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 min-w-[80px]">
                          <span className="text-4xl md:text-5xl text-amber-400 mb-2 drop-shadow-md">{String(time.value).padStart(2, '0')}</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">{time.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              )}
            </section>

            {/* Program Timeline */}
            <section className="py-20 px-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl my-12">
              <h2 className="font-serif text-4xl text-center mb-16 text-amber-400 drop-shadow-md">Program Timeline</h2>
              <div className="max-w-md mx-auto space-y-12">
                {[
                  { time: "4:00 PM", title: "Guest Arrival", date: "Dec 10, 2026", location: "ITC Grand Chola, Chennai" },
                  { time: "5:00 PM", title: "Wedding Ceremony", date: "Dec 10, 2026", location: "Main Hall" },
                  { time: "7:30 PM", title: "Dinner Reception", date: "Dec 10, 2026", location: "Banquet Gardens" },
                ].map((event, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="mt-1 bg-amber-500/20 p-3 rounded-full text-amber-400 border border-amber-500/30">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl mb-1 text-white">{event.title}</h3>
                      <p className="text-slate-300 text-sm">{event.date} • {event.time}</p>
                      <p className="text-amber-400/80 text-xs mt-2 uppercase tracking-wider font-semibold">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* RSVP Section */}
            <section className="py-24 text-center max-w-lg mx-auto">
              <Heart className="mx-auto text-amber-500 mb-6 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={32} />
              <h2 className="font-serif text-4xl mb-8 text-white">RSVP</h2>
              <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name*" className="w-full p-4 border border-white/20 rounded-xl bg-black/40 backdrop-blur-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" required />
                <input type="email" placeholder="Email*" className="w-full p-4 border border-white/20 rounded-xl bg-black/40 backdrop-blur-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" required />
                <select className="w-full p-4 border border-white/20 rounded-xl bg-black/40 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none" required>
                  <option value="" className="text-slate-900">Will you be attending?*</option>
                  <option value="yes" className="text-slate-900">Yes, I'll be there!</option>
                  <option value="no" className="text-slate-900">Sorry, I can't make it</option>
                </select>
                <textarea placeholder="Your Message" className="w-full p-4 border border-white/20 rounded-xl bg-black/40 backdrop-blur-md text-white placeholder-slate-400 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"></textarea>
                <button type="submit" className="w-full bg-amber-600/90 hover:bg-amber-500 text-white py-4 rounded-xl uppercase tracking-widest text-sm font-semibold transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)]">
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