import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What makes REVOIRÉ products exceptional?',
      answer: 'Each REVOIRÉ piece is meticulously crafted using premium materials sourced from the finest artisans worldwide. Our commitment to excellence ensures that every product meets the highest standards of quality, durability, and timeless elegance. We combine traditional craftsmanship with contemporary design to create pieces that transcend trends.',
    },
    {
      id: 2,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we provide worldwide shipping to over 150 countries. All orders are carefully packaged in our signature luxury boxes and shipped via premium express courier services. Complimentary shipping is available for orders above $500, with tracking and insurance included. Delivery times vary by location, typically ranging from 3-7 business days.',
    },
    {
      id: 3,
      question: 'What is your return and exchange policy?',
      answer: 'We offer a 30-day return policy for unworn, unused items in their original packaging. Returns are complimentary, and exchanges are processed within 48 hours. For personalized or custom-made items, please contact our concierge team to discuss your options. Your satisfaction is our priority, and we strive to make the process seamless.',
    },
    {
      id: 4,
      question: 'Are REVOIRÉ products authentic and guaranteed?',
      answer: 'Absolutely. Every REVOIRÉ product comes with a certificate of authenticity and is backed by our lifetime quality guarantee. We stand behind the craftsmanship of our pieces and offer complimentary maintenance services to ensure your items remain in pristine condition for years to come.',
    },
    {
      id: 5,
      question: 'How do I care for my luxury items?',
      answer: 'Each product includes detailed care instructions tailored to its specific materials. For leather goods, we recommend using our premium leather care kit. Timepieces should be serviced every 3-5 years at authorized centers. Our customer care team is available 24/7 to provide personalized guidance for maintaining your REVOIRÉ collection.',
    },
    {
      id: 6,
      question: 'Do you offer personalization services?',
      answer: 'Yes, we provide bespoke monogramming and personalization services for select products. Our master artisans can add custom initials, dates, or messages using traditional techniques. Personalization typically adds 7-10 business days to processing time. Contact our concierge team to explore customization options.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_50%)]" />
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <HelpCircle size={16} className="text-white/60" />
            <span className="text-white/60 tracking-[0.4em] text-xs font-light uppercase">
              Your Questions Answered
            </span>
            <HelpCircle size={16} className="text-white/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-light tracking-[0.25em] text-5xl sm:text-6xl md:text-7xl mb-8"
          >
            FREQUENTLY ASKED
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg tracking-wider font-light max-w-2xl mx-auto mb-8"
          >
            Everything you need to know about our luxury collection and services
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto"
          />
        </motion.div>

        {/* Accordion Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={openIndex === index ? { x: '200%' } : {}}
                  transition={{ duration: 1.5, ease: 'easeInOut', repeat: openIndex === index ? Infinity : 0 }}
                />

                {/* Question Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left relative z-10"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                        <span className="text-white/60 font-light tracking-wider text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                    <h3 className="text-white font-light tracking-widest text-lg sm:text-xl pr-4">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus size={20} className="text-white" strokeWidth={1.5} />
                    ) : (
                      <Plus size={20} className="text-white/60 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    )}
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="px-8 pb-8 pl-[88px]"
                      >
                        <div className="border-l border-white/10 pl-6">
                          <p className="text-white/70 font-light tracking-wide leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-linear-to-r from-white via-white/60 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: openIndex === index ? '100%' : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-white/60 font-light tracking-wider mb-6">
            Still have questions?
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-4 border-2 border-white text-white font-light tracking-[0.25em] text-sm overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10  transition-colors duration-300">
              CONTACT CONCIERGE
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Accordion;