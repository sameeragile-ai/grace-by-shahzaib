import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackCategory?: string;
  className?: string;
  aspectRatio?: string;
  containerClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackCategory = 'Grace Collection',
  className = '',
  aspectRatio,
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Normalize path using BASE_URL
  const resolveSrc = (imagePath: string): string => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    // Remove leading slash if any to append to BASE_URL cleanly
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = import.meta.env.BASE_URL || '/';
    return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  };

  const resolvedSrc = resolveSrc(src);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#F6D7B0]/30 via-[#E8A3B5]/20 to-[#C9B6E4]/30 ${containerClassName}`}
      style={{ aspectRatio: aspectRatio || undefined }}
    >
      {/* Soft blurred gradient placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F6D7B0]/40 via-[#E8A3B5]/30 to-[#F4EEE7] animate-pulse pointer-events-none" />
      )}

      {hasError ? (
        /* Elegant Fallback Tile */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FBF8F4] to-[#F4EEE7] border border-[#1C1420]/6">
          <span className="font-serif text-lg md:text-xl text-[#B76E79] italic font-medium mb-1">
            {fallbackCategory}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B5F6E]">
            Grace by Shahzaib
          </span>
        </div>
      ) : (
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-400 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
