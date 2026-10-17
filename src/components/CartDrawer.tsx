import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE_CONTENT } from '../data/content';
import { SmartImage } from './SmartImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    setIsCheckoutOpen
  } = useCart();

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffForFreeShipping = freeShippingThreshold - subtotal;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppQuickCheckout = () => {
    if (cart.length === 0) return;
    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - Rs ${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message = `Salam Grace by Shahzaib! I would like to place an order:\n\n${itemsSummary}\n\n*Subtotal: Rs ${subtotal.toLocaleString()}*\nPayment: Cash on Delivery\n\nPlease confirm availability and dispatch.`;
    window.open(
      `https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#1C1420]/40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-[#FBF8F4] shadow-2xl flex flex-col border-l border-[#1C1420]/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#1C1420]/8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#B76E79] stroke-[1.5]" />
                  <h3 className="font-serif text-2xl text-[#1C1420]">
                    Your Shopping Bag
                  </h3>
                  <span className="text-xs font-mono text-[#6B5F6E] bg-[#F4EEE7] px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#6B5F6E] hover:text-[#1C1420] transition-colors rounded-full hover:bg-[#F4EEE7] cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="px-6 py-3 bg-[#F4EEE7]/80 border-b border-[#1C1420]/6">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  {diffForFreeShipping <= 0 ? (
                    <span className="text-[#B76E79] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                      You have unlocked Free Express Delivery!
                    </span>
                  ) : (
                    <span className="text-[#6B5F6E]">
                      Add <strong className="text-[#1C1420] font-mono">Rs {diffForFreeShipping.toLocaleString()}</strong> more for Free Shipping
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-[#6B5F6E]">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E8A3B5]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#B76E79] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#1C1420]/6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#F4EEE7] flex items-center justify-center text-[#B76E79] mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-xl text-[#1C1420] mb-1">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-[#6B5F6E] max-w-xs mb-6">
                      Explore our handcrafted pret suits, fine zircons, or smart wearables.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#1C1420] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B76E79] transition-colors cursor-pointer"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F4EEE7] shrink-0 border border-[#1C1420]/6">
                        <SmartImage
                          src={product.image}
                          alt={product.name}
                          fallbackCategory={product.categoryLabel}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-serif text-base text-[#1C1420] line-clamp-1">
                              {product.name}
                            </h5>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-[#6B5F6E] hover:text-rose-600 transition-colors cursor-pointer p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                            </button>
                          </div>
                          <span className="text-[11px] text-[#6B5F6E] block mt-0.5">
                            {product.categoryLabel}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#1C1420]/15 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="px-2.5 py-1 text-[#6B5F6E] hover:text-[#1C1420] hover:bg-[#F4EEE7] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 stroke-[1.5]" />
                            </button>
                            <span className="px-3 text-xs font-mono font-medium text-[#1C1420]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="px-2.5 py-1 text-[#6B5F6E] hover:text-[#1C1420] hover:bg-[#F4EEE7] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[1.5]" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-mono text-sm font-semibold text-[#1C1420] tabular-nums">
                              Rs {(product.price * quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout Actions */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#1C1420]/8 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6B5F6E]">
                      <span>Subtotal</span>
                      <span className="font-mono text-sm font-semibold text-[#1C1420] tabular-nums">
                        Rs {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#6B5F6E]">
                      <span>Delivery</span>
                      <span>
                        {subtotal >= freeShippingThreshold ? (
                          <strong className="text-emerald-600 font-mono">FREE</strong>
                        ) : (
                          <span className="font-mono">Rs 200</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1C1420]/6 flex justify-between items-baseline">
                    <span className="font-serif text-lg text-[#1C1420]">Total Amount</span>
                    <span className="font-mono text-xl font-bold text-[#1C1420] tabular-nums">
                      Rs {(subtotal + (subtotal >= freeShippingThreshold ? 0 : 200)).toLocaleString()}
                    </span>
                  </div>

                  {/* Primary Checkout Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4] text-[#1C1420] font-semibold text-xs uppercase tracking-wider hover:shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Cash on Delivery</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </button>

                  {/* Secondary Instant WhatsApp Checkout */}
                  <button
                    onClick={handleWhatsAppQuickCheckout}
                    className="w-full py-3 px-6 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-800 font-semibold text-xs tracking-wider uppercase hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
                    <span>Order via WhatsApp (1-Tap)</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
