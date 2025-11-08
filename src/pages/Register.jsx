import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData);
    if (response?.status === 201) navigate("/");
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_50%)]" />
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <motion.h1
              whileHover={{ letterSpacing: "0.3em" }}
              transition={{ duration: 0.3 }}
              className="text-white font-light tracking-[0.25em] text-6xl mb-6"
            >
              REVOIRÉ
            </motion.h1>
            <p className="text-white/60 font-light tracking-wider text-lg leading-relaxed mb-8">
              Join our exclusive community and experience luxury redefined.
              Create your account to access premium collections and personalized
              services.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Exclusive early access to new collections",
                "Personalized styling recommendations",
                "Priority customer support",
                "Special member-only offers",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-white/70"
                    strokeWidth={1.5}
                  />
                  <span className="text-white/70 font-light tracking-wide text-sm">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative bg-zinc-950 border border-white/10 p-8 sm:p-12">
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20" />

              {/* Header */}
              <div className="text-center mb-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-3"
                >
                  CREATE ACCOUNT
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto mb-4"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white/60 font-light tracking-wider text-sm"
                >
                  Begin your journey with REVOIRÉ
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                        required
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-px bg-white"
                        initial={{ width: 0 }}
                        animate={{
                          width: focusedField === "firstName" ? "100%" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                  >
                    <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                        required
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-px bg-white"
                        initial={{ width: 0 }}
                        animate={{
                          width: focusedField === "lastName" ? "100%" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <User
                        size={18}
                        className="text-white/40"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-white"
                      initial={{ width: 0 }}
                      animate={{
                        width: focusedField === "username" ? "100%" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                >
                  <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail
                        size={18}
                        className="text-white/40"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === "email" ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock
                        size={18}
                        className="text-white/40"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-12 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={18} strokeWidth={1.5} />
                      ) : (
                        <Eye size={18} strokeWidth={1.5} />
                      )}
                    </button>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-white"
                      initial={{ width: 0 }}
                      animate={{
                        width: focusedField === "password" ? "100%" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Role Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.85 }}
                >
                  <label className="block text-white/70 font-light tracking-wider text-xs uppercase mb-2">
                    Account Type
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-all duration-300"
                  >
                    <option value="user">Personal Account</option>
                    <option value="seller">Business Account</option>
                  </select>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
                    CREATE ACCOUNT
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </motion.button>

                {/* Login Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-center pt-4"
                >
                  <p className="text-white/60 font-light tracking-wider text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-white hover:text-white/80 transition-colors underline underline-offset-4"
                    >
                      Sign In
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;
