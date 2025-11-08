import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  CheckCircle,
  Package,
  ShoppingBag,
  ArrowRight,
  Download,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useOrderStore } from '../store/orderStore';
import {useAuthStore} from "../store/authStore";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { currentOrder, fetchOrderById } = useOrderStore();
  const { user } = useAuthStore();

  // Get payment details from URL params
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

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

  const generatePDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
  
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const { height } = page.getSize();
  
      // Header
      page.drawText("INVOICE", {
        x: 50,
        y: height - 50,
        size: 28,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
  
      // Order Information
      page.drawText(`Order ID: ${orderId}`, { 
        x: 50, 
        y: height - 100, 
        size: 12, 
        font: boldFont 
      });
      
      page.drawText(`Date: ${new Date(currentOrder.createdAt).toLocaleDateString()}`, { 
        x: 50, 
        y: height - 120, 
        size: 12, 
        font 
      });
  
      // Customer Information
      page.drawText("BILL TO:", { 
        x: 50, 
        y: height - 160, 
        size: 14, 
        font: boldFont 
      });
      
      page.drawText(`${user.fullName.firstName+" "+user.fullName.lastName}`, { 
        x: 50, 
        y: height - 180, 
        size: 12, 
        font 
      });
      
      page.drawText(`${user.email}`, { 
        x: 50, 
        y: height - 200, 
        size: 12, 
        font 
      });
  
      // Products Header
      page.drawText("ITEMS:", { 
        x: 50, 
        y: height - 240, 
        size: 14, 
        font: boldFont 
      });
  
      // Table Headers
      page.drawText("Product", { x: 50, y: height - 270, size: 12, font: boldFont });
      page.drawText("Qty", { x: 300, y: height - 270, size: 12, font: boldFont });
      page.drawText("Price", { x: 350, y: height - 270, size: 12, font: boldFont });
      page.drawText("Total", { x: 450, y: height - 270, size: 12, font: boldFont });
  
      // Draw line under headers
      page.drawLine({
        start: { x: 50, y: height - 280 },
        end: { x: 550, y: height - 280 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
  
      // Products List
      let yPosition = height - 300;
      currentOrder.items.forEach((item) => {
        page.drawText(item.title, { 
          x: 50, 
          y: yPosition, 
          size: 10, 
          font 
        });
        
        page.drawText(`${item.quantity}`, { 
          x: 300, 
          y: yPosition, 
          size: 10, 
          font 
        });
        
        page.drawText(`${(item.price.amount).toFixed(2)}`, { 
          x: 350, 
          y: yPosition, 
          size: 10, 
          font 
        });
        
        page.drawText(`${(item.price.amount * item.quantity).toFixed(2)}`, { 
          x: 450, 
          y: yPosition, 
          size: 10, 
          font 
        });
        
        yPosition -= 25;
      });
  
      // Total Section
      yPosition -= 20;
      page.drawLine({
        start: { x: 300, y: yPosition },
        end: { x: 550, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
  
      yPosition -= 25;
      page.drawText("TOTAL:", { 
        x: 400, 
        y: yPosition, 
        size: 14, 
        font: boldFont 
      });
      
      page.drawText(`${(currentOrder.totalPrice.amount).toFixed(2)}`, { 
        x: 450, 
        y: yPosition, 
        size: 14, 
        font: boldFont,
        color: rgb(0, 0, 0),
      });
  
      // Payment Information
      yPosition -= 50;
      page.drawText("PAYMENT DETAILS:", { 
        x: 50, 
        y: yPosition, 
        size: 12, 
        font: boldFont 
      });
      
      yPosition -= 20;
      page.drawText(`Payment Id: ${paymentId}`, { 
        x: 50, 
        y: yPosition, 
        size: 10, 
        font 
      });
      
      yPosition -= 15;
      page.drawText("Payment Status: Paid", { 
        x: 50, 
        y: yPosition, 
        size: 10, 
        font 
      });
  
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `invoice-${currentOrder._id}.pdf`;
      link.click();
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

  return (
    <section className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,rgba(34,197,94,0.1),transparent_50%)]" />
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
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              <div className="w-32 h-32 mx-auto bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                <CheckCircle size={64} className="text-green-500" strokeWidth={1.5} />
              </div>

              {/* Sparkle Effect */}
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
                <Sparkles size={32} className="text-green-500" />
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
                <Sparkles size={24} className="text-green-500" />
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
              className="absolute inset-0 border-2 border-green-500/30"
            />
          </motion.div>

          {/* Success Message */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-12 h-px bg-linear-to-r from-transparent to-green-500/50" />
              <span className="text-green-500 tracking-[0.4em] text-xs font-light uppercase">
                Payment Successful
              </span>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-green-500/50" />
            </motion.div>

            <h1 className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6">
              THANK YOU
            </h1>

            <p className="text-white/60 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Your payment has been processed successfully. We're preparing your
              order for delivery.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"
            />
          </motion.div>

          {/* Order Details Card */}
          {currentOrder && (
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950 border border-white/10 p-8 mb-12 max-w-2xl mx-auto"
            >
              <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6">
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60 font-light tracking-wide text-sm">
                    Order ID
                  </span>
                  <span className="text-white font-light tracking-wider">
                    #{currentOrder._id.slice(-8).toUpperCase()}
                  </span>
                </div>

                {paymentId && (
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60 font-light tracking-wide text-sm">
                      Payment ID
                    </span>
                    <span className="text-white font-light tracking-wider text-sm">
                      {paymentId.slice(0, 20)}...
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60 font-light tracking-wide text-sm">
                    Amount Paid
                  </span>
                  <span className="text-green-500 font-light tracking-wider text-xl">
                    {currentOrder.totalPrice.currency === 'INR' ? '₹' : '$'}
                    {currentOrder.totalPrice.amount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60 font-light tracking-wide text-sm">
                    Items
                  </span>
                  <span className="text-white font-light tracking-wider">
                    {currentOrder.items.length} {currentOrder.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-white/60 font-light tracking-wide text-sm">
                    Order Date
                  </span>
                  <span className="text-white font-light tracking-wider text-sm">
                    {new Date(currentOrder.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white/60 font-light tracking-[0.15em] text-xs uppercase mb-3">
                  Shipping Address
                </h3>
                <div className="text-white/80 font-light tracking-wide text-sm space-y-1">
                  <p>{currentOrder.shippingAddress.street}</p>
                  <p>
                    {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}
                  </p>
                  <p>{currentOrder.shippingAddress.zip}</p>
                  {currentOrder.shippingAddress.country && (
                    <p>{currentOrder.shippingAddress.country}</p>
                  )}
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white/60 font-light tracking-[0.15em] text-xs uppercase mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {currentOrder.items.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-black/40 border border-white/5"
                    >
                      <img
                        src={item.images[0]?.url}
                        alt={item.title}
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-white font-light tracking-wide text-sm">
                          {item.title}
                        </p>
                        <p className="text-white/40 text-xs font-light tracking-wider">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-white/60 font-light tracking-wider text-sm">
                        {item.price.currency === 'INR' ? '₹' : '$'}
                        {item.price.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {currentOrder.items.length > 3 && (
                    <p className="text-white/40 text-xs font-light tracking-wide text-center pt-2">
                      +{currentOrder.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                >
                  <Download size={16} strokeWidth={1.5} />
                  Download Invoice
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const shareData = {
                      title: 'Order Details',
                      text: `Here are the details for my order #${currentOrder._id.slice(-8).toUpperCase()}. Total Amount: ${currentOrder.totalPrice.currency === 'INR' ? '₹' : '$'}${currentOrder.totalPrice.amount.toFixed(2)}. Items Purchased: ${currentOrder.items.length}.`,
                    };
                    navigator.share(shareData);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                >
                  <Share2 size={16} strokeWidth={1.5} />
                  Share OrderDetails
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* What's Next Section */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950 border border-white/10 p-8 mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6">
              What's Next?
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white font-light tracking-wider text-xl">
                    1
                  </span>
                </div>
                <h3 className="text-white font-light tracking-wide text-sm">
                  Order Confirmation
                </h3>
                <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                  You'll receive an email confirmation shortly
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white font-light tracking-wider text-xl">
                    2
                  </span>
                </div>
                <h3 className="text-white font-light tracking-wide text-sm">
                  Order Processing
                </h3>
                <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                  We'll prepare your items for shipping
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white font-light tracking-wider text-xl">
                    3
                  </span>
                </div>
                <h3 className="text-white font-light tracking-wide text-sm">
                  Delivery
                </h3>
                <p className="text-white/50 font-light tracking-wide text-xs leading-relaxed">
                  Track your order until it arrives
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <Link to="/orders" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-sm uppercase group"
              >
                <Package size={18} strokeWidth={1.5} />
                Track Order
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </motion.button>
            </Link>

            <Link to="/products" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-sm uppercase group"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                Continue Shopping
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Support Info */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-white/40 font-light tracking-wide text-sm mb-4">
              Need help with your order?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                Contact Support
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                FAQs
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] uppercase">
                Shipping Policy
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentSuccess;