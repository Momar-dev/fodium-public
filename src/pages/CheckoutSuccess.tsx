import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Ticket,
  Bus,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Share2,
  Download,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { WaveLogo, OrangeMoneyLogo, CardPaymentLogo } from '../components/ui/PaymentLogos';

export const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { tickets, formatPrice, showToast } = useBooking();

  const ref = searchParams.get('ref');
  const latestTicket = tickets.find((t) => t.bookingRef === ref) || tickets[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Mon billet Fodium - ${latestTicket?.eventTitle}`,
        text: `J'ai réservé mon pass pour ${latestTicket?.eventTitle} sur Fodium !`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Lien de votre réservation copié !');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 md:py-14 text-center space-y-6 pb-24">
      {/* Animated Success Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30"
      >
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </motion.div>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Réservation confirmée & certifiée</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Votre événement commence maintenant.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
          Votre billet sécurisé a été généré et ajouté à votre portefeuille numérique Fodium.
        </p>
      </div>

      {/* Ticket Pass Preview Card */}
      {latestTicket && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-[#121824] border border-slate-800 text-left overflow-hidden shadow-2xl relative"
        >
          {/* Top colored strip */}
          <div className="h-2.5 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 font-semibold tracking-wider">
                REF : <strong className="text-white">{latestTicket.bookingRef}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                Pass Actif
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {latestTicket.eventTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{latestTicket.ticketTierName}</span>
                <span>·</span>
                <span>{latestTicket.quantity} personne{latestTicket.quantity > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{latestTicket.eventDateLabel.split(' ').slice(1, 3).join(' ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{latestTicket.eventTime}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="truncate">{latestTicket.eventLocation}</span>
              </div>
            </div>

            {/* Shuttle Badge if included */}
            {latestTicket.includeTransport && (
              <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-xs flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-orange-400">Pass Navette A/R Inclus</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Départ : <strong>{latestTicket.transportPickup}</strong> à{' '}
                    <strong>{latestTicket.transportDeparture}</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                {latestTicket.paymentMethod === 'wave' && (
                  <>
                    <WaveLogo className="w-4 h-4 shadow-xs" />
                    <span>Réglé avec Wave</span>
                  </>
                )}
                {latestTicket.paymentMethod === 'orange_money' && (
                  <>
                    <OrangeMoneyLogo className="w-4 h-4" />
                    <span>Réglé avec Orange Money</span>
                  </>
                )}
                {latestTicket.paymentMethod === 'card' && (
                  <>
                    <CardPaymentLogo className="w-4 h-4" />
                    <span>Réglé par Carte Bancaire</span>
                  </>
                )}
              </div>
              <span className="text-base font-bold text-white font-display tabular-nums">
                {formatPrice(latestTicket.totalPrice)}
              </span>
            </div>
          </div>

          {/* Ticket Barcode / Bottom Cut */}
          <div className="px-6 py-4 bg-[#0B0F17] border-t border-dashed border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 tracking-widest">
              ||||| | |||| ||| |||| | ||||| |||
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Présentez ce billet à l’entrée
            </span>
          </div>
        </motion.div>
      )}

      {/* Primary Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => navigate('/tickets')}
          className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Ticket className="w-4 h-4" />
          <span>Voir mon billet dans mon portefeuille</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Partager</span>
          </button>

          <Link
            to="/"
            className="h-11 rounded-xl bg-[#121824] hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center transition-colors"
          >
            <span>Retour à l’accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
