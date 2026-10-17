import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { SITE_CONTENT } from '../data/content';
import { SmartImage } from '../components/SmartImage';

export const AboutPage: React.FC = () => {
  const materials = [
    {
      title: "Combed Summer Lawn",
      desc: "Ultra-fine long-staple cotton woven to ensure breathability under South Asian climates while retaining brilliant colorfastness."
    },
    {
      title: "Katan Silk & Organza",
      desc: "Lustrous authentic silk yarn paired with delicate sheer organza and resham embroidery for unforgettable festive evenings."
    },
    {
      title: "Winter Dhanak & Khaddar",
      desc: "Heavyweight tactile weaves crafted to provide cozy warmth, embroidered with intricate tilla threads and paired with jacquard shawls."
    },
    {
      title: "Faceted White Zircon",
      desc: "Precision brilliant-cut laboratory zircons set in copper pave and rhodium plating for lasting sparkle without tarnishing."
    }
  ];

  const faqs = [
    {
      q: "What is your delivery timeframe?",
      a: "Orders are processed within 24 hours. Delivery takes 2 to 4 working days to major cities (Lahore, Karachi, Islamabad/Rawalpindi) and 3 to 5 days to other regions."
    },
    {
      q: "Is Cash on Delivery (COD) supported nationwide?",
      a: "Yes! You can pay cash upon receiving and inspecting your parcel at your doorstep anywhere in Pakistan."
    },
    {
      q: "What if an unstitched suit has a fabric defect?",
      a: "We offer a 7-day hassle-free replacement or exchange guarantee on all unstitched items in original packaging."
    },
    {
      q: "Are the wireless microphones compatible with iPhone and Android?",
      a: "Yes, our wireless lavalier microphones come with universal Type-C and Lightning adapters with instant plug-and-play pairing without Bluetooth delays."
    }
  ];

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
        {/* Editorial Brand Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
              The Atelier Memoir
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1420] tracking-tight leading-[1.08] mb-6">
            Crafting Everyday <span className="italic font-normal text-gradient-signature">Elegance</span> with Distinction
          </h1>
          <p className="text-sm md:text-base text-[#6B5F6E] leading-relaxed">
            {SITE_CONTENT.craftsmanshipStory.lead}
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="rounded-[28px] overflow-hidden bg-[#F4EEE7] border border-[#1C1420]/8 mb-20 shadow-md">
          <SmartImage
            src={SITE_CONTENT.brand.craftsmanshipImage}
            alt="Grace by Shahzaib Master Artisan Embroidery"
            fallbackCategory="Artisanal Heritage"
            className="w-full h-80 sm:h-[460px] object-cover"
          />
        </div>

        {/* 2-Column Philosophy & Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block mb-2">
              Our Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1420] tracking-tight">
              A Symphony of Heritage & Modernity
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#6B5F6E] leading-relaxed">
            <p>{SITE_CONTENT.craftsmanshipStory.body1}</p>
            <p>{SITE_CONTENT.craftsmanshipStory.body2}</p>
            <p>
              Each curated drop—from the delicate schiffli boring embroidery on fine summer lawn to the aerospace-inspired alloy casings of our smart timepieces—is inspected to guarantee exceptional tactile quality.
            </p>
          </div>
        </div>

        {/* Material & Fabric Mastery */}
        <div className="py-16 border-y border-[#1C1420]/8 mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block mb-2">
              Material Standards
            </span>
            <h3 className="font-serif text-3xl text-[#1C1420]">
              The Fabric & Hardware Codex
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[#1C1420]/8">
                <span className="font-serif text-lg text-[#B76E79] block mb-2">
                  0{i + 1}.
                </span>
                <h4 className="font-serif text-xl text-[#1C1420] mb-2">{m.title}</h4>
                <p className="text-xs text-[#6B5F6E] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block mb-2">
              Customer Clarity
            </span>
            <h3 className="font-serif text-3xl text-[#1C1420]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#1C1420]/8">
                <h4 className="font-serif text-lg text-[#1C1420] mb-2">{faq.q}</h4>
                <p className="text-xs text-[#6B5F6E] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-[28px] bg-gradient-to-r from-[#F6D7B0]/40 via-[#E8A3B5]/30 to-[#C9B6E4]/40 border border-[#1C1420]/10 text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1420] mb-3">
            Experience Grace in Person
          </h3>
          <p className="text-xs sm:text-sm text-[#6B5F6E] max-w-md mx-auto mb-8">
            Explore our latest unstitched collections or chat directly with our styling team for custom recommendations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3.5 rounded-full bg-[#1C1420] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B76E79] transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-[#1C1420] border border-[#1C1420]/15 text-xs font-semibold uppercase tracking-wider hover:border-[#B76E79] transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
