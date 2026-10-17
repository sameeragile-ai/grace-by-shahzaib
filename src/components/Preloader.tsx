import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const brandName = "Grace by Shahzaib";

  useEffect(() => {
    // Check if shown in this session
    const hasLoaded = sessionStorage.getItem('grace_preloader_seen');
    if (hasLoaded) {
      if (onComplete) onComplete();
      return;
    }

    setShouldShow(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShouldShow(false);
            sessionStorage.setItem('grace_preloader_seen', 'true');
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FBF8F4]"
        >
          {/* Subtle noise and radial luxury glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,215,176,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* Staggered brand letters */}
          <div className="relative z-10 flex overflow-hidden">
            {brandName.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1C1420] ${
                  char === ' ' ? 'mr-3' : ''
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 text-xs tracking-[0.25em] uppercase text-[#6B5F6E]"
          >
            HAUTE COUTURE · JEWELLERY · TIMEPIECES
          </motion.p>

          {/* Thin signature gradient progress bar */}
          <div className="relative mt-10 w-48 sm:w-64 h-[2px] bg-[#E8A3B5]/20 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <span className="mt-3 text-[11px] font-mono tracking-widest text-[#B76E79]">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
