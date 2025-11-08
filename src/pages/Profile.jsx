import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import {useWishlistStore} from '../store/wishlistStore'
import {useOrderStore} from '../store/orderStore'
import {
  User,
  MapPin,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Check,
  Shield,
  Heart,
  ShoppingBag,
  Star,
  Home,
  Building2,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const {wishlist} =useWishlistStore();
  const {orders} = useOrderStore();
  const {
    userDetails,
    getUserDetails,
    logout,
    addNewAddress,
    deleteAddress,
    updateAddress,
    updateUser,
  } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (userDetails) {
      setProfileData({
        firstName: userDetails?.fullName?.firstName || "",
        lastName: userDetails?.fullName?.lastName || "",
        username: userDetails?.username || "",
      });
    }
  }, [userDetails]);

  const handleUpdateProfile = async () => {
    await updateUser(profileData);
    setIsEditing(false);
  };

  const handleAddAddress = async () => {
    await addNewAddress(addressData);
    setShowAddressModal(false);
    setAddressData({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    });
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setAddressData({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowEditModal(true);
  };

  const handleUpdateAddress = async () => {
    await updateAddress(selectedAddress._id, addressData);
    setShowEditModal(false);
    setSelectedAddress(null);
    setAddressData({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    });
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(addressId);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    await updateAddress(addressId, { isDefault: true });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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

  if (!userDetails) {
    return (
      <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white"></div>
            <p className="text-white/60 font-light tracking-wider text-sm mt-4">
              Loading Profile...
            </p>
          </div>
    );
  }

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
            <User size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Account Management
            </span>
            <User size={16} className="text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            MY PROFILE
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-300 font-light tracking-[0.2em] text-xs uppercase"
          >
            <LogOut size={16} />
            LOGOUT
          </motion.button>
        </motion.div>

        {/* Profile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            {
              icon: ShoppingBag,
              label: "Orders",
              value: orders.length || 0,
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Heart,
              label: "Wishlist",
              value: wishlist.length || 0,
              color: "from-red-500 to-pink-500",
            },
            {
              icon: MapPin,
              label: "Addresses",
              value: userDetails?.addresses?.length || 0,
              color: "from-purple-500 to-indigo-500",
            },
            {
              icon: Star,
              label: "Member Since",
              value:
                new Date(userDetails?.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) || "N/A",
              color: "from-yellow-500 to-orange-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500"
            >
              <div
                className={`w-12 h-12 bg-linear-to-br ${stat.color} flex items-center justify-center mb-4`}
              >
                <stat.icon size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <p className="text-white/50 font-light tracking-wider text-xs uppercase mb-1">
                {stat.label}
              </p>
              <p className="text-white font-light tracking-wider text-2xl">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex border border-white/10">
            {["profile", "addresses"].map((tab) => (
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-zinc-950 border border-white/10 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    PERSONAL INFORMATION
                  </h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                    >
                      <Edit size={16} />
                      EDIT
                    </motion.button>
                  ) : (
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUpdateProfile}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                      >
                        <Save size={16} />
                        SAVE
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData({
                            firstName: userDetails?.fullName?.firstName || "",
                            lastName: userDetails?.fullName?.lastName || "",
                            username: userDetails?.username || "",
                          });
                        }}
                        className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                      >
                        <X size={16} />
                        CANCEL
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          username: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userDetails?.email || ""}
                      disabled
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white/50 font-light tracking-wide text-sm cursor-not-allowed"
                    />
                    <p className="text-white/40 font-light tracking-wide text-xs mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Role
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-black border border-white/10">
                      <Shield size={16} className="text-white/70" />
                      <span className="text-white font-light tracking-wider text-sm uppercase">
                        {userDetails?.role || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    SAVED ADDRESSES
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors font-light tracking-[0.2em] text-xs uppercase"
                  >
                    <Plus size={16} />
                    ADD ADDRESS
                  </motion.button>
                </div>

                {!userDetails?.addresses ||
                userDetails.addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin size={48} className="mx-auto text-white/20 mb-4" />
                    <p className="text-white/50 font-light tracking-wider text-sm">
                      No addresses saved yet
                    </p>
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {userDetails?.addresses?.map((address) => (
                      <motion.div
                        key={address._id}
                        variants={itemVariants}
                        className="relative bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500"
                      >
                        {/* Default Badge */}
                        {address.isDefault && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/50">
                            <span className="text-green-500 text-xs tracking-wider font-light uppercase flex items-center gap-1">
                              <Check size={12} />
                              Default
                            </span>
                          </div>
                        )}

                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            {address.isDefault ? (
                              <Home size={20} className="text-white/70" />
                            ) : (
                              <Building2 size={20} className="text-white/70" />
                            )}
                            <h3 className="text-white font-light tracking-[0.15em] text-lg">
                              {address.isDefault
                                ? "HOME ADDRESS"
                                : "DELIVERY ADDRESS"}
                            </h3>
                          </div>
                          <div className="text-white/60 font-light tracking-wide text-sm space-y-1">
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleSetDefaultAddress(address._id)
                              }
                              className="flex-1 px-4 py-2 border border-white/20 text-white hover:bg-white/5 transition-colors font-light tracking-wider text-xs uppercase"
                            >
                              Set Default
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditAddress(address)}
                            className="p-2 border border-white/20 hover:bg-white/5 transition-colors"
                          >
                            <Edit size={16} className="text-white/70" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteAddress(address._id)}
                            disabled={address.isDefault}
                            className="p-2 border border-white/20 hover:bg-red-500/20 hover:border-red-500/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={16} className="text-white/70" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Add Address Modal */}
        <AnimatePresence>
          {showAddressModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddressModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border mt-32 border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    ADD NEW ADDRESS
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <X size={24} className="text-white/70" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          street: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={addressData.city}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressData.state}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={addressData.zip}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            zip: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={addressData.country}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addressData.isDefault}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            isDefault: e.target.checked,
                          })
                        }
                        className="w-5 h-5 bg-black border border-white/20 checked:bg-white cursor-pointer"
                      />
                      <span className="text-white/70 font-light tracking-wider text-sm">
                        Set as default address
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddAddress}
                      className="flex-1 px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      ADD ADDRESS
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAddressModal(false);
                        setAddressData({
                          street: "",
                          city: "",
                          state: "",
                          zip: "",
                          country: "",
                          isDefault: false,
                        });
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

        {/* Edit Address Modal */}
        <AnimatePresence>
          {showEditModal && selectedAddress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white font-light tracking-[0.2em] text-2xl">
                    EDIT ADDRESS
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedAddress(null);
                      setAddressData({
                        street: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                        isDefault: false,
                      });
                    }}
                    className="p-2 hover:bg-white/5 transition-colors"
                  >
                    <X size={24} className="text-white/70" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          street: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={addressData.city}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressData.state}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={addressData.zip}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            zip: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={addressData.country}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addressData.isDefault}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            isDefault: e.target.checked,
                          })
                        }
                        className="w-5 h-5 bg-black border border-white/20 checked:bg-white cursor-pointer"
                      />
                      <span className="text-white/70 font-light tracking-wider text-sm">
                        Set as default address
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateAddress}
                      className="flex-1 px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      UPDATE ADDRESS
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedAddress(null);
                        setAddressData({
                          street: "",
                          city: "",
                          state: "",
                          zip: "",
                          country: "",
                          isDefault: false,
                        });
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

export default Profile;
