import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check cursor data attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorEl) {
          const text = cursorEl.getAttribute('data-cursor') || '';
          setCursorText(text);
          setIsHovered(true);
        } else {
          setCursorText('');
          const interactive = target.closest('a, button, input, select, textarea, [role="button"]');
          setIsHovered(!!interactive);
        }

        // Magnetic hover calculation for elements with data-magnetic
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
          if (dist < 80) {
            const pullX = (mouseX - centerX) * 0.28;
            const pullY = (mouseY - centerY) * 0.28;
            magneticEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
          }
        }
      }
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    // Smooth spring lerp loop for the ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    animationFrameId = requestAnimationFrame(render);

    // Reset magnetic elements on mouseout
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;
        if (magneticEl && (!e.relatedTarget || !magneticEl.contains(e.relatedTarget as Node))) {
          magneticEl.style.transform = 'translate3d(0, 0, 0)';
          magneticEl.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        }
      }
    };
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Small solid dot (8px) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#1C1420] transition-transform duration-75 ease-out will-change-transform"
        style={{
          display: cursorText ? 'none' : 'block',
        }}
      />

      {/* Larger following ring (36px or expanded with text) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-300 ease-out will-change-transform ${
          cursorText
            ? '-ml-9 -mt-9 w-[72px] h-[72px] bg-[#1C1420] text-[#FBF8F4] border-transparent shadow-xl'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 border-[#B76E79] bg-[#E8A3B5]/20 backdrop-blur-[2px]'
            : '-ml-[18px] -mt-[18px] w-9 h-9 border-[#1C1420]/30'
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[11px] font-medium uppercase tracking-widest text-[#FBF8F4]"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
