import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Eye, Star, Filter, ArrowUpDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SITE_CONTENT, Product } from '../data/content';
import { useCart } from '../context/CartContext';
import { SmartImage } from '../components/SmartImage';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, setQuickViewProduct } = useCart();

  const [activeTag, setActiveTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Find category details
  const category = SITE_CONTENT.categories.find((c) => c.slug === slug) || SITE_CONTENT.categories[0];

  // Filter products by category and activeTag
  const filteredProducts = useMemo(() => {
    let list = SITE_CONTENT.products.filter((p) => p.category === category.slug);

    if (activeTag !== 'all') {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(activeTag.toLowerCase()) ||
        p.description.toLowerCase().includes(activeTag.toLowerCase()) ||
        (p.fabricOrMaterial && p.fabricOrMaterial.toLowerCase().includes(activeTag.toLowerCase())) ||
        (p.pieceCount && p.pieceCount.toLowerCase().includes(activeTag.toLowerCase()))
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
  }, [category.slug, activeTag, sortBy]);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-6 md:px-10 max-w-[1360px] mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#6B5F6E]">
          <Link to="/" className="hover:text-[#1C1420] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Home</span>
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/products" className="hover:text-[#1C1420] transition-colors">
            Categories
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#1C1420] font-medium">{category.name}</span>
        </div>

        {/* Hero Editorial Banner */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#F4EEE7] border border-[#1C1420]/8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16">
              <span className="font-serif text-sm italic text-[#B76E79] block mb-2">
                Department {category.number}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1C1420] tracking-tight leading-[1.08] mb-4">
                {category.name}
              </h1>
              <p className="text-sm md:text-base text-[#6B5F6E] max-w-xl leading-relaxed mb-6">
                {category.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-[#1C1420]">
                <span>{filteredProducts.length} Products Available</span>
                <span aria-hidden="true">·</span>
                <span>Authentic Guarantee</span>
                <span aria-hidden="true">·</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full min-h-[300px] overflow-hidden relative">
              <SmartImage
                src={category.bannerImage || category.image}
                alt={category.name}
                fallbackCategory={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#F4EEE7] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#1C1420]/8">
          {/* Sub-tags */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTag('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                activeTag === 'all'
                  ? 'bg-[#1C1420] text-white'
                  : 'bg-white border border-[#1C1420]/10 text-[#6B5F6E] hover:text-[#1C1420]'
              }`}
            >
              All Designs
            </button>
            {category.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[#1C1420] text-white'
                    : 'bg-white border border-[#1C1420]/10 text-[#6B5F6E] hover:text-[#1C1420]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 text-xs text-[#6B5F6E] self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#1C1420]/15 rounded-lg px-2.5 py-1 text-xs text-[#1C1420] focus:outline-none focus:border-[#B76E79]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="font-serif text-2xl text-[#1C1420] mb-2">No matching items found</h3>
            <p className="text-xs text-[#6B5F6E] mb-6">Try clearing your active filter.</p>
            <button
              onClick={() => setActiveTag('all')}
              className="px-6 py-2.5 rounded-full bg-[#1C1420] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between rounded-2xl bg-white border border-[#1C1420]/8 p-3 sm:p-4 hover:shadow-xl hover:border-[#E8A3B5]/60 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F4EEE7] mb-3">
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      fallbackCategory={product.fabricOrMaterial || product.categoryLabel}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.bestSeller && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#1C1420] text-white rounded-md">
                        Best Seller
                      </span>
                    )}

                    {/* Quick View and Add to Bag buttons on Hover */}
                    <div className="absolute inset-0 bg-[#1C1420]/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4 z-10">
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

        {/* Other Categories Switcher */}
        <div className="mt-24 pt-12 border-t border-[#1C1420]/8">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B76E79] block mb-4">
            Browse Other Departments
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITE_CONTENT.categories
              .filter((c) => c.slug !== category.slug)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/category/${other.slug}`}
                  className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-[#1C1420]/8 hover:border-[#B76E79] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <SmartImage
                        src={other.image}
                        alt={other.name}
                        fallbackCategory={other.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#B76E79]">
                        Department {other.number} · {SITE_CONTENT.getCategoryCount(other.slug)} Products
                      </span>
                      <h4 className="font-serif text-xl text-[#1C1420] group-hover:text-[#B76E79] transition-colors">
                        {other.name}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1420] group-hover:text-[#B76E79] transition-colors">
                    Explore →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
