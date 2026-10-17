import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT, img } from '../data/content';
import { SmartImage } from '../components/SmartImage';

export const InstagramFeed: React.FC = () => {
  const feedItems = [
    {
      image: img("apparel-cover.jpg"),
      caption: "Bespoke embroidered luxury pret for the festive season.",
      likes: "1.2k"
    },
    {
      image: img("jewellery-cover.jpg"),
      caption: "Hand-faceted teardrop white zircon on sterling silver chain.",
      likes: "840"
    },
    {
      image: img("accessories-cover.jpg"),
      caption: "Studio acoustic clarity: Dual wireless lavalier microphones.",
      likes: "950"
    },
    {
      image: img("craftsmanship.jpg"),
      caption: "Behind the seams: Master needlecraft on velvet dhanak.",
      likes: "1.5k"
    },
    {
      image: img("hero.jpg"),
      caption: "Elevate your everyday presence. New luxury drops.",
      likes: "2.1k"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79] block mb-2">
            Social Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1420] tracking-tight">
            Follow Our <span className="italic font-normal text-gradient-signature">Aesthetic</span> Journey
          </h2>
        </div>
        <a
          href={SITE_CONTENT.brand.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1420] hover:text-[#B76E79] transition-colors"
        >
          <Instagram className="w-4 h-4 stroke-[1.5]" />
          <span>{SITE_CONTENT.brand.instagram}</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {feedItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={SITE_CONTENT.brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4EEE7] border border-[#1C1420]/6 block"
          >
            <SmartImage
              src={item.image}
              alt="Grace by Shahzaib Instagram Journal"
              fallbackCategory="Social Journal"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Hover Scrim with Instagram Icon and Likes */}
            <div className="absolute inset-0 bg-[#1C1420]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white z-10">
              <Instagram className="w-5 h-5 self-end stroke-[1.5]" />
              <div>
                <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                <span className="text-[10px] font-mono text-[#F6D7B0] mt-1 block">
                  ♥ {item.likes}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
