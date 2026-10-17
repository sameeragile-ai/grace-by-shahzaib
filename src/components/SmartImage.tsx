import React, { useState } from 'react';

export const getImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  fallbackCategory?: string;
  className?: string;
  aspectRatio?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  objectPosition?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackCategory = 'Grace Collection',
  className = '',
  aspectRatio,
  containerClassName = '',
  loading = 'lazy',
  fetchPriority,
  objectPosition = 'center center',
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const resolvedSrc = getImageUrl(src);

  // Synchronously check if already completed or cached
  React.useEffect(() => {
    if (!resolvedSrc) {
      setHasError(true);
      return;
    }
    setHasError(false);
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
    // Safety timer: ensure image is visible within 500ms even if onLoad did not fire (browser cache/eager load)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [resolvedSrc]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#F6D7B0]/30 via-[#E8A3B5]/20 to-[#C9B6E4]/30 ${containerClassName}`}
      style={{
        aspectRatio: aspectRatio || undefined,
      }}
    >
      {/* Soft champagne-to-rose placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F6D7B0]/40 via-[#E8A3B5]/30 to-[#F4EEE7] animate-pulse pointer-events-none z-0" />
      )}

      {hasError ? (
        /* Elegant serif fallback tile - NEVER shows broken image icon */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FBF8F4] to-[#F4EEE7] border border-[#1C1420]/6 z-10">
          <span className="font-serif text-lg md:text-xl text-[#B76E79] italic font-medium mb-1">
            {fallbackCategory}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B5F6E]">
            Grace by Shahzaib
          </span>
        </div>
      ) : (
        <img
          ref={(node) => {
            imgRef.current = node;
            if (node?.complete && node.naturalWidth > 0) {
              setIsLoaded(true);
            }
          }}
          src={resolvedSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={fetchPriority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            objectPosition,
            ...style,
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ease-out z-1 relative ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
