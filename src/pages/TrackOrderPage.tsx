import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, MapPin, Clock, MessageCircle } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SITE_CONTENT } from '../data/content';

export const TrackOrderPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setSearched(true);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-6 md:px-10 max-w-[1000px] mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79] block mb-2">
            Courier Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1420] tracking-tight">
            Track Your <span className="italic font-normal text-gradient-signature">Order</span>
          </h1>
          <p className="text-xs md:text-sm text-[#6B5F6E] mt-3 leading-relaxed">
            Enter your Grace Order ID (e.g. GBS-74921) or phone number to check live dispatch and delivery status.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#1C1420]/8 shadow-sm mb-12">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F6E] stroke-[1.5]" />
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. GBS-74921) or mobile number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FBF8F4] border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/60 focus:outline-none focus:border-[#B76E79]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#1C1420] text-white hover:bg-[#B76E79] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Tracking Result */}
        {searched && (
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#1C1420]/8 shadow-sm space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C1420]/8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B76E79] block">
                  Active Shipment
                </span>
                <h3 className="font-serif text-2xl text-[#1C1420]">
                  Order #{trackingId.toUpperCase()}
                </h3>
              </div>
              <div className="text-xs font-mono text-[#6B5F6E]">
                Courier: <strong>Trax / TCS Express</strong> · COD Amount: <strong>Verified</strong>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-emerald-400 before:to-[#1C1420]/15">
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-6 mt-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1420] font-medium">Order Confirmed & Prepared</h4>
                  <p className="text-xs text-[#6B5F6E]">Central Atelier, Gulberg Lahore</p>
                  <span className="text-[10px] font-mono text-[#6B5F6E]/70">Today at 10:30 AM</span>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="absolute -left-6 mt-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1420] font-medium">Dispatched & In Transit</h4>
                  <p className="text-xs text-[#6B5F6E]">Departed Regional Sorting Hub via Air Express</p>
                  <span className="text-[10px] font-mono text-[#6B5F6E]/70">Today at 02:15 PM</span>
                </div>
              </div>

              <div className="relative flex items-start gap-4 opacity-60">
                <div className="absolute -left-6 mt-0.5 w-4 h-4 rounded-full bg-white border-2 border-[#1C1420]/30 shadow" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1420] font-medium">Out for Delivery</h4>
                  <p className="text-xs text-[#6B5F6E]">Courier agent assigned for doorstep delivery & COD collection</p>
                  <span className="text-[10px] font-mono text-[#6B5F6E]/70">Expected Tomorrow Morning</span>
                </div>
              </div>
            </div>

            {/* Need assistance */}
            <div className="p-4 rounded-2xl bg-[#F4EEE7] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#B76E79] stroke-[1.5]" />
                <span className="text-xs text-[#1C1420]">
                  Need urgent courier delivery instructions?
                </span>
              </div>
              <a
                href={`https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(
                  `Salam Grace by Shahzaib! Inquiring about order tracking for ${trackingId}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
              >
                <MessageCircle className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
