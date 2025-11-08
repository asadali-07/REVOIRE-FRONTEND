import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Collections = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 1,
      name: 'Accessories',
      description: 'Refined Details',
      tagline: 'Elevate Every Moment',
      image: 'https://ik.imagekit.io/c22wilw9s/accessories.jpg?updatedAt=1762458679967',
      items: '24 Items',
    },
    {
      id: 2,
      name: 'Clothing',
      description: 'Tailored Excellence',
      tagline: 'Bespoke Perfection',
      image: 'https://ik.imagekit.io/c22wilw9s/products/Clothes.jpg?updatedAt=1762455301017',
      items: '48 Items',
    },
    {
      id: 3,
      name: 'Fragrances',
      description: 'Signature Scents',
      tagline: 'Timeless Essence',
      image: 'https://ik.imagekit.io/c22wilw9s/products/ed0a852f-405b-473e-9cc3-6c6ca066129f_H-lwIlZzg',
      items: '16 Items',
    },
    {
      id: 4,
      name: 'Wallets & Belts',
      description: 'Premium Leather',
      tagline: 'Crafted Heritage',
      image: "https://ik.imagekit.io/c22wilw9s/products/a2568114-b181-44d3-8c1f-7033d38e7707_llU6DF9RG",
      items: '12 Items',
    },
    {
      id: 5,
      name: 'Footwear',
      description: 'Artisan Made',
      tagline: 'Walk With Distinction',
      image: 'https://ik.imagekit.io/c22wilw9s/products/Shoes.jpg?updatedAt=1762455170279',
      items: '32 Items',
    },
    {
      id: 6,
      name: 'Eyewear',
      description: 'Iconic Styles',
      tagline: 'Vision Of Luxury',
      image: 'https://ik.imagekit.io/c22wilw9s/products/Sunglasses.jpg?updatedAt=1762455301017',
      items: '20 Items',
    },
    {
      id: 7,
      name: 'Timepieces',
      description: 'Swiss Precision',
      tagline: 'Master Of Time',
      image: 'https://ik.imagekit.io/c22wilw9s/products/7e1b90cd-0e0c-4f9c-be84-77e7aa398c18_VWvJinHRK',
      items: '14 Items',
    },
    {
      id: 8,
      name: 'Bags & Luggage',
      description: 'Travel in Style',
      tagline: 'Journey With Elegance',
      image: 'https://ik.imagekit.io/c22wilw9s/products/4b6329d6-b056-4ba9-81de-2ea1d2e96a06_cx0EpVIyY',
      items: '28 Items',
    }
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id='collections' className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-5 bg-[url('https://ik.imagekit.io/c22wilw9s/collection-bg.jpg?updatedAt=1762458679939')] bg-cover bg-center"
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Curated Excellence
            </span>
            <Sparkles size={16} className="text-white/60" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-6xl sm:text-7xl md:text-8xl mb-8"
          >
            COLLECTIONS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg tracking-wider font-light max-w-2xl mx-auto mb-8"
          >
            Discover our meticulously curated selection of premium essentials
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Premium Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, index) => (
              <Link to={`/products?category=${encodeURIComponent(category.name)}`} key={category.id}>
              <motion.div
                key={category.id}
                variants={itemVariants}
                layout
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -15 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative overflow-hidden bg-zinc-950 border border-white/5 cursor-pointer h-[500px]"
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={hoveredIndex === index ? { x: '200%' } : {}}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />

                  {/* Image Container with Luxury Overlay */}
                  <div className="relative h-full overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    
                    {/* Multi-layer linear Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-black/40" />
                    
                    {/* Luxury Border Glow */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20"
                      transition={{ duration: 0.5 }}
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Premium Badge */}
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/20"
                    >
                      <span className="text-white text-xs tracking-[0.2em] font-light">
                        {category.items}
                      </span>
                    </motion.div>
                  </div>

                  {/* Luxury Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mb-4"
                        >
                          <p className="text-white/80 text-xs tracking-[0.25em] font-light uppercase italic">
                            {category.tagline}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.p
                      className="text-white/50 text-xs tracking-[0.25em] font-light uppercase mb-2"
                      whileHover={{ x: 5 }}
                    >
                      {category.description}
                    </motion.p>
                    
                    <motion.h3
                      className="text-white font-light tracking-[0.15em] text-3xl mb-6"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.name}
                    </motion.h3>
                    
                    {/* Luxury Explore Button */}
                    <motion.div
                      className="flex items-center gap-3 text-white/70 group-hover:text-white transition-colors duration-300"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-white/10 blur-md"
                          animate={hoveredIndex === index ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative text-sm tracking-[0.2em] font-light">
                          DISCOVER
                        </span>
                      </div>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Animated Bottom Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-white via-white/80 to-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premium Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-28"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-14 py-5 bg-white text-black font-light tracking-[0.25em] text-sm overflow-hidden border-2 border-white"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-300">
              {showAll ? 'SHOW LESS' : 'VIEW ENTIRE COLLECTION'}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} className={showAll ? 'rotate-180' : ''} />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;