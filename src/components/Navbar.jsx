import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Heart, Package } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, getCurrentUser } = useAuthStore();
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  
  useEffect(() => {
    if (!user) getCurrentUser();
  }, [getCurrentUser, user]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink to="/">
              <img src="/logo.svg" alt="Logo" className="h-16" />
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-white font-light tracking-widest text-sm transition-all duration-300 relative ${
                      isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? "100%" : 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
            {user && user?.role === "seller" && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `ml-6 text-white font-light tracking-widest text-sm ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/orders">
                <Package size={20} strokeWidth={1.5} />
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/wishlist">
                <Heart size={20} strokeWidth={1.5} />
              </Link>
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                {wishlist.length}
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/cart">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                {cart.length}
              </span>
            </motion.button>
            {!user ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:opacity-70 transition-opacity relative"
              >
                <Link to="/login">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              </motion.button>
            ) : (
              <Link to="/profile">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-black border border-white/10 text-white font-light tracking-[0.2em] text-sm uppercase hover:border-white/30 transition-all duration-300">
                  {user?.email?.slice(0, 1).toUpperCase()}
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black border-t border-white/10"
      >
        <div className="px-4 py-6 space-y-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-white font-light tracking-widest text-sm ${
                  isActive ? "opacity-100" : "opacity-70"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {user && user?.role === "seller" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `ml-6 text-white font-light tracking-widest text-sm ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          <div className="flex space-x-6 pt-4 border-t border-white/10">
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/orders">
                <Package size={20} strokeWidth={1.5} />
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/wishlist">
                <Heart size={20} strokeWidth={1.5} />
              </Link>
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                0
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <Link to="/cart">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                0
              </span>
            </motion.button>
            {!user ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:opacity-70 transition-opacity relative"
              >
                <Link to="/login">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              </motion.button>
            ) : (
              <Link to="/profile">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-black border border-white/10 text-white font-light tracking-[0.2em] text-sm uppercase hover:border-white/30 transition-all duration-300">
                  {user?.email?.slice(0, 1).toUpperCase()}
                </div>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
