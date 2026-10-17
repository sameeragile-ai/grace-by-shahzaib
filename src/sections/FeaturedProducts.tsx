import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { SITE_CONTENT, Product } from '../data/content';
import { useCart } from '../context/CartContext';

export const FeaturedProducts: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { label: 'All Curations', value: 'all' },
    { label: 'Premium Apparel', value: 'premium-apparel' },
    { label: 'Jewellery & Timepieces', value: 'fine-jewellery-timepieces' },
    { label: 'Mobile Tech', value: 'mobile-accessories' },
  ];

  const displayedProducts = SITE_CONTENT.products.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79] stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79]">
              Hand-Selected Pieces
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1420] tracking-tight">
            New <span className="italic font-normal text-gradient-signature">Arrivals</span> & Best Sellers
          </h2>
        </div>

        {/* Interactive Filter Control */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F4EEE7] rounded-full overflow-x-auto max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.value
                  ? 'bg-white text-[#1C1420] shadow-sm font-semibold'
                  : 'text-[#6B5F6E] hover:text-[#1C1420]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid: 4 columns desktop, 2 columns mobile */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      >
        <AnimatePresence>
          {displayedProducts.slice(0, 12).map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-[#1C1420]/8 p-3 sm:p-4 hover:shadow-xl hover:border-[#E8A3B5]/60 transition-all duration-300"
            >
              {/* Image Container with Hover Quick Actions */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F4EEE7] mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                  {product.bestSeller && (
                    <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#1C1420] text-white rounded-md">
                      Best Seller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 bg-[#B76E79] text-white rounded-md">
                      Save Rs {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Floating Quick Action Overlay on Desktop Hover */}
                <div className="absolute inset-0 bg-[#1C1420]/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-2.5 rounded-full bg-white text-[#1C1420] hover:text-[#B76E79] shadow-lg hover:scale-110 transition-all cursor-pointer"
                    title="Quick View"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4 stroke-[1.5]" />
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2.5 rounded-full bg-[#1C1420] text-white hover:bg-[#B76E79] shadow-lg hover:scale-110 transition-all cursor-pointer"
                    title="Add to Bag"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#6B5F6E] block mb-1">
                    {product.categoryLabel}
                  </span>
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-base sm:text-lg text-[#1C1420] line-clamp-2 leading-snug group-hover:text-[#B76E79] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#1C1420]/6 mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#1C1420] tabular-nums">
                      Rs {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-xs text-[#6B5F6E] line-through ml-2 tabular-nums">
                        Rs {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[#1C1420] font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Mobile Direct Add Button */}
                <div className="mt-3 pt-2 md:hidden">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2 px-3 rounded-lg bg-[#F4EEE7] hover:bg-[#1C1420] hover:text-white text-[#1C1420] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All CTA */}
      <div className="mt-14 text-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1420] bg-white border border-[#1C1420]/15 hover:border-[#B76E79] hover:bg-[#F4EEE7] shadow-sm transition-all"
        >
          View Complete Catalog ({SITE_CONTENT.products.length} Items)
        </Link>
      </div>
    </section>
  );
};
