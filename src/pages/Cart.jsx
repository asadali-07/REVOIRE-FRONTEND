import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Heart,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import {useAuthStore} from "../store/authStore";
import {useWishlistStore} from "../store/wishlistStore";
import axios from "axios";

const Cart = () => {
  const {
    cart,
    fetchCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();
  const { createOrder } = useOrderStore();
  const { toggleWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping ;

  const handleSaveForLater = () => {
    cart.forEach((item) => {
      toggleWishlist(item.productId);
    });
    clearCart();
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
    }
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckOut = async () => {
    const order = await createOrder();
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const response = await axios.post(
      `https://revoire-payment.onrender.com/api/payments/create/${order._id}`,
      {},
      { withCredentials: true }
    );

    const { order_id, amount, currency, razorpay_key } = response.data;

    const options = {
      key: razorpay_key,
      amount: amount.toString(),
      name: "REVOIRÉ - Redefining Masculine Sophistication Through Exceptional Craftsmanship & Refined Design",
      description: "Order Payment",
      currency,
      order_id: order_id,
      handler: async function (response) {
        try {
          await axios.post(
            "https://revoire-payment.onrender.com/api/payments/verify-payment",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );
          clearCart();
          navigate(`/payment/success?orderId=${order._id}&paymentId=${response.razorpay_payment_id}`);
        } catch (err) {
          const errorMessage = err.response?.data?.message || "Payment verification failed";
          navigate(`/payment/failure?orderId=${order._id}&error=${encodeURIComponent(errorMessage)}`);
        }
      },
      prefill: {
        name: user ? user.fullName.firstName + " " + user.fullName.lastName : "John Doe",
        email: user ? user.email : "johndoe@example.com",
      },
      notes: {
        address: "REVOIRÉ Corporate Office",
      },

      theme: { color: "#000000" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-linear(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-linear(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
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
            <ShoppingBag size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Your Selection
            </span>
            <ShoppingBag size={16} className="text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            SHOPPING CART
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <ShoppingBag size={64} className="text-white/20 mx-auto mb-6" />
            <h2 className="text-white font-light tracking-[0.2em] text-2xl mb-4">
              YOUR CART IS EMPTY
            </h2>
            <p className="text-white/60 font-light tracking-wide mb-8">
              Discover our curated collection of luxury essentials
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group px-10 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                CONTINUE SHOPPING
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-6"
            >
              {/* Cart Header with Clear Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center mb-6"
              >
                <div>
                  <h2 className="text-white font-light tracking-[0.2em] text-xl">
                    CART ITEMS
                  </h2>
                  <p className="text-white/50 font-light tracking-wide text-xs mt-1">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearCart}
                  className="flex items-center gap-2 px-4 py-2 border border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-300 font-light tracking-[0.2em] text-xs uppercase"
                >
                  <Trash2 size={16} />
                  CLEAR CART
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className="group relative bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500"
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <div className="relative p-6 flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-40 sm:h-32 shrink-0 overflow-hidden">
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Product Details */}
                      <div className="grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-white/50 text-xs tracking-[0.2em] font-light uppercase mb-1">
                                {item.category}
                              </p>
                              <h3 className="text-white font-light tracking-widest text-xl mb-2">
                                {item.title}
                              </h3>
                              <p className="text-white/70 text-xs tracking-wider font-light">
                                {item.stock > 0 ? (
                                  <span className="text-green-500">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="text-red-500">
                                    Out of Stock
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.productId)}
                              className="p-2 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                            >
                              <X
                                size={16}
                                className="text-white/60 hover:text-red-500"
                              />
                            </motion.button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => decreaseQuantity(item.productId)}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                              <Minus size={14} className="text-white/70" />
                            </motion.button>
                            <span className="text-white font-light tracking-wider text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => increaseQuantity(item.productId)}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                              <Plus size={14} className="text-white/70" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-white font-light tracking-wider text-xl">
                              ${(item.price.amount * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-white/40 text-xs tracking-wider font-light">
                              ${item.price.amount} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ x: -5 }}
                    className="text-white/60 hover:text-white font-light tracking-wider text-sm transition-colors inline-flex items-center gap-2"
                  >
                    ← Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-zinc-950 border border-white/10 p-8">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />

                <h2 className="text-white font-light tracking-[0.2em] text-xl mb-8 text-center">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      Subtotal
                    </span>
                    <span className="text-white font-light tracking-wider">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      Shipping
                    </span>
                    <span className="text-white font-light tracking-wider">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="h-px bg-white/10 my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-white font-light tracking-[0.15em] text-lg uppercase">
                      Total
                    </span>
                    <span className="text-white font-light tracking-wider text-2xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <div className="mb-6 p-4 border border-white/10 bg-white/5">
                    <p className="text-white/70 font-light tracking-wide text-xs text-center">
                      Add ${(500 - subtotal).toFixed(2)} more for FREE shipping
                    </p>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCheckOut()}
                  className="group relative w-full px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm overflow-hidden mb-4"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
                    PROCEED TO CHECKOUT
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveForLater}
                  className="w-full px-8 py-3 border border-white/20 text-white font-light tracking-[0.2em] text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={16} />
                  SAVE FOR LATER
                </motion.button>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/50 font-light tracking-wide text-xs text-center">
                    Secure checkout powered by industry-leading encryption
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
