import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reviews = SITE_CONTENT.reviews;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-24 md:py-32 px-6 md:px-10 bg-[#F4EEE7]/40 border-t border-[#1C1420]/6"
    >
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
            Client Testimonials
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight mb-14">
          What Our <span className="italic font-normal text-gradient-signature">Customers</span> Say
        </h2>

        {/* Testimonial Stage */}
        <div className="relative min-h-[260px] flex flex-col items-center justify-center">
          <Quote className="w-12 h-12 text-[#E8A3B5]/40 mb-6 stroke-[1]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 text-[#B76E79] mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Real Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1C1420] leading-relaxed italic">
                “{current.text}”
              </blockquote>

              {/* Author & Purchase Context */}
              <div className="mt-8">
                <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#1C1420]">
                  {current.author}
                </h4>
                <p className="text-[11px] text-[#6B5F6E] mt-1 font-mono">
                  {current.location} · Verified Purchase: {current.productMentioned}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls & Indicators */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            className="p-2.5 rounded-full border border-[#1C1420]/15 hover:border-[#B76E79] hover:bg-white text-[#1C1420] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'w-8 bg-[#B76E79]'
                    : 'w-2 bg-[#1C1420]/20 hover:bg-[#1C1420]/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Review"
            className="p-2.5 rounded-full border border-[#1C1420]/15 hover:border-[#B76E79] hover:bg-white text-[#1C1420] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
