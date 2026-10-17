import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Eye, Star, ArrowUpDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SITE_CONTENT, Product } from '../data/content';
import { useCart } from '../context/CartContext';

export const ProductsPage: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { label: 'All Curations', value: 'all' },
    { label: 'Premium Apparel', value: 'premium-apparel' },
    { label: 'Jewellery & Timepieces', value: 'fine-jewellery-timepieces' },
    { label: 'Mobile & Tech', value: 'mobile-accessories' },
  ];

  const filteredProducts = useMemo(() => {
    let list = SITE_CONTENT.products;

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B76E79] block mb-2">
            The Complete Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1C1420] tracking-tight">
            All Curated <span className="italic font-normal text-gradient-signature">Collections</span>
          </h1>
          <p className="text-xs md:text-sm text-[#6B5F6E] mt-3 leading-relaxed">
            Browse our full catalog of Pakistani luxury suits, heirloom zircon jewellery, classic chronographs, and wireless studio accessories.
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F4EEE7] rounded-full overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-white text-[#1C1420] shadow-sm font-semibold'
                      : 'text-[#6B5F6E] hover:text-[#1C1420]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F6E] stroke-[1.5]" />
              <input
                type="text"
                placeholder="Search suits, watches, mics, jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#1C1420]/15 text-xs text-[#1C1420] placeholder-[#6B5F6E]/60 focus:outline-none focus:border-[#B76E79]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-[#6B5F6E] shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 stroke-[1.5]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#1C1420]/15 rounded-lg px-3 py-1.5 text-xs text-[#1C1420] focus:outline-none focus:border-[#B76E79]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-[#6B5F6E] font-mono">
            Showing {filteredProducts.length} results
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-[#1C1420] mb-2">No matching products found</h3>
            <p className="text-xs text-[#6B5F6E] mb-6">
              Try searching with another keyword or resetting your filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#1C1420] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  className="group flex flex-col justify-between rounded-2xl bg-white border border-[#1C1420]/8 p-3 sm:p-4 hover:shadow-xl hover:border-[#E8A3B5]/60 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F4EEE7] mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.bestSeller && (
                      <span className="absolute top-2.5 left-2.5 text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#1C1420] text-white rounded-md">
                        Best Seller
                      </span>
                    )}

                    {/* Quick View and Add to Bag buttons on Hover */}
                    <div className="absolute inset-0 bg-[#1C1420]/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2.5 rounded-full bg-white text-[#1C1420] hover:text-[#B76E79] shadow-lg hover:scale-110 transition-all cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4 stroke-[1.5]" />
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="p-2.5 rounded-full bg-[#1C1420] text-white hover:bg-[#B76E79] shadow-lg hover:scale-110 transition-all cursor-pointer"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#6B5F6E] block mb-1">
                        {product.fabricOrMaterial || product.categoryLabel}
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
          </div>
        )}
      </div>
    </PageTransition>
  );
};
