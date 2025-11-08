import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

const Products = () => {
  const {
    products,
    filters,
    loading,
    hasMore,
    setFilter,
    setFilters,
    getProducts,
    loadMoreProducts,
    resetFilters,
  } = useProductStore();

  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist } = useWishlistStore();

  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

 // Categories for filter
  const categories = [
    'All',
    'Accessories',
    'Clothing',
    'Fragrances',
    'Wallets & Belts',
    'Footwear',
    'Timepieces',
    'Eyewear',
    'Bags & Luggage',
  ];

  // Price ranges for filter
  const priceRanges = [
    { label: 'All Prices', min: '', max: '' },
    { label: 'Under 50', min: '', max: '50' },
    { label: '50 - 100', min: '50', max: '100' },
    { label: '100 - 200', min: '100', max: '200' },
    { label: '200 - 500', min: '200', max: '500' },
    { label: 'Over 500', min: '500', max: '' },
  ];

  // Initial load and check for category in URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    
    if (categoryFromUrl) {
      // Set category filter from URL
      setFilter('category', categoryFromUrl);
    }
    
    getProducts();
  }, [searchParams,getProducts, setFilter]);

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getProducts();
  };

  const handleCategoryChange = (category) => {
    setFilter('category', category === 'All' ? '' : category);
    getProducts();
  };

  const handleCategoryClick = (category) => {
    setFilter('category', category);
    getProducts();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePriceRangeChange = (range) => {
    setFilters({
      minPrice: range.min,
      maxPrice: range.max,
    });
    getProducts();
  };

  const handleResetFilters = () => {
    resetFilters();
    getProducts();
  };

  const handleLoadMore = () => {
    loadMoreProducts();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            {filters.category ? filters.category.toUpperCase() : 'OUR COLLECTION'}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl w-full">
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full px-6 py-4 bg-zinc-950 border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide focus:outline-none focus:border-white/30 pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* View Mode and Filter Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 bg-zinc-950 border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-black' : 'text-white/60'
                  }`}
                >
                  <Grid size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-white text-black' : 'text-white/60'
                  }`}
                >
                  <List size={18} />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-950 border border-white/10 text-white hover:border-white/30 transition-colors font-light tracking-wider text-sm"
              >
                <SlidersHorizontal size={18} />
                FILTERS
              </motion.button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.search || filters.category || filters.minPrice || filters.maxPrice) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-white/60 text-sm font-light tracking-wide">
                Active Filters:
              </span>
              {filters.search && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-light tracking-wider flex items-center gap-2">
                  Search: {filters.search}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setFilter('search', '');
                      getProducts();
                    }}
                  />
                </span>
              )}
              {filters.category && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-light tracking-wider flex items-center gap-2">
                  Category: {filters.category}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setFilter('category', '');
                      getProducts();
                    }}
                  />
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-light tracking-wider flex items-center gap-2">
                  Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setFilters({ minPrice: '', maxPrice: '' });
                      getProducts();
                    }}
                  />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-red-500 text-xs font-light tracking-wider hover:underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-zinc-950 border border-white/10 mt-4">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-white font-light tracking-[0.2em] text-sm mb-4 uppercase">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`block w-full text-left px-4 py-2 border transition-colors ${
                            (category === 'All' && !filters.category) ||
                            filters.category === category
                              ? 'border-white bg-white text-black'
                              : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          } font-light tracking-wide text-sm`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="text-white font-light tracking-[0.2em] text-sm mb-4 uppercase">
                      Price Range
                    </h3>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <button
                          key={index}
                          onClick={() => handlePriceRangeChange(range)}
                          className={`block w-full text-left px-4 py-2 border transition-colors ${
                            filters.minPrice === range.min && filters.maxPrice === range.max
                              ? 'border-white bg-white text-black'
                              : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          } font-light tracking-wide text-sm`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-white/60 font-light tracking-wide text-sm">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </motion.div>

        {/* Products Grid/List */}
        {loading && products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white"></div>
            <p className="text-white/60 font-light tracking-wider text-sm mt-4">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 font-light tracking-wider text-lg mb-4">
              No products found
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetFilters}
              className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
            >
              Clear Filters
            </motion.button>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-6'
              }
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col"
                    >
                      {/* Product Image */}
                      <Link to={`/products/${product._id}`}>
                        <div className="relative h-80 overflow-hidden">
                          <img
                            src={product.images[0]?.url}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60" />

                          {/* Discount Badge */}
                          {product.discount > 0 && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 backdrop-blur-md">
                              <span className="text-white text-xs tracking-[0.2em] font-light uppercase">
                                -{product.discount}%
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-6 grow flex flex-col justify-between">
                        <div>
                          {/* Category Badge - Clickable */}
                          <button
                            onClick={() => handleCategoryClick(product.category)}
                            className="text-white/50 hover:text-white text-xs tracking-[0.25em] font-light uppercase mb-2 transition-colors inline-block"
                          >
                            {product.category}
                          </button>
                          
                          <Link to={`/products/${product._id}`}>
                            <h3 className="text-white font-light tracking-widest text-xl mb-3 line-clamp-2 min-h-14 hover:text-white/80 transition-colors">
                              {product.title}
                            </h3>
                          </Link>

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={
                                      i < Math.floor(product.rating)
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-white/20'
                                    }
                                  />
                                ))}
                              </div>
                              <span className="text-white/40 text-xs font-light">
                                ({product.reviews || 0})
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          {/* Price */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-white font-light tracking-wider text-2xl">
                              {product.price.currency === 'USD' ? '$' : '₹'}{product.price.amount}
                            </span>
                            {product.originalPrice && (
                              <span className="text-white/40 font-light tracking-wider text-sm line-through">
                                {product.price.currency === 'USD' ? '$' : '₹'}{product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => addToCart(product._id, 1)}
                              className="flex-1 py-3 bg-white text-black font-light tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                            >
                              <ShoppingCart size={16} />
                              ADD TO CART
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleWishlist(product._id)}
                              className={`p-3 border transition-colors ${
                                isInWishlist(product._id)
                                  ? 'border-red-500 bg-red-500/20'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <Heart
                                size={16}
                                className={
                                  isInWishlist(product._id)
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-white'
                                }
                              />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {hasMore && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="px-10 py-4 border border-white/20 text-white hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-sm uppercase"
                >
                  LOAD MORE
                </motion.button>
              </motion.div>
            )}

            {/* Loading More Indicator */}
            {loading && products.length > 0 && (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white"></div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;