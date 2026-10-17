import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const CategoriesSection: React.FC = () => {
  return (
    <section id="categories" className="py-24 md:py-32 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
      {/* Eyebrow & Editorial Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
              The Three Pillars
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight">
            Shop by <span className="italic font-normal text-gradient-signature">Curated</span> Category
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#6B5F6E] max-w-md leading-relaxed">
          From opulent festive Pakistani unstitched suits to heirloom zircon jewellery and high-definition mobile acoustics, choose your department.
        </p>
      </div>

      {/* 3 Large, Tall Image Cards in Asymmetric Editorial Layout on Desktop, Horizontal Swipe Snap on Mobile */}
      <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none">
        {SITE_CONTENT.categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-center ${
              idx === 1 ? 'md:-translate-y-6' : ''
            }`}
          >
            <Link
              to={`/category/${cat.slug}`}
              data-cursor="Explore"
              className="group relative block rounded-[28px] overflow-hidden bg-white border border-[#1C1420]/8 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Frame with slow zoom on hover */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#F4EEE7] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
                />

                {/* Gradient Border Glow Overlay on Hover */}
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#1C1420]/5 group-hover:ring-2 group-hover:ring-[#E8A3B5] transition-all duration-500 pointer-events-none" />

                {/* Dark Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1420]/80 via-[#1C1420]/20 to-transparent pointer-events-none" />

                {/* Large Serif Number */}
                <span className="absolute top-6 left-6 font-serif text-3xl sm:text-4xl text-white/90 drop-shadow-sm font-normal">
                  {cat.number}
                </span>

                {/* Card Tag count */}
                <span className="absolute top-6 right-6 text-[11px] font-mono tracking-widest text-[#F6D7B0] uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {cat.itemCount} Designs
                </span>

                {/* Card Bottom Meta */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F6D7B0] block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-2 group-hover:text-[#F6D7B0] transition-colors">
                    {cat.name}
                  </h3>

                  {/* Short line divider */}
                  <div className="w-12 h-[1px] bg-white/40 group-hover:w-20 group-hover:bg-[#E8A3B5] transition-all duration-500 mb-3" />

                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-4 font-light">
                    {cat.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#F6D7B0] transition-colors">
                    <span>Explore Department</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform stroke-[1.5]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
