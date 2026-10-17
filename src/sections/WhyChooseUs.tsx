import React from 'react';
import { motion } from 'motion/react';
import { Truck, CreditCard, Clock, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery Nationwide",
      description: "Fast, tracked shipping straight to your doorstep across all cities in Pakistan on orders over Rs 2,500.",
      tag: "Express Dispatch"
    },
    {
      icon: CreditCard,
      title: "Easy Payment & COD",
      description: "Pay securely via Cash on Delivery (COD) upon receiving your parcel, or via direct Bank Transfer & JazzCash.",
      tag: "Inspect on Arrival"
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Receive instant SMS and WhatsApp courier tracking from fulfillment to final doorstep delivery.",
      tag: "24/48h Turnaround"
    },
    {
      icon: HelpCircle,
      title: "Dedicated WhatsApp Care",
      description: "Direct personal support for styling advice, measurements, and order modifications 7 days a week.",
      tag: "Personal Concierge"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
            The Grace Promise
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight">
          Why Shop with <span className="italic font-normal text-gradient-signature">Confidence</span>
        </h2>
        <p className="text-xs md:text-sm text-[#6B5F6E] mt-3 leading-relaxed">
          We combine bespoke craftsmanship with modern shopping convenience to deliver an uncompromising luxury experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#1C1420]/8 hover:border-[#E8A3B5] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F4EEE7] text-[#B76E79] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79] block mb-1.5">
                  {item.tag}
                </span>
                <h3 className="font-serif text-xl text-[#1C1420] mb-2 font-medium">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B5F6E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
