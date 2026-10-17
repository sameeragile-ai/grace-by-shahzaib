import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, Instagram, Phone, Mail, Check } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1C1420] text-[#FBF8F4] pt-20 pb-12 px-6 md:px-10 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#B76E79]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto">
        {/* Large Serif Brand Statement */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F6D7B0] block mb-3">
              The Luxury Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF8F4] tracking-tight max-w-2xl leading-[1.08]">
              Grace, Craftsmanship & <span className="italic font-normal text-gradient-gold">Modern</span> Presence.
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="self-start md:self-end flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* 4-Column Layout */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-tight text-[#FBF8F4] block">
              Grace <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#F6D7B0] ml-1">by Shahzaib</span>
            </span>
            <p className="text-xs text-[#FBF8F4]/70 leading-relaxed max-w-sm">
              {SITE_CONTENT.brand.heroSubheading}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONTENT.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1C1420] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONTENT.brand.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1C1420] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href={`mailto:${SITE_CONTENT.brand.email}`}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1C1420] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* The 3 Main Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F6D7B0] mb-5">
              The 3 Categories
            </h4>
            <ul className="space-y-3 text-xs">
              {SITE_CONTENT.categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-[#FBF8F4]/80 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <span className="font-mono text-[10px] text-[#F6D7B0] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F6D7B0] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/" className="text-[#FBF8F4]/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#FBF8F4]/80 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FBF8F4]/80 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FBF8F4]/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-[#FBF8F4]/80 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F6D7B0] mb-3">
              VIP Private Access
            </h4>
            <p className="text-xs text-[#FBF8F4]/70 mb-4 leading-relaxed">
              Subscribe to receive first access to limited festive unstitched drops and exclusive seasonal privileges.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F6D7B0] transition-colors pr-10"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#B76E79] text-white flex items-center justify-center hover:bg-white hover:text-[#1C1420] transition-colors cursor-pointer"
              >
                {subscribed ? (
                  <Check className="w-3.5 h-3.5 stroke-[2]" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                )}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 mt-2 block">
                Welcome to the Grace inner circle.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FBF8F4]/60 gap-4">
          <p>© {new Date().getFullYear()} Grace by Shahzaib. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Cash on Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Bank Transfer</span>
            <span aria-hidden="true">·</span>
            <span>JazzCash / EasyPaisa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
