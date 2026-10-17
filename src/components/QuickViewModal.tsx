import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, MessageCircle, Star, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE_CONTENT } from '../data/content';
import { SmartImage } from './SmartImage';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 700);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Salam Grace by Shahzaib! I would like to inquire about "${quickViewProduct.name}" priced at Rs ${quickViewProduct.price.toLocaleString()}. Is this currently in stock?`;
    window.open(
      `https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#1C1420]/50 backdrop-blur-sm"
        />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl bg-[#FBF8F4] rounded-3xl shadow-2xl border border-[#1C1420]/10 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1420] shadow-sm transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Product Media with SmartImage */}
          <div className="relative aspect-[4/5] md:aspect-auto h-72 md:h-full bg-[#F4EEE7] overflow-hidden">
            <SmartImage
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fallbackCategory={quickViewProduct.categoryLabel}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.bestSeller && (
              <span className="absolute top-4 left-4 z-10 text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 bg-[#1C1420] text-white rounded-md">
                Best Seller
              </span>
            )}
          </div>

          {/* Product Details & Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79]">
                  {quickViewProduct.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1420] mt-1 leading-snug">
                  {quickViewProduct.name}
                </h3>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl font-bold text-[#1C1420] tabular-nums">
                  Rs {quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="font-mono text-sm text-[#6B5F6E] line-through tabular-nums">
                    Rs {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-center gap-1 text-amber-500 text-xs ml-auto">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-medium text-[#1C1420]">{quickViewProduct.rating}</span>
                  <span className="text-[#6B5F6E]">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              <p className="text-xs text-[#6B5F6E] leading-relaxed pt-2">
                {quickViewProduct.description}
              </p>

              {/* Material / Details */}
              <div className="pt-2 text-xs text-[#1C1420] space-y-1">
                {quickViewProduct.fabricOrMaterial && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#6B5F6E]">Material:</span>
                    <span className="font-medium">{quickViewProduct.fabricOrMaterial}</span>
                  </div>
                )}
                {quickViewProduct.pieceCount && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#6B5F6E]">Format:</span>
                    <span className="font-medium">{quickViewProduct.pieceCount}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs pt-1">
                  <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                  <span>In Stock — Dispatched within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#1C1420]/15 rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#6B5F6E] hover:text-[#1C1420] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-medium text-[#1C1420]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#6B5F6E] hover:text-[#1C1420] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-full bg-[#1C1420] text-white hover:bg-[#B76E79] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 px-4 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
                <span>Ask via WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
