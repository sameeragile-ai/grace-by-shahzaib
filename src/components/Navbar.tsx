import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronDown, ArrowRight, Instagram, MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener for sticky morph and hide-on-scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > 200 && currentScrollY > lastScrollY && !isMobileMenuOpen && !isMegaMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen, isMegaMenuOpen]);

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
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '#categories', isMega: true },
    { name: 'All Products', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        animate={{
          y: hidden ? '-100%' : '0%',
          height: scrolled ? '68px' : '88px',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF8F4]/80 backdrop-blur-xl border-b border-[#1C1420]/8 shadow-[0_4px_30px_rgba(28,20,32,0.03)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1360px] mx-auto h-full px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
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

          {/* Zone 2: Navigation Links with Animated Underline */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#1C1420]">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : !link.isMega && location.pathname.startsWith(link.path);

              if (link.isMega) {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className="flex items-center gap-1 hover:text-[#B76E79] transition-colors whitespace-nowrap cursor-pointer py-1"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[1.5] ${
                          isMegaMenuOpen ? 'rotate-180 text-[#B76E79]' : 'text-[#6B5F6E]'
                        }`}
                      />
                    </button>

                    {/* Animated hover underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                        isMegaMenuOpen ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                );
              }

              return (
                <div key={link.name} className="relative py-2">
                  <Link
                    to={link.path}
                    className="hover:text-[#B76E79] transition-colors whitespace-nowrap block py-1"
                  >
                    {link.name}
                  </Link>

                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B76E79] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </div>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Shopping Bag + Mobile Trigger */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              data-cursor="Cart"
              aria-label="View Shopping Bag"
              className="relative p-2 rounded-full hover:bg-[#F4EEE7] transition-colors cursor-pointer text-[#1C1420]"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B76E79] text-white text-[11px] font-mono flex items-center justify-center font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Magnetic Gradient CTA */}
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
              className="lg:hidden p-2 rounded-md hover:bg-[#F4EEE7] transition-colors cursor-pointer text-[#1C1420]"
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

        {/* Mega Menu for Categories */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="hidden lg:block absolute top-full left-0 right-0 bg-[#FBF8F4]/98 backdrop-blur-2xl border-b border-[#1C1420]/8 shadow-[0_20px_50px_rgba(28,20,32,0.06)] py-8"
            >
              <div className="max-w-[1360px] mx-auto px-10">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1C1420]/6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
                      Curated Taxonomy
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1420] mt-0.5">
                      Explore the 3 Signature Collections
                    </h3>
                  </div>
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1420] hover:text-[#B76E79] transition-colors"
                  >
                    View All {SITE_CONTENT.products.length} Items
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {SITE_CONTENT.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      data-cursor="Explore"
                      className="group block p-4 rounded-2xl bg-white/60 border border-[#1C1420]/6 hover:border-[#E8A3B5] hover:bg-white transition-all duration-300"
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#F4EEE7] mb-4">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-xs italic text-[#B76E79]">
                          {cat.number}
                        </span>
                        <span className="text-[11px] text-[#6B5F6E]">
                          {cat.itemCount} Curations
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#1C1420] group-hover:text-[#B76E79] transition-colors mt-1">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-[#6B5F6E] mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full-Screen Mobile Drawer */}
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
                Shop By Category
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SITE_CONTENT.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#1C1420]/6"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#B76E79]">
                        {cat.number}
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1C1420] text-white text-xs font-semibold tracking-wider uppercase"
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
