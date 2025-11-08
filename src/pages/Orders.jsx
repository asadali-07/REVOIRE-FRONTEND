import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  X as XIcon,
} from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { Link } from 'react-router-dom';

const Orders = () => {
  const {
    orders,
    loading,
    error,
    orderStats,
    fetchOrders,
    cancelOrder,
    getOrdersByStatus,
  } = useOrderStore();

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Status configurations
  const statusConfig = {
    PENDING: {
      icon: Clock,
      label: 'Pending',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
    },
    CONFIRMED: {
      icon: CheckCircle,
      label: 'Confirmed',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    SHIPPED: {
      icon: Truck,
      label: 'Shipped',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
    },
    DELIVERED: {
      icon: Package,
      label: 'Delivered',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    CANCELLED: {
      icon: XCircle,
      label: 'Cancelled',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
  };

  // Filter tabs
  const filterTabs = [
    { value: 'all', label: 'All Orders', count: orderStats.total },
    { value: 'pending', label: 'Pending', count: orderStats.pending },
    { value: 'confirmed', label: 'Confirmed', count: orderStats.confirmed },
    { value: 'shipped', label: 'Shipped', count: orderStats.shipped },
    { value: 'delivered', label: 'Delivered', count: orderStats.delivered },
    { value: 'cancelled', label: 'Cancelled', count: orderStats.cancelled },
  ];

  // Get filtered orders
  const filteredOrders =
    selectedStatus === 'all'
      ? orders
      : getOrdersByStatus(selectedStatus);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
      } catch (error) {
        alert(error.message || 'Failed to cancel order');
      }
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Package size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Order History
            </span>
            <Package size={16} className="text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            MY ORDERS
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.value}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStatus(tab.value)}
              className={`p-4 border transition-all duration-300 ${
                selectedStatus === tab.value
                  ? 'border-white bg-white text-black'
                  : 'border-white/10 hover:border-white/30 text-white'
              }`}
            >
              <p className="text-2xl font-light tracking-wider mb-1">
                {tab.count}
              </p>
              <p className="text-xs font-light tracking-[0.15em] uppercase opacity-70">
                {tab.label}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500"
          >
            <p className="text-sm font-light tracking-wide">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white mb-4"></div>
            <p className="text-white/60 font-light tracking-wider text-sm">
              Loading orders...
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <Package size={64} className="text-white/20 mx-auto mb-6" />
            <h2 className="text-white font-light tracking-[0.2em] text-2xl mb-4">
              NO ORDERS FOUND
            </h2>
            <p className="text-white/60 font-light tracking-wide mb-8">
              {selectedStatus === 'all'
                ? "You haven't placed any orders yet"
                : `No ${selectedStatus} orders found`}
            </p>
          </motion.div>
        ) : (
          /* Orders List */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || Package;
                const isExpanded = expandedOrderId === order._id;

                return (
                  <motion.div
                    key={order._id}
                    variants={itemVariants}
                    layout
                    className="bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {/* Order Header */}
                    <Link to={`/orders/${order._id}`} className="p-6">
                      <div className="flex flex-col px-3 md:flex-row md:items-center justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-white/40 text-xs font-light tracking-[0.2em] uppercase">
                              Order ID
                            </span>
                            <span className="text-white font-light tracking-wider text-sm">
                              #{order._id.slice(-8)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            {/* Status Badge */}
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 border ${
                                statusConfig[order.status]?.border
                              } ${statusConfig[order.status]?.bg}`}
                            >
                              <StatusIcon
                                size={14}
                                className={statusConfig[order.status]?.color}
                                strokeWidth={1.5}
                              />
                              <span
                                className={`text-xs font-light tracking-[0.15em] uppercase ${
                                  statusConfig[order.status]?.color
                                }`}
                              >
                                {statusConfig[order.status]?.label}
                              </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-white/50">
                              <Calendar size={14} strokeWidth={1.5} />
                              <span className="text-xs font-light tracking-wide">
                                {new Date(order.createdAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </span>
                            </div>

                            {/* Items Count */}
                            <div className="flex items-center gap-2 text-white/50">
                              <Package size={14} strokeWidth={1.5} />
                              <span className="text-xs font-light tracking-wide">
                                {order.items.length}{' '}
                                {order.items.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-white/40 text-xs font-light tracking-[0.15em] uppercase mb-1">
                              Total
                            </p>
                            <p className="text-white text-2xl font-light tracking-wider">
                              ${order.totalPrice.amount.toFixed(2)}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleOrderExpansion(order._id);
                            }}
                            className="p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp
                                size={20}
                                className="text-white/60"
                                strokeWidth={1.5}
                              />
                            ) : (
                              <ChevronDown
                                size={20}
                                className="text-white/60"
                                strokeWidth={1.5}
                              />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </Link>

                    {/* Expanded Order Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-white/10"
                        >
                          <div className="p-6 space-y-6">
                            {/* Shipping Address */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <MapPin
                                  size={16}
                                  className="text-white/60"
                                  strokeWidth={1.5}
                                />
                                <h3 className="text-white font-light tracking-[0.2em] text-sm uppercase">
                                  Shipping Address
                                </h3>
                              </div>
                              <div className="pl-6 text-white/60 text-sm font-light tracking-wide space-y-1">
                                <p>{order.shippingAddress.street}</p>
                                <p>
                                  {order.shippingAddress.city},{' '}
                                  {order.shippingAddress.state}{' '}
                                  {order.shippingAddress.zip}
                                </p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h3 className="text-white font-light tracking-[0.2em] text-sm uppercase mb-4">
                                Order Items
                              </h3>
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 bg-black/40 border border-white/5"
                                  >
                                    <img
                                      src={item.images[0]?.url}
                                      alt={item.title}
                                      className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex-1">
                                      <p className="text-white font-light tracking-wide text-sm mb-1">
                                        {item.title}
                                      </p>
                                      <p className="text-white/40 text-xs font-light tracking-wider">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="text-white font-light tracking-wider">
                                      ${item.price.amount.toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            {(order.status === 'PENDING' ||
                              order.status === 'CONFIRMED') && (
                              <div className="flex gap-3 pt-4 border-t border-white/10">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleCancelOrder(order._id)}
                                  className="px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                                >
                                  Cancel Order
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Orders;