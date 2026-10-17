import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Mail, MapPin, Phone, Send, CheckCircle, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubmitted(false);
      }, 4000);
    }, 600);
  };

  const openDirectWhatsApp = () => {
    const text = `Salam Grace by Shahzaib! My name is ${name || 'a customer'}. I would like to inquire about your collections.`;
    window.open(
      `https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact details & WhatsApp Concierge */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
                Get In Touch
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight">
              We are Here to <span className="italic font-normal text-gradient-signature">Assist</span> You
            </h2>
            <p className="text-xs md:text-sm text-[#6B5F6E] mt-3 leading-relaxed">
              Have questions regarding sizing, custom stitching, wholesale inquiries, or delivery tracking? Reach our concierge team directly.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/${SITE_CONTENT.brand.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-600/20 hover:bg-emerald-50 hover:border-emerald-600/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                  Instant Response
                </span>
                <h4 className="font-serif text-base text-[#1C1420] font-medium group-hover:text-emerald-800 transition-colors">
                  WhatsApp Concierge ({SITE_CONTENT.brand.phone})
                </h4>
                <p className="text-xs text-[#6B5F6E] mt-0.5">
                  Available 7 days a week: 10:00 AM – 11:00 PM PKT
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1C1420]/8">
              <div className="w-10 h-10 rounded-xl bg-[#F4EEE7] text-[#B76E79] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B76E79] block">
                  Official Email
                </span>
                <a
                  href={`mailto:${SITE_CONTENT.brand.email}`}
                  className="font-serif text-base text-[#1C1420] hover:text-[#B76E79] transition-colors"
                >
                  {SITE_CONTENT.brand.email}
                </a>
                <p className="text-xs text-[#6B5F6E] mt-0.5">
                  Order confirmations & corporate queries
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1C1420]/8">
              <div className="w-10 h-10 rounded-xl bg-[#F4EEE7] text-[#B76E79] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B76E79] block">
                  Showroom & Dispatch
                </span>
                <p className="font-serif text-base text-[#1C1420]">
                  {SITE_CONTENT.brand.address}
                </p>
                <p className="text-xs text-[#6B5F6E] mt-0.5">
                  Express courier distribution nationwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with Real-Time Validation */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[28px] border border-[#1C1420]/8 shadow-sm">
          <h3 className="font-serif text-2xl text-[#1C1420] mb-2">
            Send an Inquiry
          </h3>
          <p className="text-xs text-[#6B5F6E] mb-8 leading-relaxed">
            Fill out the form below and an associate will get back to you within 2 hours.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-2xl text-[#1C1420]">
                  Message Received!
                </h4>
                <p className="text-xs text-[#6B5F6E] max-w-sm mx-auto">
                  Thank you for reaching out. We will respond promptly to your provided details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#1C1420]/10 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ayesha@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#1C1420]/10 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#1C1420]/10 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1420] mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#1C1420]/10 text-xs text-[#1C1420] focus:outline-none focus:border-[#B76E79] transition-colors"
                    >
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Tracking">Order Status & Tracking</option>
                      <option value="Size & Stitching">Custom Stitching & Sizing</option>
                      <option value="Wholesale / Reseller">Wholesale / Reseller</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1420] mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can assist you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#1C1420]/10 text-xs text-[#1C1420] placeholder-[#6B5F6E]/50 focus:outline-none focus:border-[#B76E79] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#1C1420] text-white hover:bg-[#B76E79] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={openDirectWhatsApp}
                    className="py-3.5 px-6 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-600/30 hover:bg-emerald-100 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
