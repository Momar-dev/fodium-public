import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Bus,
  ShieldCheck,
  Check,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Users,
  Info,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_EVENTS } from '../data/events';
import { TicketTier, TransportOption } from '../types';
import { useBooking } from '../context/BookingContext';

export const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { startBooking, formatPrice, showToast } = useBooking();

  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  // Selection states
  const [selectedTier, setSelectedTier] = useState<TicketTier>(event.ticketTiers[0]);
  const [ticketOnlyOrShuttle, setTicketOnlyOrShuttle] = useState<'ticket_only' | 'ticket_plus_shuttle'>('ticket_only');
  const [selectedTransport, setSelectedTransport] = useState<TransportOption>(
    event.transportOptions[0] || {
      id: 'default',
      pickupPoint: 'Centre-ville',
      departureTime: '18:00',
      returnTime: '02:00',
      duration: '30 min',
      price: 2500,
      availableSeats: 20,
      landmarks: 'Point de rencontre principal',
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setSelectedTier(event.ticketTiers[0]);
    if (event.transportOptions.length > 0) {
      setSelectedTransport(event.transportOptions[0]);
    }
    // If event has no transport options, force ticket_only
    if (!event.transportAvailable) {
      setTicketOnlyOrShuttle('ticket_only');
    }
  }, [event]);

  // Dynamic price calculation
  const ticketSubtotal = selectedTier.price * quantity;
  const transportSubtotal =
    ticketOnlyOrShuttle === 'ticket_plus_shuttle' && event.transportAvailable
      ? selectedTransport.price * quantity
      : 0;
  const totalCalculated = ticketSubtotal + transportSubtotal;

  const handleProceedToCheckout = () => {
    startBooking(
      event,
      selectedTier,
      ticketOnlyOrShuttle === 'ticket_plus_shuttle',
      selectedTransport,
      quantity
    );
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 pb-24">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour aux événements</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Billetterie officielle Kanzey.co</span>
        </div>
      </div>

      {/* Main Grid: Details (Left) + Booking Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media & Information */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Visual */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl h-72 sm:h-96">
            {!imageError ? (
              <img
                src={event.image}
                alt={event.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 p-8 text-center">
                <span className="font-display text-3xl text-orange-400 mb-2">Fodium</span>
                <span className="text-sm text-slate-300">{event.title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />

            {event.transportAvailable && (
              <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Bus className="w-3.5 h-3.5" />
                <span>Navettes Fodium Disponibles</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">
                {event.categoryLabel}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Date</span>
                <span className="text-sm font-semibold text-white">{event.dateLabel}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800 flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Horaire</span>
                <span className="text-sm font-semibold text-white">{event.time}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Lieu</span>
                <span className="text-sm font-semibold text-white truncate max-w-[140px] block">
                  {event.location}
                </span>
                <span className="text-xs text-slate-400">{event.city}</span>
              </div>
            </div>
          </div>

          {/* About Event */}
          <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>À propos de l’événement</span>
            </h2>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              {event.fullDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                <span>Organisé par <strong className="text-slate-200">{event.organizer.name}</strong></span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Organisateur vérifié</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Configurator */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <h2 className="text-lg font-bold text-white">Réservation de votre Pass</h2>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Billetterie Ouverte
              </span>
            </div>

            {/* Step A: Choose Ticket Tier */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                1. Choisissez votre catégorie de billet
              </label>
              <div className="space-y-2">
                {event.ticketTiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500 text-white shadow-sm ring-1 ring-orange-500/30'
                          : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{tier.name}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{tier.description}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-white font-display tabular-nums shrink-0 ml-2">
                        {formatPrice(tier.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step B: The Core Concept: Billet seul vs Billet + Navette */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                2. Formule d’accès
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* OPTION 1: Billet seul */}
                <button
                  type="button"
                  onClick={() => setTicketOnlyOrShuttle('ticket_only')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    ticketOnlyOrShuttle === 'ticket_only'
                      ? 'bg-slate-800 border-slate-500 text-white ring-1 ring-slate-400/20'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Option standard</div>
                  <div className="text-sm font-bold text-white mt-1">Billet seul</div>
                  <div className="text-[11px] text-slate-400 mt-1">Accès événement uniquement</div>
                </button>

                {/* OPTION 2: Billet + Navette */}
                <button
                  type="button"
                  onClick={() => {
                    if (event.transportAvailable) {
                      setTicketOnlyOrShuttle('ticket_plus_shuttle');
                    } else {
                      showToast('Aucune navette configurée pour cet événement');
                    }
                  }}
                  disabled={!event.transportAvailable}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    ticketOnlyOrShuttle === 'ticket_plus_shuttle'
                      ? 'bg-gradient-to-b from-orange-500/20 to-orange-500/5 border-orange-500 text-white ring-1 ring-orange-500/40'
                      : event.transportAvailable
                      ? 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-orange-500/40'
                      : 'opacity-40 cursor-not-allowed bg-[#0B0F17] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Recommandé</span>
                    <Bus className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1">Billet + Navette</div>
                  <div className="text-[11px] text-slate-400 mt-1">Trajet direct A/R inclus</div>
                </button>
              </div>
            </div>

            {/* Step C: Dynamic Shuttle Selector (when Billet + Navette is selected) */}
            <AnimatePresence>
              {ticketOnlyOrShuttle === 'ticket_plus_shuttle' && event.transportAvailable && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 p-4 rounded-2xl bg-[#0B0F17] border border-orange-500/30 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
                      <Bus className="w-4 h-4 text-orange-400" />
                      <span>Sélectionnez votre point de départ</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {event.transportOptions.length} départs
                    </span>
                  </div>

                  <div className="space-y-2">
                    {event.transportOptions.map((opt) => {
                      const isOptSelected = selectedTransport.id === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedTransport(opt)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isOptSelected
                              ? 'bg-orange-500/15 border-orange-500/80 text-white'
                              : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-xs font-bold text-white">{opt.pickupPoint}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Départ à <strong>{opt.departureTime}</strong> · Durée env. {opt.duration}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5 italic">
                                {opt.landmarks}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-orange-400 font-display tabular-nums">
                                +{formatPrice(opt.price)}
                              </span>
                              <span className="block text-[10px] text-emerald-400">
                                {opt.availableSeats} places
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400">Nombre de pass</span>
              <div className="flex items-center gap-3 bg-[#0B0F17] border border-slate-800 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 active:scale-95 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-sm font-bold text-white font-mono w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(8, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Live Pricing Breakdown & Recalculation */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>
                  Billet ({selectedTier.name}) {quantity > 1 ? `x${quantity}` : ''}
                </span>
                <span className="text-white font-mono tabular-nums">
                  {formatPrice(ticketSubtotal)}
                </span>
              </div>

              {ticketOnlyOrShuttle === 'ticket_plus_shuttle' && event.transportAvailable && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between text-orange-400"
                >
                  <span>
                    Navette A/R ({selectedTransport.pickupPoint.split('(')[0].trim()}) {quantity > 1 ? `x${quantity}` : ''}
                  </span>
                  <span className="font-mono tabular-nums">
                    +{formatPrice(transportSubtotal)}
                  </span>
                </motion.div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Total à payer</span>
                  <span className="text-xs text-emerald-400 font-medium">TVA & frais de billetterie inclus</span>
                </div>
                <div className="text-2xl font-black text-white font-display tabular-nums tracking-tight">
                  {formatPrice(totalCalculated)}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuer vers le paiement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
