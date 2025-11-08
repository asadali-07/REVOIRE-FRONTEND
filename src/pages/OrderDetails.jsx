import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MapPin,
  ArrowLeft,
  Edit,
  AlertCircle,
  Check,
  X as XIcon,
  Save,
  CreditCard,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const {
    currentOrder,
    loading,
    error,
    fetchOrderById,
    cancelOrder,
    updateOrderAddress,
    clearCurrentOrder,
    clearError,
  } = useOrderStore();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [payment, setPayment] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
    return () => {
      clearCurrentOrder();
      clearError();
    };
  }, [orderId, fetchOrderById, clearCurrentOrder, clearError]);

  // Initialize address form when order loads
  useEffect(() => {
    if (currentOrder?.shippingAddress) {
      setAddressForm({
        street: currentOrder.shippingAddress.street || '',
        city: currentOrder.shippingAddress.city || '',
        state: currentOrder.shippingAddress.state || '',
        zip: currentOrder.shippingAddress.zip || '',
        country: currentOrder.shippingAddress.country || '',
      });
    }
  }, [currentOrder]);

  // Fetch payment details
  useEffect(() => {
    const fetchPayment = async () => {
      if (orderId) {
        setPaymentLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3006/api/payments/status/${orderId}`,
            { withCredentials: true }
          );
          setPayment(response.data.payment);
        } catch (error) {
          console.error('Error fetching payment details:', error);
        } finally {
          setPaymentLoading(false);
        }
      }
    };
    fetchPayment();
  }, [orderId]);

  // Status configurations
  const statusConfig = {
    PENDING: {
      icon: Clock,
      label: 'Order Pending',
      description: 'Your order is being processed',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
    },
    CONFIRMED: {
      icon: CheckCircle,
      label: 'Order Confirmed',
      description: 'Your order has been confirmed',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    SHIPPED: {
      icon: Truck,
      label: 'Order Shipped',
      description: 'Your order is on the way',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
    },
    DELIVERED: {
      icon: Package,
      label: 'Order Delivered',
      description: 'Your order has been delivered',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    CANCELLED: {
      icon: XCircle,
      label: 'Order Cancelled',
      description: 'This order has been cancelled',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
  };

  // Payment status configurations
  const paymentStatusConfig = {
    PENDING: {
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      label: 'Payment Pending',
    },
    COMPLETED: {
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      label: 'Payment Successful',
    },
    FAILED: {
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      label: 'Payment Failed',
    },
  };

  // Order timeline steps
  const getTimelineSteps = (status) => {
    const steps = [
      { key: 'PENDING', label: 'Pending', icon: Clock },
      { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
      { key: 'SHIPPED', label: 'Shipped', icon: Truck },
      { key: 'DELIVERED', label: 'Delivered', icon: Package },
    ];

    const statusOrder = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        navigate('/orders');
      } catch (error) {
        alert(error.message || 'Failed to cancel order');
      }
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddressError('');
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
    setAddressError('');
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setAddressError('');
    // Reset form to original values
    if (currentOrder?.shippingAddress) {
      setAddressForm({
        street: currentOrder.shippingAddress.street || '',
        city: currentOrder.shippingAddress.city || '',
        state: currentOrder.shippingAddress.state || '',
        zip: currentOrder.shippingAddress.zip || '',
        country: currentOrder.shippingAddress.country || '',
      });
    }
  };

  const handleSaveAddress = async () => {
    // Validate form
    if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zip) {
      setAddressError('Please fill in all required fields');
      return;
    }

    try {
      await updateOrderAddress(orderId, addressForm);
      setIsEditingAddress(false);
      setAddressError('');
    } catch (error) {
      setAddressError(error.message || 'Failed to update address');
    }
  };

  if (loading && !currentOrder) {
    return (
      <section className="relative min-h-screen bg-black py-32">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white mb-4"></div>
          <p className="text-white/60 font-light tracking-wider text-sm">
            Loading order details...
          </p>
        </div>
      </section>
    );
  }

  if (error || !currentOrder) {
    return (
      <section className="relative min-h-screen bg-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h2 className="text-white font-light tracking-[0.2em] text-2xl mb-4">
            ORDER NOT FOUND
          </h2>
          <p className="text-white/60 font-light tracking-wide mb-8">
            {error || 'The order you are looking for does not exist'}
          </p>
          <Link to="/orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm uppercase hover:bg-white/90 transition-colors"
            >
              Back to Orders
            </motion.button>
          </Link>
        </div>
      </section>
    );
  }

  const StatusIcon = statusConfig[currentOrder.status]?.icon || Package;
  const timeline = getTimelineSteps(currentOrder.status);
  const canEditAddress =
    currentOrder.status === 'PENDING' || currentOrder.status === 'CONFIRMED';

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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link to="/orders">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-light tracking-[0.15em] text-sm uppercase"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Back to Orders
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
              >
                <Package size={14} className="text-white/60" strokeWidth={1.5} />
                <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
                  Order Details
                </span>
              </motion.div>

              <h1 className="text-white font-light tracking-[0.2em] text-4xl md:text-5xl mb-4">
                ORDER #{currentOrder._id.slice(-8).toUpperCase()}
              </h1>

              <p className="text-white/50 font-light tracking-wide text-sm">
                Placed on{' '}
                {new Date(currentOrder.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center gap-3 px-6 py-4 border ${
                statusConfig[currentOrder.status]?.border
              } ${statusConfig[currentOrder.status]?.bg}`}
            >
              <StatusIcon
                size={24}
                className={statusConfig[currentOrder.status]?.color}
                strokeWidth={1.5}
              />
              <div>
                <p
                  className={`text-sm font-light tracking-[0.2em] uppercase ${
                    statusConfig[currentOrder.status]?.color
                  }`}
                >
                  {statusConfig[currentOrder.status]?.label}
                </p>
                <p className="text-white/50 text-xs font-light tracking-wide mt-1">
                  {statusConfig[currentOrder.status]?.description}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>

        {/* Order Timeline */}
        {currentOrder.status !== 'CANCELLED' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 p-8 bg-zinc-950 border border-white/10"
          >
            <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-8">
              Order Timeline
            </h2>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (timeline.findIndex((s) => s.active) / (timeline.length - 1)) * 100
                    }%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {timeline.map((step, index) => (
                  <div key={step.key} className="relative">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className={`w-12 h-12 flex items-center justify-center border-2 transition-all duration-500 ${
                          step.completed
                            ? 'bg-white border-white text-black'
                            : 'bg-black border-white/20 text-white/40'
                        }`}
                      >
                        {step.completed ? (
                          <Check size={20} strokeWidth={2} />
                        ) : (
                          <step.icon size={20} strokeWidth={1.5} />
                        )}
                      </motion.div>

                      <p
                        className={`mt-4 text-xs font-light tracking-[0.15em] uppercase text-center ${
                          step.completed ? 'text-white' : 'text-white/40'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-zinc-950 border border-white/10 p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <CreditCard size={16} className="text-white/60" strokeWidth={1.5} />
                <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase">
                  Payment Information
                </h2>
              </div>

              {paymentLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : payment ? (
                <div className="space-y-4">
                  {/* Payment Status Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 border ${
                      paymentStatusConfig[payment.status]?.border
                    } ${paymentStatusConfig[payment.status]?.bg}`}
                  >
                    {payment.status === 'COMPLETED' && (
                      <CheckCircle
                        size={16}
                        className={paymentStatusConfig[payment.status]?.color}
                        strokeWidth={1.5}
                      />
                    )}
                    {payment.status === 'PENDING' && (
                      <Clock
                        size={16}
                        className={paymentStatusConfig[payment.status]?.color}
                        strokeWidth={1.5}
                      />
                    )}
                    {payment.status === 'FAILED' && (
                      <XCircle
                        size={16}
                        className={paymentStatusConfig[payment.status]?.color}
                        strokeWidth={1.5}
                      />
                    )}
                    <span
                      className={`text-xs font-light tracking-[0.15em] uppercase ${
                        paymentStatusConfig[payment.status]?.color
                      }`}
                    >
                      {paymentStatusConfig[payment.status]?.label}
                    </span>
                  </div>

                  {/* Payment Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-black/40 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={14} className="text-white/40" strokeWidth={1.5} />
                        <span className="text-white/40 text-xs font-light tracking-[0.15em] uppercase">
                          Amount
                        </span>
                      </div>
                      <p className="text-white font-light tracking-wider text-lg">
                        {payment.price.currency === 'INR' ? '₹' : '$'}
                        {payment.price.amount.toFixed(2)}
                      </p>
                    </div>

                    <div className="p-4 bg-black/40 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-white/40" strokeWidth={1.5} />
                        <span className="text-white/40 text-xs font-light tracking-[0.15em] uppercase">
                          Payment Date
                        </span>
                      </div>
                      <p className="text-white font-light tracking-wide text-sm">
                        {new Date(payment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="p-4 bg-black/40 border border-white/5">
                      <span className="text-white/40 text-xs font-light tracking-[0.15em] uppercase block mb-2">
                        Razorpay Order ID
                      </span>
                      <p className="text-white/60 font-light tracking-wide text-xs break-all">
                        {payment.razorpayOrderId}
                      </p>
                    </div>

                    {payment.razorpayPaymentId && (
                      <div className="p-4 bg-black/40 border border-white/5">
                        <span className="text-white/40 text-xs font-light tracking-[0.15em] uppercase block mb-2">
                          Payment ID
                        </span>
                        <p className="text-white/60 font-light tracking-wide text-xs break-all">
                          {payment.razorpayPaymentId}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Retry Payment Button for Failed Payments */}
                  {payment.status === 'FAILED' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/checkout?orderId=${orderId}`)}
                      className="w-full mt-4 py-3 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                    >
                      Retry Payment
                    </motion.button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle size={32} className="text-white/40 mx-auto mb-3" />
                  <p className="text-white/40 font-light tracking-wide text-sm">
                    No payment information available
                  </p>
                </div>
              )}
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-zinc-950 border border-white/10 p-8"
            >
              <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6">
                Order Items ({currentOrder.items.length})
              </h2>

              <div className="space-y-4">
                {currentOrder.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex gap-4 p-4 bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <Link to={`/products/${item.productId}`}>
                      <div className="w-24 h-24 shrink-0 overflow-hidden">
                        <img
                          src={item.images[0]?.url}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    <div className="flex-1">
                      <Link to={`/products/${item.productId}`}>
                        <h3 className="text-white font-light tracking-wide mb-2 hover:text-white/80 transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-white/50 text-xs font-light tracking-[0.15em] uppercase mb-3">
                        {item.category}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/60 font-light tracking-wide">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 font-light tracking-wide">
                          ${item.price.amount.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-light tracking-wider text-lg">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-white/40 text-xs font-light tracking-wider mt-1">
                        {item.price.currency}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-zinc-950 border border-white/10 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-white/60" strokeWidth={1.5} />
                  <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase">
                    Shipping Address
                  </h2>
                </div>

                {canEditAddress && !isEditingAddress && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditAddress}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors text-white/60 text-xs font-light tracking-[0.15em] uppercase"
                  >
                    <Edit size={14} strokeWidth={1.5} />
                    Edit
                  </motion.button>
                )}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {addressError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500"
                  >
                    <p className="text-xs font-light tracking-wide">{addressError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {isEditingAddress ? (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Street */}
                    <div>
                      <label className="block text-white/60 text-xs font-light tracking-[0.15em] uppercase mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={addressForm.street}
                        onChange={handleAddressChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs font-light tracking-[0.15em] uppercase mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          placeholder="New York"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs font-light tracking-[0.15em] uppercase mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          placeholder="NY"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* ZIP & Country */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs font-light tracking-[0.15em] uppercase mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={addressForm.zip}
                          onChange={handleAddressChange}
                          placeholder="10001"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs font-light tracking-[0.15em] uppercase mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressChange}
                          placeholder="USA"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveAddress}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={14} strokeWidth={1.5} />
                            Save Address
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="px-6 py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XIcon size={14} strokeWidth={1.5} />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60 font-light tracking-wide space-y-2"
                  >
                    <p>{currentOrder.shippingAddress.street}</p>
                    <p>
                      {currentOrder.shippingAddress.city},{' '}
                      {currentOrder.shippingAddress.state}
                    </p>
                    <p>{currentOrder.shippingAddress.zip}</p>
                    {currentOrder.shippingAddress.country && (
                      <p>{currentOrder.shippingAddress.country}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-zinc-950 border border-white/10 p-8 sticky top-8"
            >
              <h2 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-6 mb-6 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60 font-light tracking-wide">
                    Subtotal
                  </span>
                  <span className="text-white font-light tracking-wider">
                    ${currentOrder.totalPrice.amount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60 font-light tracking-wide">
                    Shipping
                  </span>
                  <span className="text-white font-light tracking-wider">
                    Free
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60 font-light tracking-wide">Tax</span>
                  <span className="text-white font-light tracking-wider">
                    Included
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-white font-light tracking-[0.2em] text-sm uppercase">
                  Total
                </span>
                <div className="text-right">
                  <p className="text-white text-3xl font-light tracking-wider">
                    ${currentOrder.totalPrice.amount.toFixed(2)}
                  </p>
                  <p className="text-white/40 text-xs font-light tracking-wider mt-1">
                    {currentOrder.totalPrice.currency}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {canEditAddress && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelOrder}
                  disabled={loading}
                  className="w-full py-4 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors font-light tracking-[0.2em] text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Order
                </motion.button>
              )}

              {currentOrder.status === 'DELIVERED' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-sm uppercase"
                >
                  Write a Review
                </motion.button>
              )}
            </motion.div>

            {/* Need Help? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-zinc-950 border border-white/10 p-8"
            >
              <h3 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-4">
                Need Help?
              </h3>
              <p className="text-white/60 font-light tracking-wide text-sm mb-6">
                Contact our support team for assistance with your order.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;