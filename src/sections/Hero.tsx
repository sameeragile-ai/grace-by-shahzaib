import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import { SmartImage } from '../components/SmartImage';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSafetyFallbackActive, setIsSafetyFallbackActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Reveal trigger shortly after mount
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 250);

    // Guaranteed safety fallback: after 2.5s, the image is unconditionally fully visible
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
      setIsSafetyFallbackActive(true);
    }, 2500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-8 px-6 md:px-10 overflow-hidden bg-[#FBF8F4]"
    >
      {/* Drifting soft gradient mesh blobs - strictly z-0 with pointer-events-none */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Champagne blob */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#F6D7B0]/25 blur-[100px]"
        />

        {/* Rose blob */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8A3B5]/20 blur-[120px]"
        />

        {/* Lilac blob */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[20%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-[#C9B6E4]/20 blur-[110px]"
        />
      </div>

      {/* Main Content Area: Editorial Split Grid (z-10) */}
      <div className="relative z-10 max-w-[1360px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (Editorial Typography & CTAs) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79] font-medium">
              {SITE_CONTENT.brand.eyebrow}
            </span>
          </motion.div>

          {/* Masked Line-by-Line Headline */}
          <div className="overflow-hidden mb-6">
            <h1 className="font-serif text-[#1C1420] leading-[1.04] tracking-[-0.03em] text-[clamp(2.75rem,6.5vw,6.25rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: customEase }}
                  className="block"
                >
                  {SITE_CONTENT.brand.heroHeadlinePart1}{' '}
                  <span className="italic font-normal font-serif text-gradient-signature pr-1">
                    {SITE_CONTENT.brand.heroHeadlineItalic}
                  </span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.22, ease: customEase }}
                  className="block"
                >
                  Style & Presence.
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: customEase }}
            className="text-sm md:text-base text-[#6B5F6E] max-w-xl leading-relaxed mb-8"
          >
            {SITE_CONTENT.brand.heroSubheading}
          </motion.p>

          {/* 3 Category Chips in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: customEase }}
            className="mb-8"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B5F6E] block mb-2.5">
              Instant Department Access
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {SITE_CONTENT.categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  data-cursor="View"
                  className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#1C1420]/10 hover:border-[#B76E79] shadow-sm text-xs text-[#1C1420] transition-all duration-200"
                >
                  <span className="font-mono text-[10px] text-[#B76E79] font-medium">
                    {cat.number}
                  </span>
                  <span className="font-medium group-hover:text-[#B76E79] transition-colors">
                    {cat.name}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B5F6E] group-hover:text-[#B76E79] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[1.5]" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: customEase }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/products"
              data-magnetic
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1420] bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4] shadow-md hover:shadow-xl hover:brightness-105 transition-all duration-300"
            >
              <span>Explore New Arrivals</span>
              <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
            </Link>

            <a
              href="#categories"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1420] border border-[#1C1420]/20 hover:bg-[#1C1420] hover:text-[#FBF8F4] transition-all duration-300"
            >
              Shop by Category
            </a>
          </motion.div>
        </div>

        {/* Right Column (Hero Visual with Explicit Sizing & Guaranteed Reveal) */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center w-full">
          {/* Explicit Container Size: aspect-ratio 4/5, height ~min(78svh, 720px) on desktop, min-h-[380px] on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: customEase }}
            className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/5] h-[400px] sm:h-[500px] lg:h-[min(78svh,720px)] rounded-[28px] overflow-hidden shadow-2xl border border-[#1C1420]/10 bg-[#F4EEE7] z-10"
          >
            {/* Parallax / Gentle Scroll Scaling wrapper */}
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="w-full h-full will-change-transform overflow-hidden"
            >
              <SmartImage
                src={SITE_CONTENT.brand.heroImage}
                alt="Grace by Shahzaib - Luxury Lifestyle, Embroidered Apparel, Fine Jewellery & Classic Timepieces"
                fallbackCategory="Haute Couture"
                loading="eager"
                fetchPriority="high"
                objectPosition="center top"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Subtle Gradient Scrim at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1420]/80 via-transparent to-transparent pointer-events-none z-10" />

            {/* Floating Editorial Badge on bottom left */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-20 flex items-end justify-between pointer-events-none">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F6D7B0] block">
                  New Season Curation
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-0.5">
                  Haute Silk, Zircons & Prestige
                </p>
              </div>
              <span className="font-mono text-xs text-white/80">2026/27</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 mx-auto mt-6 flex flex-col items-center gap-1 text-[#6B5F6E]"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.2em]">
          Scroll to Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
