import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Truck, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { SITE_CONTENT } from '../data/content';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const freeShippingThreshold = 2500;
  const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 200;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `GBS-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(generatedId);
      setOrderConfirmed(true);
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F6D7B0', '#E8A3B5', '#C9B6E4', '#B76E79']
      });

      // Clear the cart
      clearCart();
    }, 700);
  };

  const handleSendToWhatsApp = () => {
    const orderText = `*ORDER CONFIRMATION: #${confirmedOrderId}*\nName: ${fullName}\nPhone: ${phone}\nCity: ${city}\nAddress: ${address}\nTotal Amount: Rs ${totalAmount.toLocaleString()} (Cash on Delivery)\n\nThank you Grace by Shahzaib!`;
    window.open(
      `https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(orderText)}`,
      '_blank'
    );
  };

  const resetAndClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setOrderConfirmed(false);
      setFullName('');
      setPhone('');
      setCity('');
      setAddress('');
      setOrderNotes('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-[#1C1420]/50 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#FBF8F4] rounded-3xl shadow-2xl border border-[#1C1420]/10 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[#1C1420]/8 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79]">
                  Express Checkout
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1420] mt-0.5">
                  {orderConfirmed ? 'Order Confirmed!' : 'Cash on Delivery (COD)'}
                </h3>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 text-[#6B5F6E] hover:text-[#1C1420] rounded-full hover:bg-[#F4EEE7] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {orderConfirmed ? (
              /* Success State */
              <div className="p-6 sm:p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-9 h-9 stroke-[1.5]" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-[#1C1420]">
                    Thank You, {fullName}!
                  </h4>
                  <p className="text-xs text-[#6B5F6E] max-w-md mx-auto leading-relaxed">
                    Your order <strong className="text-[#1C1420] font-mono">#{confirmedOrderId}</strong> has been logged. Our dispatch team will verify via phone and dispatch your parcel within 24-48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#1C1420]/6 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#6B5F6E]">Payment Method:</span>
                    <strong className="text-[#1C1420]">Cash on Delivery</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5F6E]">Destination:</span>
                    <span className="text-[#1C1420]">{city}, Pakistan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5F6E]">Total to Pay:</span>
                    <strong className="text-[#B76E79] font-mono text-sm">
                      Rs {totalAmount.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                    <span>Send Receipt to WhatsApp</span>
                  </button>
                  <button
                    onClick={resetAndClose}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1C1420] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B76E79] transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* Order Form */
              <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saima Akhtar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Delivery Option
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F4EEE7] text-xs text-[#1C1420]">
                      <Truck className="w-4 h-4 text-[#B76E79] stroke-[1.5]" />
                      <span>Cash on Delivery (Standard Express)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1420] mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Apartment #, Street, Sector, Area landmark..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1420] mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, gift wrap..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                  />
                </div>

                {/* Summary Strip */}
                <div className="p-3.5 rounded-2xl bg-[#F4EEE7]/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#6B5F6E]">
                    <ShieldCheck className="w-4 h-4 text-[#B76E79] stroke-[1.5]" />
                    <span>Pay only when package arrives</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1C1420]">
                    Total: Rs {totalAmount.toLocaleString()}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F6D7B0] via-[#E8A3B5] to-[#C9B6E4] text-[#1C1420] font-semibold text-xs uppercase tracking-wider hover:shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>Confirm Order (Rs {totalAmount.toLocaleString()})</span>
                        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
