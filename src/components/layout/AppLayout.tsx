import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from '../navigation/Header';
import { BottomNavigation } from '../navigation/BottomNavigation';
import { useBooking } from '../../context/BookingContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { WaveLogo, OrangeMoneyLogo, VisaLogo, MastercardLogo } from '../ui/PaymentLogos';

export const AppLayout: React.FC = () => {
  const { toastMessage } = useBooking();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-12">
        <Outlet />
      </main>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-orange-500/40 text-xs sm:text-sm text-white shadow-2xl backdrop-blur-md flex items-center gap-2 pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer responsive Mobile / Tablette / Desktop */}
      <footer className="border-t border-slate-800/80 bg-[#080B10] pt-10 pb-24 md:pb-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section: Brand + Payment Methods Reassurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-800/60 items-center">
            {/* Left: Brand info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-lg tracking-tight">Fodium</span>
                <span className="text-orange-400 text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 font-semibold uppercase tracking-wider">
                  Sénégal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 max-w-md leading-relaxed">
                La plateforme de référence pour réserver vos billets d’événements et vos trajets en navettes partagées à Dakar.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Paiements instantanés cryptés & billets électroniques infalsifiables</span>
              </div>
            </div>

            {/* Right: Payment Methods with Official Logos */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3.5 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                Moyens de paiement acceptés
              </span>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                {/* Wave */}
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                  <WaveLogo className="w-8 h-8 rounded-xl" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-white">Wave</div>
                    <div className="text-[10px] text-slate-400">Mobile Money</div>
                  </div>
                </div>

                {/* Orange Money */}
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                  <OrangeMoneyLogo className="w-8 h-8 rounded-xl" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-white">Orange Money</div>
                    <div className="text-[10px] text-slate-400">Sénégal</div>
                  </div>
                </div>

                {/* Visa */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                  <VisaLogo className="w-9 h-6.5 rounded-md" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-white">Visa</div>
                    <div className="text-[10px] text-slate-400">Carte bancaire</div>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                  <MastercardLogo className="w-9 h-6.5 rounded-md" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-white">Mastercard</div>
                    <div className="text-[10px] text-slate-400">Internationale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Links & Credits (optimized for Tablet & Mobile) */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
              <Link to="/events" className="hover:text-white transition-colors">Événements</Link>
              <Link to="/transport" className="hover:text-white transition-colors">Transport (Bientôt)</Link>
              <Link to="/tickets" className="hover:text-white transition-colors">Mes Billets</Link>
              <Link to="/profile" className="hover:text-white transition-colors">Mon Compte</Link>
            </div>

            <div className="text-center md:text-right text-xs">
              Développé par <span className="text-orange-400 font-semibold">Momar</span> · <span className="text-slate-200 font-semibold">Kanzey.co</span>
              <span className="hidden sm:inline mx-2 text-slate-600">|</span>
              <span className="text-slate-500 block sm:inline mt-1 sm:mt-0">© 2026 Fodium. Tous droits réservés.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
