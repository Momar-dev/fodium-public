import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Bus,
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { UserTicket } from '../types';

export const Tickets: React.FC = () => {
  const { tickets, formatPrice, showToast, clearTickets, loadSampleTicket } = useBooking();
  const [selectedTicketForQr, setSelectedTicketForQr] = useState<UserTicket | null>(null);
  const [filterTab, setFilterTab] = useState<'active' | 'history'>('active');

  const activeTickets = tickets.filter((t) => t.status === 'valid');
  const pastTickets = tickets.filter((t) => t.status !== 'valid');

  const displayedTickets = filterTab === 'active' ? activeTickets : pastTickets;

  const handleDownload = (tkt: UserTicket) => {
    showToast(`Billet ${tkt.bookingRef} téléchargé au format PDF.`);
  };

  const handleShare = (tkt: UserTicket) => {
    if (navigator.share) {
      navigator
        .share({
          title: `Mon pass Fodium pour ${tkt.eventTitle}`,
          text: `Retrouvez-moi à ${tkt.eventTitle} ! Réf: ${tkt.bookingRef}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      showToast('Lien de partage du pass copié !');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <Ticket className="w-3.5 h-3.5" />
            <span>Portefeuille Numérique</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mes Billets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Retrouvez tous vos pass d’accès et titres de navette sécurisés par Kanzey.co.
          </p>
        </div>

        {/* Tab Switcher & Quick Demo Helpers */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#121824] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterTab('active')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'active'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              À venir ({activeTickets.length})
            </button>
            <button
              onClick={() => setFilterTab('history')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'history'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Historique ({pastTickets.length})
            </button>
          </div>

          {tickets.length > 0 && (
            <button
              onClick={clearTickets}
              className="text-[11px] text-slate-400 hover:text-red-400 px-2 py-1 transition-colors"
              title="Vider pour tester l'état vide"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Ticket List or Empty State */}
      {displayedTickets.length > 0 ? (
        <div className="space-y-6">
          {displayedTickets.map((tkt) => (
            <motion.div
              key={tkt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#121824] border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition-all relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Event Visual & Badge */}
                <div className="md:col-span-4 relative h-48 md:h-auto overflow-hidden bg-slate-900">
                  <img
                    src={tkt.eventImage}
                    alt={tkt.eventTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121824] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#0B0F17]/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white border border-slate-700">
                    {tkt.ticketTierName}
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="md:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-orange-400 font-semibold tracking-wider">
                        {tkt.bookingRef}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Billet Valide
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-tight">
                      {tkt.eventTitle}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{tkt.eventDateLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{tkt.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate">{tkt.eventLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shuttle Included Tag */}
                  {tkt.includeTransport && (
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/25 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-orange-400">
                        <Bus className="w-4 h-4" />
                        <span>Navette Fodium Incluse</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Départ : <strong>{tkt.transportPickup}</strong> à {tkt.transportDeparture}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: QR Code Trigger & Pass Scanner */}
                <div className="md:col-span-3 p-5 sm:p-6 bg-[#0E1420] border-t md:border-t-0 md:border-l border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                  <div
                    onClick={() => setSelectedTicketForQr(tkt)}
                    className="group cursor-pointer p-3 bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform"
                    title="Cliquez pour agrandir le QR Code"
                  >
                    <QrCode className="w-20 h-20 text-slate-900" />
                  </div>

                  <button
                    onClick={() => setSelectedTicketForQr(tkt)}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Afficher le QR Pass</span>
                  </button>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleDownload(tkt)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Télécharger le pass"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(tkt)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Partager"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono">
                    Total : {formatPrice(tkt.totalPrice)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-10 sm:p-14 text-center rounded-3xl bg-[#121824] border border-slate-800 max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
            <Ticket className="w-8 h-8 text-orange-400/80" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Aucun billet dans cette section</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              {filterTab === 'active'
                ? 'Vous n’avez aucun pass actif pour le moment. Réservez votre événement avec ou sans navette pour le voir apparaître ici !'
                : 'Votre historique d’anciens billets est vide.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Découvrir les événements</span>
            </Link>

            <button
              onClick={loadSampleTicket}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Charger un billet test</span>
            </button>
          </div>
        </div>
      )}

      {/* QR Code Inspection Modal for Door Scanning Simulation */}
      <AnimatePresence>
        {selectedTicketForQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-[#121824] border border-slate-700 p-6 text-center space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedTicketForQr(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400">
                  {selectedTicketForQr.bookingRef}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedTicketForQr.eventTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedTicketForQr.ticketTierName} · {selectedTicketForQr.eventDateLabel}
                </p>
              </div>

              {/* QR Container */}
              <div className="p-6 bg-white rounded-2xl mx-auto inline-block shadow-inner">
                <QrCode className="w-48 h-48 text-slate-950" />
              </div>

              <div className="text-xs text-slate-300">
                <div className="font-semibold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pass Officiel Prêt au Contrôle</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Augmentez la luminosité de votre écran à l’entrée de l’événement.
                </p>
              </div>

              {selectedTicketForQr.includeTransport && (
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-300">
                  Valable également pour l’accès navette ({selectedTicketForQr.transportPickup})
                </div>
              )}

              <button
                onClick={() => setSelectedTicketForQr(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
