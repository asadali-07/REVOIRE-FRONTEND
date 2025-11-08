import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/new-arrivals' },
      { name: 'Collections', path: '/collections' },
      { name: 'Best Sellers', path: '/best-sellers' },
      { name: 'Sale', path: '/sale' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'Contact', path: '/contact' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

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
    hidden: { opacity: 0, y: 20 },
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
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <motion.h2
                whileHover={{ letterSpacing: '0.3em' }}
                transition={{ duration: 0.3 }}
                className="text-white font-light tracking-[0.25em] text-3xl mb-6 cursor-pointer"
              >
                REVOIRÉ
              </motion.h2>
              <p className="text-white/60 font-light tracking-wide leading-relaxed text-sm mb-6">
                Redefining masculine sophistication through exceptional craftsmanship and refined design since 2024.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="text-white/70" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-light tracking-[0.2em] text-sm mb-6 uppercase">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.path}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white font-light tracking-wide text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-light tracking-[0.2em] text-sm mb-6 uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.path}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white font-light tracking-wide text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-light tracking-[0.2em] text-sm mb-6 uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.path}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white font-light tracking-wide text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-light tracking-[0.2em] text-sm mb-6 uppercase">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.path}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white font-light tracking-wide text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-white/70" strokeWidth={1.5} />
              </div>
              <div>
                <h5 className="text-white font-light tracking-wider text-sm mb-2">Visit Us</h5>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  123 Luxury Avenue<br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white/70" strokeWidth={1.5} />
              </div>
              <div>
                <h5 className="text-white font-light tracking-wider text-sm mb-2">Call Us</h5>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  +1 (555) 123-4567<br />
                  Mon-Sat, 9AM-8PM EST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white/70" strokeWidth={1.5} />
              </div>
              <div>
                <h5 className="text-white font-light tracking-wider text-sm mb-2">Email Us</h5>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  concierge@revoire.com<br />
                  Response within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-white/50 font-light tracking-wider text-sm text-center md:text-left"
              >
                © {currentYear} REVOIRÉ. All rights reserved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-white/50 font-light tracking-wider text-sm"
              >
                MADE WITH<Heart size={14} className="text-red-500 fill-red-500 mx-1" /> BY REVOIRÉ
              </motion.div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;