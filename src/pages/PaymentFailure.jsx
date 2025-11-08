import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  XCircle,
  Package,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentOrder, fetchOrderById } = useOrderStore();

  // Get payment details from URL params
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error') || 'Payment verification failed';

  // Fetch order details if orderId exists
  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        ease: 'easeOut',
      },
    },
  };

  const handleRetryPayment = () => {
    if (orderId) {
      navigate(`/checkout?orderId=${orderId}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,rgba(239,68,68,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-linear(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-linear(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Error Icon */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              <div className="w-32 h-32 mx-auto bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                <XCircle size={64} className="text-red-500" strokeWidth={1.5} />
              </div>

              {/* Alert Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4"
              >
                <AlertCircle size={32} className="text-red-500" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4"
              >
                <AlertCircle size={24} className="text-red-500" />
              </motion.div>
            </motion.div>

            {/* Pulse Ring */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 border-2 border-red-500/30"
            />
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-12 h-px bg-linear-to-r from-transparent to-red-500/50" />
              <span className="text-red-500 tracking-[0.4em] text-xs font-light uppercase">
                Payment Failed
              </span>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-red-500/50" />
            </motion.div>

            <h1 className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6">
              OOPS!
            </h1>

            <p className="text-white/60 font-light tracking-wide text-lg max-w-2xl mx-auto">
              We couldn't process your payment. Don't worry, no charges were made to your account.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"
            />
          </motion.div>

          {/* Error Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950 border border-red-500/20 p-8 mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6">
              Error Details
            </h2>

            <div className="space-y-4">
              {orderId && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60 font-light tracking-wide text-sm">
                    Order ID
                  </span>
                  <span className="text-white font-light tracking-wider">
                    #{orderId.slice(-8).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60 font-light tracking-wide text-sm">
                  Status
                </span>
                <span className="text-red-500 font-light tracking-wider text-sm">
                  FAILED
                </span>
              </div>

              <div className="flex flex-col gap-2 py-3">
                <span className="text-white/60 font-light tracking-wide text-sm">
                  Reason
                </span>
                <div className="p-4 bg-red-500/5 border border-red-500/20">
                  <p className="text-red-400 font-light tracking-wide text-sm">
                    {error}
                  </p>
                </div>
              </div>

              {currentOrder && (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      Amount
                    </span>
                    <span className="text-white font-light tracking-wider text-lg">
                      {currentOrder.totalPrice.currency === 'INR' ? '₹' : '$'}
                      {currentOrder.totalPrice.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      Attempted On
                    </span>
                    <span className="text-white font-light tracking-wider text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Common Issues Section */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950 border border-white/10 p-8 mb-12 max-w-2xl mx-auto text-left"
          >
            <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6 text-center">
              Common Issues & Solutions
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs">1</span>
                </div>
                <div>
                  <h3 className="text-white font-light tracking-wide text-sm mb-2">
                    Insufficient Balance
                  </h3>
                  <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                    Ensure your account has sufficient funds to complete the transaction.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs">2</span>
                </div>
                <div>
                  <h3 className="text-white font-light tracking-wide text-sm mb-2">
                    Incorrect Payment Details
                  </h3>
                  <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                    Verify your card number, CVV, and expiration date are entered correctly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs">3</span>
                </div>
                <div>
                  <h3 className="text-white font-light tracking-wide text-sm mb-2">
                    Bank Restrictions
                  </h3>
                  <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                    Your bank may have blocked the transaction. Contact them to enable online payments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs">4</span>
                </div>
                <div>
                  <h3 className="text-white font-light tracking-wide text-sm mb-2">
                    Network Issues
                  </h3>
                  <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                    Check your internet connection and try again.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
          >
            {orderId && (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetryPayment}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-sm uppercase group"
              >
                <RefreshCw size={18} strokeWidth={1.5} />
                Retry Payment
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </motion.button>
            )}

            <Link to="/orders" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-sm uppercase group"
              >
                <Package size={18} strokeWidth={1.5} />
                View Orders
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
          </motion.div>

          <Link to="/products" className="max-w-2xl mx-auto block">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-4 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-sm uppercase group"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              Continue Shopping
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>

          {/* Help Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-zinc-950 border border-white/10 p-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle size={20} className="text-white/60" strokeWidth={1.5} />
              <h3 className="text-white font-light tracking-[0.2em] text-sm uppercase">
                Need Help?
              </h3>
            </div>
            <p className="text-white/60 font-light tracking-wide text-sm mb-6">
              Our support team is here to assist you with any payment issues.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                Contact Support
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                Payment FAQs
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                Refund Policy
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentFailure;