import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  X,
  Trash2,
  CheckSquare,
  Square,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";

const Wishlist = () => {
  const { 
    wishlist, 
    fetchWishlist, 
    toggleWishlist,
    selectAll,
    toggleSelectAll,
    toggleSelect,
    removeSelected,
    selectedCount,
    selectedTotal
  } = useWishlistStore();
  
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addSelectedToCart = () => {
    const selectedItems = wishlist.filter((item) => item.selected);
    selectedItems.forEach((item) => {
      addToCart(item.productId, 1);
      toggleWishlist(item.productId);
    });
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
    exit: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.3 },
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
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Heart size={16} className="text-white/60 fill-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Saved For Later
            </span>
            <Heart size={16} className="text-white/60 fill-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            MY WISHLIST
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <Heart size={64} className="text-white/20 mx-auto mb-6" />
            <h2 className="text-white font-light tracking-[0.2em] text-2xl mb-4">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-white/60 font-light tracking-wide mb-8">
              Start adding your favorite luxury items
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group px-10 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                EXPLORE COLLECTION
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 bg-zinc-950 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  {selectAll ? (
                    <CheckSquare size={20} strokeWidth={1.5} />
                  ) : (
                    <Square size={20} strokeWidth={1.5} />
                  )}
                  <span className="font-light tracking-wider text-sm">
                    SELECT ALL
                  </span>
                </motion.button>

                {selectedCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      {selectedCount} selected
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={removeSelected}
                      className="flex items-center gap-2 text-red-500/70 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                      <span className="font-light tracking-wide text-sm">
                        REMOVE
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/60 font-light tracking-wide text-sm">
                  {wishlist.length}{" "}
                  {wishlist.length === 1 ? "item" : "items"}
                </span>
              </div>
            </motion.div>

            {/* Wishlist Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              <AnimatePresence>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.productId}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4 }}
                      className={`relative overflow-hidden bg-zinc-950 border ${
                        item.selected ? "border-white/40" : "border-white/10"
                      } hover:border-white/20 transition-all duration-500 h-full flex flex-col`}
                    >
                      {/* Selection Overlay */}
                      <AnimatePresence>
                        {item.selected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/5 z-10 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden shrink-0">
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Select Button */}
                        {item.stock > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleSelect(item.productId)}
                            className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-colors z-20"
                          >
                            {item.selected ? (
                              <CheckSquare
                                size={18}
                                className="text-white"
                                strokeWidth={1.5}
                              />
                            ) : (
                              <Square
                                size={18}
                                className="text-white"
                                strokeWidth={1.5}
                              />
                            )}
                          </motion.button>
                        )}

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWishlist(item.productId)}
                          className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md border border-white/20 hover:bg-red-500/20 hover:border-red-500/50 transition-colors z-20"
                        >
                          <X
                            size={18}
                            className="text-white hover:text-red-500"
                            strokeWidth={1.5}
                          />
                        </motion.button>

                        {/* Stock Status */}
                        {item.stock <= 0 && (
                          <div className="absolute bottom-4 left-4 right-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/50">
                            <p className="text-red-500 text-xs tracking-[0.2em] font-light uppercase text-center">
                              Out of Stock
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6 grow flex flex-col justify-between">
                        <div>
                          <p className="text-white/50 text-xs tracking-[0.25em] font-light uppercase mb-2">
                            {item.category}
                          </p>
                          <h3 className="text-white font-light tracking-widest text-xl mb-3 line-clamp-2 min-h-14">
                            {item.title}
                          </h3>
                        </div>

                        <div>
                          {/* Price */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-white font-light tracking-wider text-2xl">
                              ${item.price.amount}
                            </span>
                            {item.originalPrice && (
                              <span className="text-white/40 font-light tracking-wider text-sm line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          {item.stock > 0 && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                addToCart(item.productId, 1);
                                toggleWishlist(item.productId);
                              }}
                              className="w-full py-3 bg-white text-black font-light tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                            >
                              <ShoppingCart size={16} />
                              ADD TO CART
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-white via-white/80 to-white"
                        initial={{ width: 0 }}
                        animate={{ width: item.selected ? "100%" : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Action Bar */}
            <AnimatePresence>
              {selectedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                >
                  <div className="bg-zinc-950 border border-white/20 p-6 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center gap-8">
                      <div className="text-white">
                        <p className="text-xs tracking-[0.2em] font-light uppercase text-white/60 mb-1">
                          {selectedCount} Items Selected
                        </p>
                        <p className="text-2xl font-light tracking-wider">
                          ${selectedTotal.toFixed(2)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addSelectedToCart}
                        className="group px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center gap-2"
                      >
                        ADD TO CART
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;