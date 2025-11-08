import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Star,
  Truck,
  Shield,
  RefreshCw,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {useProductStore} from '../store/productStore';
import {useCartStore} from '../store/cartStore';
import {useWishlistStore} from '../store/wishlistStore';

const ProductDetails = () => {
  const { getProductById ,product,loading,products,getProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    getProductById(id);
    getProducts();
  }, [id, getProductById, getProducts]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white font-light tracking-wide text-lg">Loading product details...</p>
      </div>
    );
  }

  const relatedProducts = products.splice(0, 4);

  const handleAddToCart = () => {
    addToCart(id, qty);
  };
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const handleQtyChange = (change) => {
    setQty(Math.max(1, qty + change));
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
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-white/60 hover:text-white transition-colors font-light tracking-wide">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link to="/products" className="text-white/60 hover:text-white transition-colors font-light tracking-wide">
              Products
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white font-light tracking-wide">{product.title}</span>
          </div>
        </motion.div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative mb-6 group">
              <div className="relative aspect-square overflow-hidden bg-zinc-950 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage].url}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-red-500/90 backdrop-blur-sm">
                    <p className="text-white text-xs tracking-[0.2em] font-light uppercase">
                      {Math.round(((product.originalPrice - product.price.amount) / product.originalPrice) * 100)}% OFF
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4 overflow-x-auto overflow-scroll pb-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-2 border-white'
                      : 'border border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category & SKU */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/50 text-xs tracking-[0.25em] font-light uppercase">
                {product.category}
              </p>
              <p className="text-white/40 text-xs tracking-wider font-light">
                SKU: {product.sku}
              </p>
            </div>

            {/* Product Name */}
            <h1 className="text-white font-light tracking-[0.15em] text-4xl sm:text-5xl mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/70 font-light tracking-wide text-sm">
                  {product.rating}
                </span>
              </div>
              <span className="text-white/40 font-light tracking-wide text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white font-light tracking-wider text-4xl">
                ${product.price.amount}
              </span>
              {product.originalPrice && (
                <span className="text-white/40 font-light tracking-wider text-xl line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="h-px bg-white/10 mb-8" />

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-white/70 font-light tracking-wider text-sm uppercase mb-4">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border font-light tracking-wider text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Qty Selection */}
            <div className="mb-8">
              <label className="block text-white/70 font-light tracking-wider text-sm uppercase mb-4">
                Qty
              </label>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQtyChange(-1)}
                  className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Minus size={18} className="text-white/70" />
                </motion.button>
                <span className="text-white font-light tracking-wider text-xl w-16 text-center">
                  {qty}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQtyChange(1)}
                  className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Plus size={18} className="text-white/70" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="group relative flex-1 px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                  <ShoppingCart size={18} />
                  ADD TO CART
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(id)}
                className={`p-4 border transition-all ${
                  isInWishlist(product._id)
                    ? 'bg-red-500 border-red-500'
                    : 'border-white/20 hover:bg-white/5'
                }`}
              >
                <Heart
                  size={20}
                  className={isInWishlist(product._id) ? 'text-white fill-white' : 'text-white'}
                  strokeWidth={1.5}
                />
              </motion.button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-950 border border-white/10 p-4 text-center">
                <Truck size={24} className="text-white/70 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white/60 font-light tracking-wide text-xs">
                  Free Shipping
                </p>
              </div>
              <div className="bg-zinc-950 border border-white/10 p-4 text-center">
                <Shield size={24} className="text-white/70 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white/60 font-light tracking-wide text-xs">
                  Authenticity
                </p>
              </div>
              <div className="bg-zinc-950 border border-white/10 p-4 text-center">
                <RefreshCw size={24} className="text-white/70 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white/60 font-light tracking-wide text-xs">
                  30-Day Returns
                </p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-green-500 mb-4">
              <Check size={18} />
              <span className="font-light tracking-wide text-sm">In Stock - Ready to Ship</span>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            {['description', 'specifications', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-light tracking-[0.2em] text-sm uppercase transition-all border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-white'
                    : 'text-white/50 border-transparent hover:text-white/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950 border border-white/10 p-8"
            >
              {activeTab === 'description' && (
                <div>
                  <p className="text-white/70 font-light tracking-wide leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <h3 className="text-white font-light tracking-[0.15em] text-xl mb-4">
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check size={20} className="text-white/70 shrink-0 mt-0.5" />
                        <span className="text-white/60 font-light tracking-wide text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/60 font-light tracking-wide text-sm uppercase">
                        {key}
                      </span>
                      <span className="text-white font-light tracking-wide text-sm">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Truck size={24} className="text-white/70 shrink-0" />
                    <div>
                      <h4 className="text-white font-light tracking-[0.15em] text-lg mb-2">
                        Shipping Information
                      </h4>
                      <p className="text-white/60 font-light tracking-wide text-sm leading-relaxed">
                        Estimated delivery: {product.shippingInfo.estimatedDelivery}
                        {product.shippingInfo.freeShipping && (
                          <span className="block text-green-500 mt-1">Free shipping on this item</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <RefreshCw size={24} className="text-white/70 shrink-0" />
                    <div>
                      <h4 className="text-white font-light tracking-[0.15em] text-lg mb-2">
                        Returns & Exchanges
                      </h4>
                      <p className="text-white/60 font-light tracking-wide text-sm leading-relaxed">
                        {product.shippingInfo.returns}. Items must be unworn and in original packaging.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-4">
              YOU MAY ALSO LIKE
            </h2>
            <div className="h-px w-32 bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <Link to={`/products/${relatedProduct._id}`}>
                  <div className="relative overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.images[0].url}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white/50 text-xs tracking-[0.25em] font-light uppercase mb-1">
                        {relatedProduct.category}
                      </p>
                      <h3 className="text-white font-light tracking-widest text-sm mb-2 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-white font-light tracking-wider text-lg">
                        ${relatedProduct.price.amount}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetails;