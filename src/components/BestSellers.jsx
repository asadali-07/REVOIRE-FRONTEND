import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useCartStore} from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

const BestSellers = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { addToCart } = useCartStore();
  const { toggleWishlist, wishlist } = useWishlistStore();

  const products = [
    {
      id: "690ce377ba44b7796ccccd9a",
      name: 'Classic Leather Wallet',
      category: 'Accessories',
      price: 999,
      originalPrice: 1499,
      image: "https://ik.imagekit.io/c22wilw9s/products/a2568114-b181-44d3-8c1f-7033d38e7707_llU6DF9RG",
      rating: 4.9,
      reviews: 342,
      badge: 'Best Seller',
    },
    {
      id: "690ce40fba44b7796ccccd9d",
      name: 'Premium Wool Suit',
      category: 'Clothing',
      price: 1499,
      originalPrice: 1699,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Clothes.jpg?updatedAt=1762455301017',
      rating: 5.0,
      reviews: 289,
      badge: 'Editor\'s Choice',
    },
    {
      id: "690ce56bde1709eeff41e416",
      name: 'Signature Eau de Parfum',
      category: 'Fragrances',
      price: 1299,
      originalPrice: 1799,
      image: 'https://ik.imagekit.io/c22wilw9s/products/ed0a852f-405b-473e-9cc3-6c6ca066129f_H-lwIlZzg',
      rating: 4.8,
      reviews: 512,
      badge: 'Trending',
    },
    {
      id: "690ce5e2de1709eeff41e419",
      name: 'Swiss Chronograph Watch',
      category: 'Timepieces',
      price: 3999,
      originalPrice: null,
      image: 'https://ik.imagekit.io/c22wilw9s/products/7e1b90cd-0e0c-4f9c-be84-77e7aa398c18_VWvJinHRK',
      rating: 5.0,
      reviews: 156,
      badge: 'Limited Edition',
    },
    {
      id: "690ce64cde1709eeff41e41c",
      name: 'Italian Leather Shoes',
      category: 'Footwear',
      price: 1699,
      originalPrice: 1999,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Shoes.jpg?updatedAt=1762455170279',
      rating: 4.7,
      reviews: 428,
      badge: 'Best Seller',
    },
    {
      id: "690ce6bade1709eeff41e41f",
      name: 'Designer Sunglasses',
      category: 'Eyewear',
      price: 1199,
      originalPrice: 1599,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Sunglasses.jpg?updatedAt=1762455301017',
      rating: 4.9,
      reviews: 367,
      badge: 'New Arrival',
    },
    {
      id: "690ce721de1709eeff41e422",
      name: 'Premium Leather Belt',
      category: 'Accessories',
      price: 1399,
      originalPrice: 1599,
      image: 'https://ik.imagekit.io/c22wilw9s/products/a2568114-b181-44d3-8c1f-7033d38e7707_llU6DF9RG',
      rating: 4.8,
      reviews: 294,
      badge: 'Best Seller',
    },
    {
      id: "690ce7c6de1709eeff41e425",
      name: 'Premium Leather Bag',
      category: 'Bags & Luggage',
      price: 2999,
      originalPrice: 3999,
      image: 'https://ik.imagekit.io/c22wilw9s/products/4b6329d6-b056-4ba9-81de-2ea1d2e96a06_cx0EpVIyY',
      rating: 5.0,
      reviews: 178,
      badge: 'Premium',
    },
  ];

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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        
        {/* Grid pattern */}
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
        
        {/* Animated gradient */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Star size={16} className="text-white/60 fill-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Most Coveted
            </span>
            <Star size={16} className="text-white/60 fill-white/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-6xl sm:text-7xl md:text-8xl mb-8"
          >
            BEST SELLERS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg tracking-wider font-light max-w-2xl mx-auto mb-8"
          >
            Handpicked selections that define excellence and sophistication
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative h-full"
            >
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative overflow-hidden bg-zinc-950 border border-white/5 cursor-pointer h-full flex flex-col"
              >
                {/* Product Image Container - Fixed Height */}
                <div className="relative h-80 overflow-hidden shrink-0">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Badge */}
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20"
                  >
                    <span className="text-white text-xs tracking-[0.2em] font-light uppercase">
                      {product.badge}
                    </span>
                  </motion.div>

                  {/* Action Buttons */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 flex flex-col gap-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWishlist(product.id)}
                          className="p-3 bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <Heart
                            size={18}
                            className={`${
                              wishlist.some(item => item.productId === product.id)
                                ? 'fill-red-500 text-red-500'
                                : 'text-white'
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <Link to={`/products/${product.id}`}>
                            <Eye size={18} className="text-white" />
                          </Link>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Add to Cart */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product.id)}
                        className="absolute bottom-4 left-4 right-4 py-3 bg-white text-black font-light tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        ADD TO CART
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Info - Fixed Height */}
                <div className="p-6 grow flex flex-col justify-between">
                  <div>
                    <motion.p
                      className="text-white/50 text-xs tracking-[0.25em] font-light uppercase mb-2 line-clamp-1"
                      whileHover={{ x: 5 }}
                    >
                      {product.category}
                    </motion.p>

                    <motion.h3
                      className="text-white font-light tracking-widest text-xl mb-3 line-clamp-2 min-h-14"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.name}
                    </motion.h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'fill-white text-white'
                                : 'text-white/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/60 text-xs font-light whitespace-nowrap">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Price - Always at bottom */}
                  <div className="flex items-center gap-3">
                    <span className="text-white font-light tracking-wider text-2xl">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-white/40 font-light tracking-wider text-sm line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-white via-white/80 to-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-24"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-12 py-5 bg-transparent border-2 border-white text-white font-light tracking-[0.25em] text-sm overflow-hidden"
          >
            <Link to="/products">
            <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-300">
              VIEW ALL PRODUCTS
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </span>
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;