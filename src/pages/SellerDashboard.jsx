import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Search,
  X,
  Upload,
  Save,
  AlertCircle,
  BarChart3,
  Loader,
} from "lucide-react";
import { useProductStore } from "../store/productStore";
import { useSellerDashboardStore } from "../store/sellerDashboardStore";

// Add this helper component for dynamic fields
const DynamicInputArray = ({ label, values, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
          className="flex-1 px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
          placeholder={placeholder}
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-6 py-3 border border-white/20 text-white font-light tracking-wider text-sm hover:bg-white/5 transition-colors"
        >
          ADD
        </motion.button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs font-light tracking-wide"
            >
              {value}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const SellerDashboard = () => {
  const [specifications, setSpecifications] = useState({});
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const handleAddSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecifications({ ...specifications, [specKey]: specValue });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const handleRemoveSpecification = (key) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  // Update the formData state to sync with specifications
  useEffect(() => {
    setFormData((prev) => ({ ...prev, specifications }));
  }, [specifications]);
  const [activeTab, setActiveTab] = useState("analytics");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priceAmount: "",
    priceCurrency: "INR",
    originalPrice: "",
    stock: "",
    sku: "",
    sizes: [],
    colors: [],
    features: [],
    specifications: {},
    shippingInfo: {
      freeShipping: false,
      estimatedDelivery: "",
      returns: "",
    },
  });

  // Zustand stores
  const {
    createProduct,
    updateProduct,
    deleteProduct,
    loading: productLoading,
  } = useProductStore();
  const {
    metrics,
    products,
    orders,
    loading,
    error,
    fetchMetrics,
    fetchProducts,
    fetchOrders,
    clearError,
    addProductToList,
    updateProductInList,
    removeProductFromList,
  } = useSellerDashboardStore();

  // Fetch data on mount
  useEffect(() => {
    fetchMetrics();
    fetchProducts();
    fetchOrders();
  }, [fetchMetrics, fetchProducts, fetchOrders]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Handle Add Product 
  const handleAddProduct = async () => {
    try {
      const formDataToSend = new FormData();
  
      // Append basic fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("priceAmount", formData.priceAmount);
      formDataToSend.append("priceCurrency", formData.priceCurrency);
      formDataToSend.append("originalPrice", formData.originalPrice);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("sku", formData.sku);
  
      // Append arrays - Send individual items instead of JSON.stringify
      if (formData.sizes.length > 0) {
        formData.sizes.forEach(size => {
          formDataToSend.append("sizes[]", size);
        });
      }
      
      if (formData.colors.length > 0) {
        formData.colors.forEach(color => {
          formDataToSend.append("colors[]", color);
        });
      }
      
      if (formData.features.length > 0) {
        formData.features.forEach(feature => {
          formDataToSend.append("features[]", feature);
        });
      }
  
      // Append specifications - Send as individual key-value pairs
      if (Object.keys(formData.specifications).length > 0) {
        Object.entries(formData.specifications).forEach(([key, value]) => {
          formDataToSend.append(`specifications[${key}]`, value);
        });
      }
  
      // Append shipping info - Send as individual fields
      formDataToSend.append("shippingInfo[freeShipping]", formData.shippingInfo.freeShipping);
      if (formData.shippingInfo.estimatedDelivery) {
        formDataToSend.append("shippingInfo[estimatedDelivery]", formData.shippingInfo.estimatedDelivery);
      }
      if (formData.shippingInfo.returns) {
        formDataToSend.append("shippingInfo[returns]", formData.shippingInfo.returns);
      }
  
      // Append images
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });
  
      const newProduct = await createProduct(formDataToSend);
      setShowAddModal(false);
      resetForm();
      addProductToList(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || error.message || "Failed to add product");
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      priceAmount: product.price.amount,
      priceCurrency: product.price.currency,
      originalPrice: product.originalPrice,
      stock: product.stock,
      sku: product.sku,
      sizes: product.sizes || [],
      colors: product.colors || [],
      features: product.features || [],
      specifications: product.specifications || {},
      shippingInfo: product.shippingInfo || {
        freeShipping: false,
        estimatedDelivery: "",
        returns: "",
      },
    });
    setShowEditModal(true);
  };

  // Handle Update Product - UPDATED VERSION
  const handleUpdateProduct = async () => {
    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        priceAmount: formData.priceAmount,
        stock: formData.stock,
      };

      // If there are new images, use FormData
      if (imageFiles.length > 0) {
        const formDataToSend = new FormData();

        // Append only the fields backend accepts
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("priceAmount", formData.priceAmount);
        formDataToSend.append("stock", formData.stock);

        // Append new images
        imageFiles.forEach((file) => {
          formDataToSend.append("images", file);
        });

        const updatedProduct = await updateProduct(
          selectedProduct._id,
          formDataToSend
        );
        updateProductInList(updatedProduct);
      } else {
        // No new images, send JSON with only the 4 allowed fields
        const updatedProduct = await updateProduct(
          selectedProduct._id,
          updateData
        );
        updateProductInList(updatedProduct);
      }

      setShowEditModal(false);
      setSelectedProduct(null);
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message || "Failed to update product");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        removeProductFromList(productId);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert(error.message || "Failed to delete product");
      }
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      priceAmount: "",
      priceCurrency: "INR",
      originalPrice: "",
      stock: "",
      sku: "",
      sizes: [],
      colors: [],
      features: [],
      specifications: {},
      shippingInfo: {
        freeShipping: false,
        estimatedDelivery: "",
        returns: "",
      },
    });
    setImageFiles([]);
    setSpecifications({});
    setSpecKey("");
    setSpecValue("");
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
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
            <BarChart3 size={16} className="text-white/60" strokeWidth={1.5} />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Seller Dashboard
            </span>
            <BarChart3 size={16} className="text-white/60" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            SELLER PORTAL
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <p className="text-red-500 font-light tracking-wide text-sm">
                  {error}
                </p>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex border border-white/10">
            {["analytics", "products", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-light tracking-[0.2em] text-sm uppercase transition-all duration-500 ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-transparent text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader
              size={48}
              className="text-white animate-spin"
              strokeWidth={1.5}
            />
          </div>
        )}

        {/* Tab Content */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Analytics Tab */}
              {activeTab === "analytics" && metrics && (
                <div className="space-y-8">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -8 }}
                      className="group relative bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500"
                    >
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />

                      <div className="w-14 h-14 bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                        <DollarSign
                          size={28}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-white/50 font-light tracking-wider text-xs uppercase mb-2">
                        Total Revenue
                      </p>
                      <h3 className="text-white font-light tracking-wider text-3xl">
                        ₹{metrics.revenue.toLocaleString()}
                      </h3>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -8 }}
                      className="group relative bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500"
                    >
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />

                      <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <ShoppingBag
                          size={28}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-white/50 font-light tracking-wider text-xs uppercase mb-2">
                        Total Sales
                      </p>
                      <h3 className="text-white font-light tracking-wider text-3xl">
                        {metrics.sales}
                      </h3>
                    </motion.div>
                  </div>

                  {/* Top Products */}
                  {metrics.topProducts && metrics.topProducts.length > 0 && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-zinc-950 border border-white/10 p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <TrendingUp
                          size={24}
                          className="text-white/70"
                          strokeWidth={1.5}
                        />
                        <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                          TOP SELLING PRODUCTS
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {metrics.topProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-4 bg-black border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                                <span className="text-white font-light tracking-wider text-lg">
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-light tracking-wide">
                                  {product.title}
                                </p>
                                <p className="text-white/50 font-light tracking-wide text-xs">
                                  {product.sold} units sold
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Products Tab */}
              {activeTab === "products" && (
                <div>
                  {/* Search and Add */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                      <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                      />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddModal(true)}
                      className="px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      ADD PRODUCT
                    </motion.button>
                  </div>

                  {/* Products Grid */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <Package
                        size={64}
                        className="text-white/20 mx-auto mb-4"
                      />
                      <p className="text-white/40 font-light tracking-wide">
                        No products found
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid gap-6"
                    >
                      {filteredProducts.map((product) => (
                        <motion.div
                          key={product._id}
                          variants={itemVariants}
                          className="bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500"
                        >
                          <div className="p-6 flex flex-col sm:flex-row gap-6">
                            {/* Product Image */}
                            <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden">
                              <img
                                src={
                                  product.images[0]?.url || "/placeholder.jpg"
                                }
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="grow">
                              <h3 className="text-white font-light tracking-widest text-xl mb-2">
                                {product.title}
                              </h3>
                              <p className="text-white/60 font-light tracking-wide text-sm mb-4 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <span className="text-white/50 font-light tracking-wide">
                                  Category:{" "}
                                  <span className="text-white">
                                    {product.category}
                                  </span>
                                </span>
                                <span className="text-white/50 font-light tracking-wide">
                                  Price:{" "}
                                  <span className="text-white">
                                    {product.price.currency === "INR"
                                      ? "₹"
                                      : "$"}
                                    {product.price.amount}
                                  </span>
                                </span>
                                <span className="text-white/50 font-light tracking-wide">
                                  Stock:{" "}
                                  <span
                                    className={
                                      product.stock > 10
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }
                                  >
                                    {product.stock} units
                                  </span>
                                </span>
                                <span className="text-white/50 font-light tracking-wide">
                                  SKU:{" "}
                                  <span className="text-white">
                                    {product.sku}
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditProduct(product)}
                                className="p-3 border border-white/20 hover:bg-white/5 transition-colors"
                              >
                                <Edit size={18} className="text-white/70" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-3 border border-white/20 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                              >
                                <Trash2
                                  size={18}
                                  className="text-white/70 hover:text-red-500"
                                />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  {orders.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingBag
                        size={64}
                        className="text-white/20 mx-auto mb-4"
                      />
                      <p className="text-white/40 font-light tracking-wide">
                        No orders found
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      {orders.map((order) => (
                        <motion.div
                          key={order._id}
                          variants={itemVariants}
                          className="bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500"
                        >
                          <div className="flex flex-col lg:flex-row justify-between gap-6">
                            <div className="grow">
                              <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-white font-light tracking-widest text-xl">
                                  Order #{order._id.slice(-8).toUpperCase()}
                                </h3>
                                <span
                                  className={`px-3 py-1 text-xs tracking-wider font-light uppercase ${
                                    order.status === "DELIVERED"
                                      ? "bg-green-500/20 text-green-500 border border-green-500/50"
                                      : order.status === "SHIPPED"
                                      ? "bg-blue-500/20 text-blue-500 border border-blue-500/50"
                                      : order.status === "CONFIRMED"
                                      ? "bg-purple-500/20 text-purple-500 border border-purple-500/50"
                                      : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>

                              <div className="space-y-2 mb-4">
                                <p className="text-white/60 font-light tracking-wide text-sm">
                                  Customer:{" "}
                                  <span className="text-white">
                                    {order.user.name}
                                  </span>
                                </p>
                                <p className="text-white/60 font-light tracking-wide text-sm">
                                  Email:{" "}
                                  <span className="text-white">
                                    {order.user.email}
                                  </span>
                                </p>
                                <p className="text-white/60 font-light tracking-wide text-sm">
                                  Date:{" "}
                                  <span className="text-white">
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </p>
                              </div>

                              <div className="border-t border-white/10 pt-4">
                                <p className="text-white/50 font-light tracking-wide text-xs uppercase mb-3">
                                  Items from your store
                                </p>
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center mb-2"
                                  >
                                    <span className="text-white font-light tracking-wide text-sm">
                                      {item.title} × {item.quantity}
                                    </span>
                                    <span className="text-white font-light tracking-wide text-sm">
                                      {item.price.currency === "INR"
                                        ? "₹"
                                        : "$"}
                                      {item.price.amount * item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="lg:text-right">
                              <p className="text-white/50 font-light tracking-wide text-xs uppercase mb-2">
                                Your Earnings
                              </p>
                              <p className="text-white font-light tracking-wider text-3xl">
                                {order.items[0]?.price.currency === "INR"
                                  ? "₹"
                                  : "$"}
                                {order.items
                                  .reduce(
                                    (sum, item) =>
                                      sum + item.price.amount * item.quantity,
                                    0
                                  )
                                  .toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Add Product Modal - COMPLETE VERSION */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
                setSpecifications({});
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scroll"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    ADD NEW PRODUCT
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                      setSpecifications({});
                    }}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <X size={24} className="text-white/70" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                  }}
                  className="space-y-6"
                >
                  {/* Basic Information */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Basic Information
                    </h3>

                    {/* Title */}
                    <div className="mb-4">
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                        placeholder="Premium Wool Suit"
                      />
                    </div>

                    {/* Category and SKU */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                        >
                          <option value="">Select Category</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Fragrances">Fragrances</option>
                          <option value="Wallets & Belts">Wallets & Belts</option>
                          <option value="Footwear">Footwear</option>
                          <option value="Timepieces">Timepieces</option>
                          <option value="Eyewear">Eyewear</option>
                          <option value="Bags & Luggage">Bags & Luggage</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          SKU *
                        </label>
                        <input
                          type="text"
                          value={formData.sku}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sku: e.target.value.toUpperCase(),
                            })
                          }
                          required
                          maxLength={30}
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 uppercase"
                          placeholder="SUIT-001"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Description * (Max 1000 characters)
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                        maxLength={1000}
                        rows={4}
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 resize-none"
                        placeholder="Finest Italian wool suit with premium craftsmanship..."
                      />
                      <p className="text-white/40 text-xs mt-1 text-right">
                        {formData.description.length}/1000
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Pricing & Stock
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Price *
                        </label>
                        <input
                          type="number"
                          value={formData.priceAmount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              priceAmount: e.target.value,
                            })
                          }
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                          placeholder="1499"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Original Price *
                        </label>
                        <input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              originalPrice: e.target.value,
                            })
                          }
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                          placeholder="1999"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Currency *
                        </label>
                        <select
                          value={formData.priceCurrency}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              priceCurrency: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        required
                        min="0"
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                        placeholder="25"
                      />
                    </div>
                  </div>

                  {/* Product Images */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Product Images *
                    </h3>

                    <div className="border-2 border-dashed border-white/10 hover:border-white/30 p-8 text-center transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload
                          size={32}
                          className="text-white/40 mx-auto mb-2"
                        />
                        <p className="text-white/60 font-light tracking-wide text-sm mb-1">
                          Click to upload product images (Max 5)
                        </p>
                        <p className="text-white/40 font-light text-xs">
                          Supported formats: JPG, PNG, WebP
                        </p>
                        {imageFiles.length > 0 && (
                          <div className="mt-4">
                            <p className="text-white/60 text-sm mb-2">
                              {imageFiles.length} file(s) selected:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {Array.from(imageFiles).map((file, idx) => (
                                <span
                                  key={idx}
                                  className="text-white/40 text-xs bg-white/5 px-3 py-1 border border-white/10"
                                >
                                  {file.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Variants */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Product Variants
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Sizes */}
                      <DynamicInputArray
                        label="Sizes (Optional)"
                        values={formData.sizes}
                        onChange={(sizes) =>
                          setFormData({ ...formData, sizes })
                        }
                        placeholder="e.g., S, M, L, XL, 38, 40, 42"
                      />

                      {/* Colors */}
                      <DynamicInputArray
                        label="Colors (Optional)"
                        values={formData.colors}
                        onChange={(colors) =>
                          setFormData({ ...formData, colors })
                        }
                        placeholder="e.g., Black, Navy, Charcoal"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Product Features
                    </h3>

                    <DynamicInputArray
                      label="Features (Optional)"
                      values={formData.features}
                      onChange={(features) =>
                        setFormData({ ...formData, features })
                      }
                      placeholder="e.g., 100% Italian Wool, Hand-stitched, Dry Clean Only"
                    />
                  </div>

                  {/* Specifications */}
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Specifications (Optional)
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                          className="px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                          placeholder="Specification name (e.g., Material)"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={specValue}
                            onChange={(e) => setSpecValue(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), handleAddSpecification())
                            }
                            className="flex-1 px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                            placeholder="Value (e.g., 100% Wool)"
                          />
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddSpecification}
                            className="px-6 py-3 border border-white/20 text-white font-light tracking-wider text-sm hover:bg-white/5 transition-colors"
                          >
                            ADD
                          </motion.button>
                        </div>
                      </div>

                      {Object.keys(specifications).length > 0 && (
                        <div className="space-y-2">
                          {Object.entries(specifications).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-3 bg-white/5 border border-white/10"
                              >
                                <div className="flex-1">
                                  <span className="text-white/70 font-light text-sm">
                                    {key}:
                                  </span>{" "}
                                  <span className="text-white font-light text-sm">
                                    {value}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpecification(key)}
                                  className="text-white/50 hover:text-red-500 transition-colors ml-4"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="pb-6">
                    <h3 className="text-white/70 font-light tracking-[0.2em] text-sm uppercase mb-4">
                      Shipping Information (Optional)
                    </h3>

                    <div className="space-y-4">
                      {/* Free Shipping Toggle */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="freeShipping"
                          checked={formData.shippingInfo.freeShipping}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shippingInfo: {
                                ...formData.shippingInfo,
                                freeShipping: e.target.checked,
                              },
                            })
                          }
                          className="w-5 h-5 bg-black border border-white/20 checked:bg-white checked:border-white focus:outline-none cursor-pointer"
                        />
                        <label
                          htmlFor="freeShipping"
                          className="text-white/70 font-light tracking-wider text-sm cursor-pointer"
                        >
                          Free Shipping Available
                        </label>
                      </div>

                      {/* Estimated Delivery */}
                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Estimated Delivery
                        </label>
                        <input
                          type="text"
                          value={formData.shippingInfo.estimatedDelivery}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shippingInfo: {
                                ...formData.shippingInfo,
                                estimatedDelivery: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                          placeholder="e.g., 3-5 business days, 1-2 weeks"
                        />
                      </div>

                      {/* Returns Policy */}
                      <div>
                        <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                          Returns Policy
                        </label>
                        <input
                          type="text"
                          value={formData.shippingInfo.returns}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shippingInfo: {
                                ...formData.shippingInfo,
                                returns: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                          placeholder="e.g., 30-day return policy, No returns"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-white/10">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={productLoading}
                      className="flex-1 px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {productLoading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          ADDING PRODUCT...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          ADD PRODUCT
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                        setSpecifications({});
                      }}
                      className="px-8 py-4 border border-white/20 text-white font-light tracking-[0.2em] text-sm hover:bg-white/5 transition-colors"
                    >
                      CANCEL
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Product Modal */}
        <AnimatePresence>
          {showEditModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
                resetForm();
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    EDIT PRODUCT
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedProduct(null);
                      resetForm();
                    }}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <X size={24} className="text-white/70" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Note about editable fields */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30">
                    <p className="text-blue-400 text-xs font-light tracking-wide">
                      Note: Only Title, Description, Price, and Stock can be
                      updated
                    </p>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  {/* Price and Stock (Editable) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        value={formData.priceAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priceAmount: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Stock *
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  {/* Read-only fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 font-light tracking-wider text-xs uppercase mb-2">
                        Category (Read Only)
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        disabled
                        className="w-full px-4 py-3 bg-black/50 border border-white/5 text-white/40 font-light tracking-wide text-sm cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-white/40 font-light tracking-wider text-xs uppercase mb-2">
                        SKU (Read Only)
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        disabled
                        className="w-full px-4 py-3 bg-black/50 border border-white/5 text-white/40 font-light tracking-wide text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Optional: New Images Upload */}
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Update Product Images (Optional)
                    </label>
                    <div className="border-2 border-dashed border-white/10 hover:border-white/30 p-8 text-center transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload-edit"
                      />
                      <label
                        htmlFor="image-upload-edit"
                        className="cursor-pointer"
                      >
                        <Upload
                          size={32}
                          className="text-white/40 mx-auto mb-2"
                        />
                        <p className="text-white/60 font-light tracking-wide text-sm">
                          Upload new images (optional)
                        </p>
                        {imageFiles.length > 0 && (
                          <p className="text-white/40 text-xs mt-2">
                            {imageFiles.length} new file(s) selected
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateProduct}
                      disabled={productLoading}
                      className="flex-1 px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {productLoading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          UPDATE PRODUCT
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedProduct(null);
                        resetForm();
                      }}
                      className="px-8 py-4 border border-white/20 text-white font-light tracking-[0.2em] text-sm hover:bg-white/5 transition-colors"
                    >
                      CANCEL
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SellerDashboard;
