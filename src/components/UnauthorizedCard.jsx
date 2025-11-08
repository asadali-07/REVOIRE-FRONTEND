import React from "react";
import { Navigate, Link} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Mail, UserCheck } from "lucide-react";

const UnauthorizedCard = ({ onBack }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-6">
    <div className="relative z-10 max-w-xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-950 border border-white/10 p-10 rounded-xl shadow-xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Lock size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-light text-2xl tracking-[0.15em]">Access Restricted</h3>
            <p className="text-white/60 font-light text-sm mt-1">Seller access required</p>
          </div>
        </div>

        <p className="text-white/60 font-light leading-relaxed mb-6">
          Your account does not have seller permissions. To access the Seller Dashboard you must have a
          seller account. You can request seller access or contact support for assistance.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-light tracking-[0.2em] text-sm uppercase"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-light tracking-[0.2em] text-sm uppercase hover:bg-white/5 transition-colors"
          >
            <UserCheck size={16} />
            Request Seller
          </Link>

          <a
            href="mailto:support@example.com"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-white/10 text-white font-light text-sm uppercase hover:bg-white/5 transition-colors"
          >
            <Mail size={16} />
            Contact
          </a>
        </div>

        <div className="mt-6 text-white/40 text-xs font-light">
          <span className="italic">Need help?</span> We typically review seller requests within 48 hours.
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/6" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/6" />
      </div>
    </div>
  </div>
);
export default UnauthorizedCard;