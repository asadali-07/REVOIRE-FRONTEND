import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Star, 
  Shield,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: Users },
    { number: '50+', label: 'Countries Worldwide', icon: Globe },
    { number: '15+', label: 'Years Excellence', icon: Award },
    { number: '99%', label: 'Satisfaction Rate', icon: Star },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Every piece undergoes rigorous quality control to ensure perfection.',
    },
    {
      icon: Heart,
      title: 'Customer Centric',
      description: 'Your satisfaction is our ultimate measure of success.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Continuously evolving to bring you the finest luxury experience.',
    },
    {
      icon: Target,
      title: 'Authenticity',
      description: 'Genuine craftsmanship and materials in every product.',
    },
  ];

  const milestones = [
    { year: '2009', title: 'Founded', description: 'REVOIRÉ was born from a vision of redefining masculine luxury' },
    { year: '2012', title: 'Global Expansion', description: 'Opened flagship stores in Paris, Milan, and New York' },
    { year: '2016', title: 'Digital Evolution', description: 'Launched our premium e-commerce platform' },
    { year: '2020', title: 'Sustainability', description: 'Committed to ethical sourcing and eco-friendly practices' },
    { year: '2024', title: 'Today', description: 'Leading the luxury menswear industry with innovation' },
  ];

  const team = [
    {
      name: 'Alexandre Dubois',
      role: 'Founder & CEO',
      image: 'https://ik.imagekit.io/c22wilw9s/products/pexels-dinielle-de-veyra-2610843-4195345.jpg?updatedAt=1762533860512',
      bio: 'Visionary leader with 20 years in luxury fashion',
    },
    {
      name: 'Marcus Sterling',
      role: 'Creative Director',
      image: 'https://ik.imagekit.io/c22wilw9s/products/pexels-chloekalaartist-1043473.jpg?updatedAt=1762533873452',
      bio: 'Award-winning designer from Milan Fashion Week',
    },
    {
      name: 'Isabella Chen',
      role: 'Head of Operations',
      image: 'https://ik.imagekit.io/c22wilw9s/products/pexels-kensin-kei-807258-1678824.jpg?updatedAt=1762533955261',
      bio: 'Expert in luxury retail and customer experience',
    },
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
    <section className="relative min-h-screen bg-black overflow-hidden">
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
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <Sparkles size={16} className="text-white/60" />
              <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
                Our Legacy
              </span>
              <Sparkles size={16} className="text-white/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white font-light tracking-[0.25em] text-5xl sm:text-7xl md:text-8xl mb-8"
            >
              ABOUT REVOIRÉ
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto mb-12"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/70 font-light tracking-wider text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            >
              Crafting timeless sophistication for the modern gentleman. 
              Where heritage meets innovation, and every piece tells a story of uncompromising quality.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-16 bg-linear-to-b from-white/60 to-transparent mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500">
                    <stat.icon size={32} className="text-white/70" strokeWidth={1.5} />
                  </div>
                  <motion.div
                    className="absolute -inset-2 border border-white/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-white font-light tracking-[0.2em] text-4xl sm:text-5xl mb-3">
                  {stat.number}
                </h3>
                <p className="text-white/60 font-light tracking-wider text-sm uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex border border-white/10 mb-16">
              {['story', 'values', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-light tracking-[0.2em] text-sm uppercase transition-all duration-500 ${
                    activeTab === tab
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {activeTab === 'story' && (
                <div className="space-y-8">
                  <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-6 text-center">
                    OUR STORY
                  </h2>
                  <div className="space-y-6 text-white/70 font-light tracking-wide leading-relaxed text-base sm:text-lg">
                    <p>
                      Founded in 2009, REVOIRÉ emerged from a singular vision: to redefine masculine 
                      sophistication for the modern era. What began as a boutique atelier in Paris has 
                      evolved into a globally recognized symbol of luxury and refinement.
                    </p>
                    <p>
                      Our name, derived from the French "revoir" meaning "to see again," embodies our 
                      philosophy of reimagining classic elegance through contemporary eyes. Each piece 
                      we create is a testament to this ethos—timeless yet innovative, traditional yet bold.
                    </p>
                    <p>
                      From meticulously crafted leather goods to precision timepieces, from signature 
                      fragrances to bespoke tailoring, every REVOIRÉ creation undergoes the same rigorous 
                      standard of excellence. We source only the finest materials, partner with master 
                      artisans, and embrace cutting-edge techniques to deliver products that transcend trends.
                    </p>
                    <p>
                      Today, REVOIRÉ serves discerning gentlemen in over 50 countries, maintaining the 
                      intimate attention to detail that defined our beginning while embracing the innovation 
                      that drives our future.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-12 text-center">
                    OUR VALUES
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-zinc-950 border border-white/10 hover:border-white/20 p-8 transition-all duration-500"
                      >
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />
                        
                        <value.icon size={40} className="text-white/70 mb-6" strokeWidth={1.5} />
                        <h3 className="text-white font-light tracking-[0.15em] text-xl mb-4">
                          {value.title}
                        </h3>
                        <p className="text-white/60 font-light tracking-wide leading-relaxed text-sm">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div>
                  <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-12 text-center">
                    OUR JOURNEY
                  </h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
                    
                    <div className="space-y-12">
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="relative pl-24 group"
                        >
                          {/* Year Badge */}
                          <div className="absolute left-0 top-0">
                            <div className="w-16 h-16 border-2 border-white/20 bg-black flex items-center justify-center group-hover:border-white/40 transition-colors duration-500">
                              <span className="text-white font-light tracking-wider text-sm">
                                {milestone.year}
                              </span>
                            </div>
                            <div className="absolute top-1/2 right-0 w-8 h-px bg-white/20" />
                          </div>

                          <div className="bg-zinc-950 border border-white/10 hover:border-white/20 p-6 transition-all duration-500">
                            <h3 className="text-white font-light tracking-[0.15em] text-xl mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-white/60 font-light tracking-wide text-sm">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-4">
                LEADERSHIP TEAM
              </h2>
              <p className="text-white/60 font-light tracking-wide text-sm">
                Visionaries behind the brand
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-zinc-950 border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500"
                >
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-light tracking-[0.15em] text-xl mb-2">
                      {member.name}
                    </h3>
                    <p className="text-white/60 font-light tracking-wider text-sm uppercase mb-4">
                      {member.role}
                    </p>
                    <p className="text-white/50 font-light tracking-wide text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-white font-light tracking-[0.2em] text-3xl sm:text-4xl mb-6">
              EXPERIENCE EXCELLENCE
            </h2>
            <p className="text-white/60 font-light tracking-wide text-lg mb-12 leading-relaxed">
              Discover how REVOIRÉ can elevate your personal style
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-12 py-5 bg-white text-black font-light tracking-[0.25em] text-sm overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 transition-colors duration-300">
                <Link to="/products">EXPLORE COLLECTIONS</Link>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;