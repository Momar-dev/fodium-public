import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ChevronLeft,
  Smartphone,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Bus,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Edit3,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { PaymentMethodType, TransportOption } from '../types';
import { WaveLogo, OrangeMoneyLogo, CardPaymentLogo } from '../components/ui/PaymentLogos';

type CheckoutStep = 'review' | 'payment' | 'processing';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    bookingDraft,
    derivedTotal,
    formatPrice,
    completePurchase,
    setQuantity,
    setIncludeTransport,
    setTransportOption,
  } = useBooking();

  // If no draft exists, redirect back to events
  if (!bookingDraft) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-white">Aucun panier en cours</h2>
        <p className="text-xs text-slate-400 mt-2">Veuillez sélectionner un événement pour commencer.</p>
        <Link
          to="/events"
          className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs"
        >
          Voir les événements
        </Link>
      </div>
    );
  }

  const { event, ticketTier, quantity, includeTransport, transportOption } = bookingDraft;

  // Checkout Steps
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('wave');
  const [buyerName, setBuyerName] = useState('Amadou Diallo');
  const [buyerPhone, setBuyerPhone] = useState('77 543 21 00');
  const [omAuthCode, setOmAuthCode] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvc, setCardCvc] = useState('421');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatusText, setProcessingStatusText] = useState('Initialisation de la session sécurisée...');

  const processingPhases = [
    { progress: 25, text: 'Chiffrement du tunnel de transaction 256-bit...' },
    {
      progress: 60,
      text:
        paymentMethod === 'wave'
          ? 'Envoi de la notification push à l’application Wave mobile...'
          : paymentMethod === 'orange_money'
          ? 'Validation du code d’autorisation Orange Money (#144#)...'
          : 'Authentification 3D-Secure auprès de la banque...',
    },
    { progress: 85, text: 'Confirmation du paiement reçue avec succès.' },
    { progress: 100, text: 'Génération du pass numérique certifié par Kanzey.co...' },
  ];

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('processing');
    setProcessingProgress(15);
    setProcessingStatusText(processingPhases[0].text);

    let phaseIndex = 0;
    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < processingPhases.length) {
        setProcessingProgress(processingPhases[phaseIndex].progress);
        setProcessingStatusText(processingPhases[phaseIndex].text);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const createdTicket = completePurchase(paymentMethod);
          navigate(`/checkout/success?ref=${createdTicket.bookingRef}`);
        }, 500);
      }
    }, 650);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 pb-24">
      {/* Top Header & Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour à l’événement</span>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Tunnel de commande sécurisé Fodium</span>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 max-w-xl mx-auto">
        {/* Step 1: Récapitulatif */}
        <div
          onClick={() => {
            if (currentStep === 'payment') setCurrentStep('review');
          }}
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep === 'review'
              ? 'text-orange-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              currentStep === 'review'
                ? 'bg-orange-500 text-white'
                : 'bg-emerald-500 text-white'
            }`}
          >
            {currentStep === 'payment' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
          </span>
          <span className="text-xs sm:text-sm">1. Récapitulatif</span>
        </div>

        <div className="w-8 sm:w-16 h-0.5 bg-slate-800" />

        {/* Step 2: Paiement */}
        <div
          className={`flex items-center gap-2 ${
            currentStep === 'payment'
              ? 'text-orange-400 font-bold'
              : currentStep === 'processing'
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              currentStep === 'payment'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            2
          </span>
          <span className="text-xs sm:text-sm">2. Moyen de paiement</span>
        </div>

        <div className="w-8 sm:w-16 h-0.5 bg-slate-800" />

        {/* Step 3: Confirmation */}
        <div className="flex items-center gap-2 text-slate-500">
          <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono font-bold">
            3
          </span>
          <span className="text-xs sm:text-sm hidden sm:inline">3. Confirmation</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: REVIEW */}
        {currentStep === 'review' && (
          <motion.div
            key="step-review"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-7 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Vérifiez votre commande
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Confirmez votre catégorie de pass, vos options de transport et vos coordonnées.
                </p>
              </div>

              {/* Event Card Info */}
              <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-4">
                <div className="flex gap-4 items-start">
                  <img
                    src={event.image}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-800"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                      {event.categoryLabel}
                    </span>
                    <h2 className="text-base font-bold text-white leading-snug">{event.title}</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[200px]">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity and Tier Adjuster */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Billet sélectionné</span>
                    <span className="text-sm font-semibold text-white">{ticketTier.name}</span>
                    <span className="text-xs text-slate-400 font-mono block">
                      {formatPrice(ticketTier.price)} par personne
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-[#0B0F17] border border-slate-800 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 active:scale-95 disabled:opacity-40"
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
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Shuttle Section in Review */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-semibold text-white">Option Transport Navette</span>
                    </div>

                    {event.transportAvailable && (
                      <button
                        type="button"
                        onClick={() => setIncludeTransport(!includeTransport)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                          includeTransport
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {includeTransport ? 'Navette Incluse ✓' : '+ Ajouter Navette'}
                      </button>
                    )}
                  </div>

                  {includeTransport && transportOption ? (
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Point d’embarquement :</span>
                        <span className="text-xs font-bold text-orange-400 font-mono">
                          +{formatPrice(transportOption.price * quantity)}
                        </span>
                      </div>

                      {/* Dropdown to switch pickup point directly in review */}
                      <select
                        value={transportOption.id}
                        onChange={(e) => {
                          const opt = event.transportOptions.find((o) => o.id === e.target.value);
                          if (opt) setTransportOption(opt);
                        }}
                        className="w-full py-2 px-3 bg-[#0B0F17] border border-orange-500/40 rounded-lg text-xs text-white focus:outline-none"
                      >
                        {event.transportOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.pickupPoint} (Départ {opt.departureTime} · +{formatPrice(opt.price)})
                          </option>
                        ))}
                      </select>

                      <div className="text-[11px] text-slate-300">
                        Arrêt : <em>{transportOption.landmarks}</em> · Retour garanti après le spectacle.
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Aucune navette sélectionnée (Pass Billet Seul).
                    </p>
                  )}
                </div>
              </div>

              {/* Continue to Payment CTA */}
              <button
                type="button"
                onClick={() => setCurrentStep('payment')}
                className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuer vers le paiement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Price Summary Sticky Box */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-[#121824] border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                Calcul du total
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>
                    Billet {ticketTier.name} (x{quantity})
                  </span>
                  <span className="font-mono tabular-nums text-white">
                    {formatPrice(ticketTier.price * quantity)}
                  </span>
                </div>

                {includeTransport && transportOption && (
                  <div className="flex justify-between text-orange-400">
                    <span>
                      Navette A/R ({transportOption.pickupPoint.split('(')[0].trim()}) (x{quantity})
                    </span>
                    <span className="font-mono tabular-nums">
                      +{formatPrice(transportOption.price * quantity)}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Montant Total</span>
                    <span className="text-[11px] text-emerald-400">Frais de service & TVA inclus</span>
                  </div>
                  <span className="text-2xl font-black text-white font-display tabular-nums">
                    {formatPrice(derivedTotal)}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Billet numérique horodaté et nominatif sécurisé par Kanzey.co.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {currentStep === 'payment' && (
          <motion.div
            key="step-payment"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Choisissez votre règlement
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Simulation de paiement sécurisée sans aucun débit réel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('review')}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modifier commande</span>
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* WAVE */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === 'wave'
                      ? 'bg-[#1DC4FF]/15 border-[#1DC4FF] text-white ring-1 ring-[#1DC4FF]/50 shadow-md shadow-[#1DC4FF]/10'
                      : 'bg-[#121824] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <WaveLogo className="w-11 h-11 shadow-md" />
                  <span className="text-xs font-bold text-white">Wave</span>
                  <span className="text-[10px] text-[#1DC4FF] font-medium">1-Click</span>
                </button>

                {/* ORANGE MONEY */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === 'orange_money'
                      ? 'bg-[#FF6600]/15 border-[#FF6600] text-white ring-1 ring-[#FF6600]/50 shadow-md shadow-[#FF6600]/10'
                      : 'bg-[#121824] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <OrangeMoneyLogo className="w-11 h-11 shadow-md" />
                  <span className="text-xs font-bold text-white">Orange Money</span>
                  <span className="text-[10px] text-[#FF6600] font-medium">#144#</span>
                </button>

                {/* CARTE BANCAIRE */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-slate-700/40 border-slate-400 text-white ring-1 ring-slate-400/50 shadow-md'
                      : 'bg-[#121824] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CardPaymentLogo className="w-20 h-9.5 shadow-md" />
                  <span className="text-xs font-bold text-white">Carte Bancaire</span>
                  <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
                </button>
              </div>

              {/* Dynamic Interactive Fields */}
              <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Nom complet pour l'émission du billet
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      required
                      placeholder="Ex: Amadou Diallo"
                      className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Téléphone mobile (+221)
                    </label>
                    <div className="flex items-center bg-[#0B0F17] border border-slate-800 rounded-xl px-3 focus-within:border-orange-500">
                      <span className="text-xs text-slate-400 font-mono pr-2 border-r border-slate-800">
                        +221
                      </span>
                      <input
                        type="text"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        required
                        placeholder="77 000 00 00"
                        className="w-full px-2 py-2.5 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Specific Wave Experience */}
                {paymentMethod === 'wave' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#1DC4FF]/10 border border-[#1DC4FF]/30 flex items-start gap-3.5"
                  >
                    <WaveLogo className="w-7 h-7 shrink-0 mt-0.5 shadow-sm" />
                    <div className="text-xs text-slate-200 space-y-1">
                      <strong className="text-[#1DC4FF] block">Paiement Wave 1-Click Simulation</strong>
                      <p>
                        En validant ci-dessous, une demande de débit test de{' '}
                        <strong>{formatPrice(derivedTotal)}</strong> sera simulée pour le numéro{' '}
                        <strong>+221 {buyerPhone}</strong>.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Specific Orange Money Experience */}
                {paymentMethod === 'orange_money' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#FF6600]/10 border border-[#FF6600]/30 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-200">
                        <strong className="text-[#FF6600] block mb-0.5">Autorisation Orange Money</strong>
                        Tapez <strong>#144#391#</strong> sur votre mobile Orange pour obtenir votre code secret temporaire.
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Code d'autorisation temporaire (4 chiffres)
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={omAuthCode}
                        onChange={(e) => setOmAuthCode(e.target.value)}
                        placeholder="Ex: 8492"
                        className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FF6600] font-mono tracking-widest"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Specific Card Experience */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-1"
                  >
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Numéro de carte bancaire
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• ••••"
                        className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Date d’expiration
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Confirm and Pay Button */}
              <button
                type="button"
                onClick={handleStartPayment}
                className="w-full h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Simuler le paiement · {formatPrice(derivedTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-400">
                Démonstration technique frontend Fodium. Aucun montant réel n’est prélevé.
              </div>
            </div>

            {/* Recap Sidebar */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-[#121824] border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800/80 pb-3">
                Récapitulatif de paiement
              </h2>

              <div>
                <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{event.dateLabel}</div>
                <div className="text-xs text-slate-400">{event.location}</div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pass {ticketTier.name} (x{quantity})</span>
                  <span className="font-mono tabular-nums text-white">
                    {formatPrice(ticketTier.price * quantity)}
                  </span>
                </div>

                {includeTransport && transportOption && (
                  <div className="flex justify-between text-orange-400">
                    <span>Navette A/R ({transportOption.pickupPoint.split('(')[0].trim()}) (x{quantity})</span>
                    <span className="font-mono tabular-nums">
                      +{formatPrice(transportOption.price * quantity)}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Montant Total</span>
                  <span className="text-xl font-black text-white font-display tabular-nums">
                    {formatPrice(derivedTotal)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PROCESSING */}
        {currentStep === 'processing' && (
          <motion.div
            key="step-processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto p-8 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-6 shadow-2xl my-6"
          >
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-orange-400">
                <Lock className="w-8 h-8" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Traitement sécurisé en cours</h2>
              <p className="text-xs text-slate-400 mt-1">
                Communication avec le protocole de paiement de l’opérateur
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>{processingProgress}%</span>
                <span>Sécurisé SSL</span>
              </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Statut :</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">{processingStatusText}</p>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Montant : <strong>{formatPrice(derivedTotal)}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
