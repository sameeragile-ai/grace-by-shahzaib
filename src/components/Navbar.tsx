import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ShoppingBag, ChevronDown, ArrowRight, Instagram, MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import { useCart } from '../context/CartContext';
import { SmartImage } from './SmartImage';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(SITE_CONTENT.categories[0].slug);
  const [isCartBadgePulsing, setIsCartBadgePulsing] = useState(false);

  const prevTotalItemsRef = useRef(totalItems);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuContainerRef = useRef<HTMLDivElement>(null);
  const categoryItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Smooth scroll tracking using Framer Motion (only updates state when crossing 40px threshold)
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest >= 40;
    setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
  });

  // Cart badge soft pulse (1 -> 1.15 -> 1, 300ms) when items are added
  useEffect(() => {
    if (totalItems > prevTotalItemsRef.current) {
      setIsCartBadgePulsing(true);
      const timer = setTimeout(() => setIsCartBadgePulsing(false), 300);
      return () => clearTimeout(timer);
    }
    prevTotalItemsRef.current = totalItems;
  }, [totalItems]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, [location.pathname]);

  // Click outside & Escape key listeners for mega-menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuContainerRef.current &&
        !megaMenuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMegaMenuOpen]);

  // Hover intent handlers (120ms open delay, 220ms close delay)
  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (!isMegaMenuOpen && !openTimerRef.current) {
      openTimerRef.current = setTimeout(() => {
        setIsMegaMenuOpen(true);
        openTimerRef.current = null;
      }, 120);
    }
  };

  const handleMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (!closeTimerRef.current) {
      closeTimerRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false);
        closeTimerRef.current = null;
      }, 220);
    }
  };

  const handleToggleClick = () => {
    setIsMegaMenuOpen((prev) => !prev);
  };

  // Keyboard navigation inside mega-menu dropdown
  const handleMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % SITE_CONTENT.categories.length;
      categoryItemRefs.current[nextIndex]?.focus();
      setActiveCategorySlug(SITE_CONTENT.categories[nextIndex].slug);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + SITE_CONTENT.categories.length) % SITE_CONTENT.categories.length;
      categoryItemRefs.current[prevIndex]?.focus();
      setActiveCategorySlug(SITE_CONTENT.categories[prevIndex].slug);
    }
  };

  const activeCategory =
    SITE_CONTENT.categories.find((c) => c.slug === activeCategorySlug) || SITE_CONTENT.categories[0];

  const totalCatalogCount = SITE_CONTENT.products.length;

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      {/* Sticky Fixed Container - Always fixed at top: 0, z-50 */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-2 sm:px-4 lg:px-6">
        <motion.header
          initial={false}
          animate={{
            marginTop: scrolled ? '12px' : '0px',
            maxWidth: scrolled ? '1200px' : '1360px',
            height: scrolled ? '64px' : '88px',
            borderRadius: scrolled ? '999px' : '0px',
          }}
          transition={{ duration: 0.45, ease: easeCurve }}
          className={`pointer-events-auto relative w-full transition-colors duration-450 ${
            scrolled
              ? 'bg-[#FBF8F4]/72 backdrop-blur-[18px] [-webkit-backdrop-filter:blur(18px)_saturate(160%)] border border-[#1C1420]/8 shadow-[0_10px_40px_-12px_rgba(28,20,32,0.18)] max-lg:!rounded-[18px] max-lg:!mt-2 max-lg:!h-[60px]'
              : 'bg-transparent border border-transparent shadow-none'
          }`}
        >
          {/* Subtle inner gradient glow in State B */}
          {scrolled && (
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none ring-1 ring-inset ring-gradient-to-r ring-[#F6D7B0]/15" />
          )}

          {/* 2px Gradient Scroll Progress Line along bottom edge in State B */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-6 right-6 h-[2px] overflow-hidden rounded-full pointer-events-none z-20"
              >
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                  className="w-full h-full bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Navigation Bar Row */}
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark (Scales to 0.88 when scrolled) */}
            <motion.div
              animate={{ scale: scrolled ? 0.88 : 1 }}
              transition={{ duration: 0.45, ease: easeCurve }}
              className="origin-left"
            >
              <Link
                to="/"
                className="flex items-center gap-2 group whitespace-nowrap shrink-0"
              >
                <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#1C1420] group-hover:text-[#B76E79] transition-colors">
                  Grace
                </span>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#6B5F6E] mt-1 hidden sm:inline">
                  by Shahzaib
                </span>
              </Link>
            </motion.div>

            {/* Zone 2: Navigation Links with Animated Underline */}
            <nav
              className={`hidden lg:flex items-center text-[14px] font-medium text-[#1C1420] transition-all duration-450 ${
                scrolled ? 'gap-6' : 'gap-8'
              }`}
            >
              {/* Home */}
              <div className="relative py-2">
                <Link
                  to="/"
                  className="hover:text-[#B76E79] transition-colors whitespace-nowrap block py-1"
                >
                  Home
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                    location.pathname === '/' ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </div>

              {/* Categories Link with Compact Mega-Menu */}
              <div
                ref={megaMenuContainerRef}
                className="relative py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={handleToggleClick}
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 hover:text-[#B76E79] transition-colors whitespace-nowrap cursor-pointer py-1 select-none"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[1.5] ${
                      isMegaMenuOpen ? 'rotate-180 text-[#B76E79]' : 'text-[#6B5F6E]'
                    }`}
                  />
                </button>

                {/* Hover Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                    isMegaMenuOpen || location.pathname.startsWith('/category') ? 'w-full' : 'w-0'
                  }`}
                />

                {/* Invisible hover bridge to prevent menu from closing when mouse travels into panel */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] h-[16px] pointer-events-auto" />
                )}

                {/* Compact Mega-Menu Panel (680px width, max 300px height, 2-column layout) */}
                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: easeCurve }}
                      className="mega-menu-panel absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[680px] max-w-[calc(100vw-48px)] bg-[#FBF8F4]/95 backdrop-blur-[20px] rounded-[20px] border border-[#1C1420]/8 shadow-[0_24px_60px_-20px_rgba(28,20,32,0.18)] p-4 z-50 overflow-hidden"
                    >
                      {/* Caret notch pointing to link */}
                      <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#FBF8F4] border-t border-l border-[#1C1420]/8 rotate-45 pointer-events-none" />

                      <div className="grid grid-cols-12 gap-4 items-stretch h-[240px]">
                        {/* Left Column (55% ≈ 7 cols): Vertical list of 3 categories */}
                        <div className="col-span-7 flex flex-col justify-between py-1 pr-1">
                          <div className="space-y-1">
                            {SITE_CONTENT.categories.map((cat, idx) => {
                              const isSelected = cat.slug === activeCategorySlug;
                              const count = SITE_CONTENT.getCategoryCount(cat.slug);

                              return (
                                <motion.div
                                  key={cat.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                                >
                                  <Link
                                    ref={(el) => {
                                      categoryItemRefs.current[idx] = el;
                                    }}
                                    to={`/category/${cat.slug}`}
                                    role="menuitem"
                                    tabIndex={0}
                                    onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                                    onFocus={() => setActiveCategorySlug(cat.slug)}
                                    onKeyDown={(e) => handleMenuKeyDown(e, idx)}
                                    onClick={() => setIsMegaMenuOpen(false)}
                                    className={`group relative flex items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#F4EEE7] shadow-xs'
                                        : 'hover:bg-[#F4EEE7]/80'
                                    }`}
                                  >
                                    {/* 1px Gradient left accent bar */}
                                    <div
                                      className={`absolute left-0 top-2 bottom-2 w-[2.5px] rounded-r-full bg-gradient-to-b from-[#F6D7B0] via-[#E8A3B5] to-[#B76E79] transition-opacity duration-200 ${
                                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                      }`}
                                    />

                                    <div className="flex items-center gap-3 min-w-0">
                                      {/* 56x56px rounded thumbnail */}
                                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#1C1420]/6">
                                        <SmartImage
                                          src={cat.dropdownThumbnail}
                                          alt={cat.name}
                                          fallbackCategory={cat.name}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>

                                      {/* Details */}
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline gap-2">
                                          <h4 className="font-serif text-[17px] text-[#1C1420] group-hover:text-[#B76E79] transition-colors truncate font-medium">
                                            {cat.name}
                                          </h4>
                                          <span className="text-[11px] font-mono text-[#6B5F6E] shrink-0">
                                            ({count} Products)
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-[#6B5F6E] truncate max-w-[220px] mt-0.5 leading-normal">
                                          {cat.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Thin sliding arrow */}
                                    <ArrowRight className="w-4 h-4 text-[#6B5F6E] group-hover:text-[#B76E79] group-hover:translate-x-1 transition-all shrink-0 ml-2 stroke-[1.5]" />
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Footer strip inside mega menu */}
                          <div className="pt-2 mt-auto border-t border-[#1C1420]/6 flex justify-end">
                            <Link
                              to="/products"
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[#6B5F6E] hover:text-[#B76E79] transition-colors"
                            >
                              <span>View All {totalCatalogCount} Products</span>
                              <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                            </Link>
                          </div>
                        </div>

                        {/* Right Column (45% ≈ 5 cols): Large dynamic preview image */}
                        <div className="col-span-5 h-full relative rounded-2xl overflow-hidden bg-[#F4EEE7] border border-[#1C1420]/6">
                          <Link
                            to={`/category/${activeCategory.slug}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="group/img block w-full h-full relative"
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeCategory.slug}
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: easeCurve }}
                                className="w-full h-full absolute inset-0"
                              >
                                <SmartImage
                                  src={activeCategory.image}
                                  alt={activeCategory.name}
                                  fallbackCategory={activeCategory.name}
                                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Scrim overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1420]/80 via-transparent to-transparent pointer-events-none" />

                            {/* Overlay bottom label */}
                            <div className="absolute bottom-3 left-3 right-3 text-white z-10 flex items-center justify-between">
                              <span className="font-serif text-sm font-medium tracking-wide">
                                Explore {activeCategory.name}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] group-hover/img:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* All Products */}
              <div className="relative py-2">
                <Link
                  to="/products"
                  className="hover:text-[#B76E79] transition-colors whitespace-nowrap block py-1"
                >
                  All Products
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                    location.pathname === '/products' ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </div>

              {/* Our Story */}
              <div className="relative py-2">
                <Link
                  to="/about"
                  className="hover:text-[#B76E79] transition-colors whitespace-nowrap block py-1"
                >
                  Our Story
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                    location.pathname === '/about' ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </div>

              {/* Contact */}
              <div className="relative py-2">
                <Link
                  to="/contact"
                  className="hover:text-[#B76E79] transition-colors whitespace-nowrap block py-1"
                >
                  Contact
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                    location.pathname === '/contact' ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </div>
            </nav>

            {/* Zone 3: Primary Action + Shopping Bag + Mobile Trigger */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Bag Button with Soft Scale Pulse when item is added */}
              <button
                onClick={() => setIsCartOpen(true)}
                data-cursor="Cart"
                aria-label="View Shopping Bag"
                className="relative p-2.5 rounded-full hover:bg-[#F4EEE7] transition-colors cursor-pointer text-[#1C1420] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalItems > 0 && (
                  <motion.span
                    animate={isCartBadgePulsing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: easeCurve }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B76E79] text-white text-[11px] font-mono flex items-center justify-center font-bold shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Magnetic Gradient CTA - Stays visible & keeps gradient */}
              <Link
                to="/products"
                data-magnetic
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1420] bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4] hover:shadow-[0_4px_20px_rgba(232,163,181,0.4)] hover:brightness-105 transition-all duration-300 whitespace-nowrap"
              >
                Shop Collection
              </Link>

              {/* Mobile Hamburger Morphing to X */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2.5 rounded-md hover:bg-[#F4EEE7] transition-colors cursor-pointer text-[#1C1420] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-[1.5px] bg-[#1C1420] transition-all duration-300 origin-left ${
                      isMobileMenuOpen ? 'rotate-45 translate-x-1' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-[1.5px] bg-[#1C1420] transition-opacity duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`w-full h-[1.5px] bg-[#1C1420] transition-all duration-300 origin-left ${
                      isMobileMenuOpen ? '-rotate-45 translate-x-1' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Full-Screen Mobile Drawer (<1024px) - Always accessible */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FBF8F4] flex flex-col pt-24 pb-8 px-6 overflow-y-auto lg:hidden"
          >
            {/* Nav links */}
            <nav className="flex flex-col space-y-4 mb-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'All Products', path: '/products' },
                { name: 'Our Craftsmanship', path: '/about' },
                { name: 'Contact & Support', path: '/contact' },
                { name: 'Track Order', path: '/track' },
              ].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl sm:text-4xl text-[#1C1420] hover:text-[#B76E79] transition-colors block py-1"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Category Cards */}
            <div className="mt-4 pt-6 border-t border-[#1C1420]/10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block mb-4">
                Shop by Category
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SITE_CONTENT.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#1C1420]/6"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <SmartImage
                        src={cat.dropdownThumbnail}
                        alt={cat.name}
                        fallbackCategory={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#B76E79]">
                        {cat.number} · {SITE_CONTENT.getCategoryCount(cat.slug)} Products
                      </span>
                      <h5 className="font-serif text-base text-[#1C1420]">
                        {cat.name}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* WhatsApp Contact & Socials */}
            <div className="mt-auto pt-8 border-t border-[#1C1420]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={`https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Grace by Shahzaib, I would like to inquire about your collections.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1C1420] text-white text-xs font-semibold tracking-wider uppercase min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 stroke-[1.5]" />
                WhatsApp Us
              </a>

              <div className="flex items-center gap-4 text-xs text-[#6B5F6E]">
                <a
                  href={SITE_CONTENT.brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#1C1420]"
                >
                  <Instagram className="w-4 h-4 stroke-[1.5]" />
                  <span>{SITE_CONTENT.brand.instagram}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
