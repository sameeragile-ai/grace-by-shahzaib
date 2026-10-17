import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-10 bg-[#F4EEE7]/60 border-y border-[#1C1420]/6">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Visual with Parallax */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[28px] overflow-hidden shadow-2xl border border-[#1C1420]/8 bg-white aspect-[16/10] sm:aspect-[4/3]"
          >
            <motion.img
              style={{ y: parallaxY }}
              src="/src/assets/images/atelier_craftsmanship_1792237669060.jpg"
              alt="Atelier Craftsmanship - Handcrafted Pakistani Silk and Embroidery"
              referrerPolicy="no-referrer"
              className="w-full h-[115%] object-cover -mt-[7%]"
            />

            {/* Inset Label */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block">
                  Artisanal Heritage
                </span>
                <p className="font-serif text-lg text-[#1C1420]">
                  Authentic Resham & Tilla Embroidery
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#1C1420]">
                100% Pure Fabrics
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Story Content */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
              Our Heritage & Philosophy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight mb-6"
          >
            The Art of <span className="italic font-normal text-gradient-signature">Refined Grace</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-[#1C1420] font-medium leading-relaxed mb-4"
          >
            {SITE_CONTENT.craftsmanshipStory.lead}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs md:text-sm text-[#6B5F6E] leading-relaxed mb-8"
          >
            {SITE_CONTENT.craftsmanshipStory.body1}
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-[#1C1420]/8 mb-8"
          >
            {SITE_CONTENT.craftsmanshipStory.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-[#1C1420] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-[11px] text-[#6B5F6E] mt-0.5 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Learn More link */}
          <div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1420] hover:text-[#B76E79] transition-colors group"
            >
              <span>Read Full Brand Memoir</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
