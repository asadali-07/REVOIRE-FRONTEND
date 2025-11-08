import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Bell, 
  Sparkles,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';

const NewArrivals = () => {
  const [notifyList, setNotifyList] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');


  // Countdown timer hook
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Upcoming products
  const upcomingProducts = [
    {
      id: 1,
      name: 'Heritage Leather Collection',
      category: 'Accessories',
      launchDate: 'December 15, 2024',
      daysLeft: 15,
      image: "https://ik.imagekit.io/c22wilw9s/products/a2568114-b181-44d3-8c1f-7033d38e7707_llU6DF9RG",
      description: 'Premium handcrafted leather goods featuring traditional craftsmanship',
      teaser: 'Limited Edition - Only 100 pieces',
      price: 599,
      status: 'Coming Soon',
    },
    {
      id: 2,
      name: 'Winter Cashmere Collection',
      category: 'Clothing',
      launchDate: 'December 20, 2024',
      daysLeft: 20,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Clothes.jpg?updatedAt=1762455301017',
      description: 'Luxurious cashmere blend suits and coats for the discerning gentleman',
      teaser: 'Pre-order available',
      price: 2499,
      status: 'Pre-Order',
    },
    {
      id: 3,
      name: 'Signature Noir Collection',
      category: 'Fragrances',
      launchDate: 'January 5, 2025',
      daysLeft: 36,
      image: 'https://ik.imagekit.io/c22wilw9s/products/ed0a852f-405b-473e-9cc3-6c6ca066129f_H-lwIlZzg',
      description: 'Exclusive fragrance line with notes of leather, cedar, and amber',
      teaser: 'Master Perfumer Collaboration',
      price: 349,
      status: 'Notify Me',
    },
    {
      id: 4,
      name: 'Chronograph Limited Edition',
      category: 'Timepieces',
      launchDate: 'January 15, 2025',
      daysLeft: 46,
      image: 'https://ik.imagekit.io/c22wilw9s/products/7e1b90cd-0e0c-4f9c-be84-77e7aa398c18_VWvJinHRK',
      description: 'Swiss-made automatic chronograph with sapphire crystal',
      teaser: 'Only 50 pieces worldwide',
      price: 8999,
      status: 'Notify Me',
    },
    {
      id: 5,
      name: 'Artisan Footwear Series',
      category: 'Footwear',
      launchDate: 'February 1, 2025',
      daysLeft: 63,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Shoes.jpg?updatedAt=1762455170279',
      description: 'Handmade Italian leather shoes with Goodyear welt construction',
      teaser: 'Made to Order',
      price: 1299,
      status: 'Notify Me',
    },
    {
      id: 6,
      name: 'Aviator Prestige Collection',
      category: 'Eyewear',
      launchDate: 'February 14, 2025',
      daysLeft: 76,
      image: 'https://ik.imagekit.io/c22wilw9s/products/Sunglasses.jpg?updatedAt=1762455301017',
      description: 'Titanium frame sunglasses with polarized lenses',
      teaser: 'Designer Collaboration',
      price: 699,
      status: 'Notify Me',
    },
  ];

  const toggleNotify = (productId) => {
    setNotifyList(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Coming Soon
            </span>
            <Sparkles size={16} className="text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-6"
          >
            NEW ARRIVALS
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 font-light tracking-wider text-lg max-w-2xl mx-auto"
          >
            Be the first to discover our latest luxury collections. Register for exclusive early access.
          </motion.p>
        </motion.div>

        {/* Featured Launch - Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <div className="relative bg-zinc-950 border border-white/10 p-8 lg:p-12 overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              {/* Countdown Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 mb-6">
                  <TrendingUp size={16} className="text-red-500" />
                  <span className="text-red-500 text-xs tracking-[0.2em] font-light uppercase">
                    Launching Soon
                  </span>
                </div>

                <h2 className="text-white font-light tracking-[0.15em] text-3xl sm:text-4xl mb-4">
                  {upcomingProducts[0].name}
                </h2>
                <p className="text-white/60 font-light tracking-wide text-sm uppercase mb-4">
                  {upcomingProducts[0].category}
                </p>
                <p className="text-white/70 font-light tracking-wide leading-relaxed mb-6">
                  {upcomingProducts[0].description}
                </p>

                {/* Countdown Timer */}
                <div className="mb-8">
                  <p className="text-white/50 font-light tracking-wider text-xs uppercase mb-4">
                    Launches In
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="bg-black border border-white/20 p-4 mb-2">
                          <span className="text-white font-light tracking-wider text-3xl">
                            {value.toString().padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-white/50 font-light tracking-wider text-xs uppercase">
                          {unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleNotify(upcomingProducts[0].id)}
                  className={`group relative px-10 py-4 font-light tracking-[0.2em] text-sm overflow-hidden ${
                    notifyList.includes(upcomingProducts[0].id)
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Bell size={18} />
                    {notifyList.includes(upcomingProducts[0].id) ? 'NOTIFICATION SET' : 'NOTIFY ME'}
                  </span>
                </motion.button>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={upcomingProducts[0].image}
                  alt={upcomingProducts[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-4">
              UPCOMING LAUNCHES
            </h2>
            <div className="h-px w-32 bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingProducts.slice(1).map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-80" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/30">
                      <p className="text-white text-xs tracking-[0.2em] font-light uppercase">
                        {product.status}
                      </p>
                    </div>

                    {/* Days Left */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/70 mb-2">
                        <Calendar size={14} />
                        <span className="text-xs font-light tracking-wide">
                          {product.launchDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Clock size={14} />
                        <span className="text-xs font-light tracking-wide">
                          {product.daysLeft} days remaining
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 grow flex flex-col justify-between">
                    <div>
                      <p className="text-white/50 text-xs tracking-[0.25em] font-light uppercase mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-white font-light tracking-widest text-xl mb-3 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-white/60 font-light tracking-wide text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Teaser */}
                      <div className="flex items-center gap-2 text-yellow-500/80 mb-4">
                        <Star size={14} className="fill-yellow-500/80" />
                        <span className="text-xs font-light tracking-wide">
                          {product.teaser}
                        </span>
                      </div>

                      {/* Expected Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white/50 font-light tracking-wide text-xs">
                          Expected Price:
                        </span>
                        <span className="text-white font-light tracking-wider text-xl">
                          ${product.price}
                        </span>
                      </div>
                    </div>

                    {/* Notify Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleNotify(product.id)}
                      className={`w-full py-3 font-light tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                        notifyList.includes(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-black hover:bg-white/90'
                      }`}
                    >
                      <Bell size={16} />
                      {notifyList.includes(product.id) ? 'NOTIFICATION SET' : 'NOTIFY ME'}
                    </motion.button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                      className="h-full bg-linear-to-r from-white via-white/80 to-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${100 - (product.daysLeft / 100) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto bg-zinc-950 border border-white/10 p-12">
            <h3 className="text-white font-light tracking-[0.2em] text-2xl mb-4">
              EXCLUSIVE ACCESS
            </h3>
            <p className="text-white/60 font-light tracking-wide mb-8">
              Subscribe to receive launch notifications and early access to new collections
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-black border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){ 
                    setSubscribed(true);
                    setEmail('');
                  }
                  else{
                    alert('Please enter a valid email address.');
                  }
                }}
                className="px-8 py-4 bg-white text-black font-light tracking-[0.2em] text-sm hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                SUBSCRIBE
                <ArrowRight size={18} />
              </motion.button>
            </div>
             {subscribed && (<p className="text-green-500 text-sm mt-3">Thank you for subscribing!</p>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;