import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import { SITE_CONTENT } from '../data/content';

export const Marquee: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate speed factor
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Combine multiple repeats of marquee words
  const repeatedWords = [...SITE_CONTENT.marqueeWords, ...SITE_CONTENT.marqueeWords, ...SITE_CONTENT.marqueeWords];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-[#F4EEE7] border-y border-[#1C1420]/8">
      {/* Subtle side fades */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#F4EEE7] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#F4EEE7] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {repeatedWords.map((word, index) => (
          <div key={index} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-serif text-lg md:text-xl text-[#1C1420] tracking-tight">
              {word}
            </span>
            <span className="text-[#B76E79] text-xs font-serif select-none">
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
