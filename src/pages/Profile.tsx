import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Ticket,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { WaveLogo } from '../components/ui/PaymentLogos';

export const Profile: React.FC = () => {
  const { tickets, showToast, clearTickets, loadSampleTicket } = useBooking();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);

  const handleToggleNotif = () => {
    setNotificationsEnabled(!notificationsEnabled);
    showToast(
      !notificationsEnabled
        ? 'Notifications de navettes activées'
        : 'Notifications désactivées'
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <User className="w-3.5 h-3.5" />
          <span>Compte Fodium Public</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-normal leading-tight">
          Mon Profil
        </h1>
      </div>

      {/* User Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#121824] border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xl sm:text-2xl flex items-center justify-center font-display shadow-lg shadow-orange-500/20 shrink-0">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Amadou Diallo</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 whitespace-nowrap shrink-0">
                Compte Vérifié
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 mt-1.5">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono text-slate-300">+221 77 543 21 00</span>
              </span>
              <span aria-hidden="true" className="text-slate-600 hidden xs:inline">·</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Dakar, Sénégal</span>
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/tickets"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors self-start sm:self-auto shrink-0"
        >
          <Ticket className="w-4 h-4 text-orange-400" />
          <span>{tickets.length} Billet{tickets.length > 1 ? 's' : ''} actif{tickets.length > 1 ? 's' : ''}</span>
        </Link>
      </div>

      {/* Preferred Payment Method */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-orange-400" />
            <span>Moyen de paiement favori</span>
          </h3>
          <span className="text-xs text-orange-400 font-medium">Par défaut</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WaveLogo className="w-9 h-9 shadow-sm" />
            <div>
              <div className="text-sm font-semibold text-white">Wave Sénégal</div>
              <div className="text-xs text-slate-400">+221 77 ••• •• 00</div>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-medium">Actif</span>
        </div>
      </div>

      {/* Preferences & Shuttle Alerts */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-400" />
          <span>Alertes & Rappels d’événements</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-white">Rappels de départ de navette</div>
              <div className="text-[11px] text-slate-400">
                Recevoir un SMS 45 minutes avant le départ de votre navette Fodium
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={smsReminders}
              onClick={() => setSmsReminders(!smsReminders)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                smsReminders ? 'bg-orange-500' : 'bg-slate-700'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  smsReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-800 gap-4">
            <div>
              <div className="text-xs font-semibold text-white">Notifications de nouveaux événements</div>
              <div className="text-[11px] text-slate-400">
                Être alerté des grands concerts et festivals à Dakar
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              onClick={handleToggleNotif}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                notificationsEnabled ? 'bg-orange-500' : 'bg-slate-700'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-orange-400" />
          <span>Gestion des données de démonstration</span>
        </h3>
        <p className="text-xs text-slate-400">
          Ces actions permettent de tester les différents états de l'application (panier vide, portefeuille avec billets).
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={clearTickets}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 text-xs font-semibold transition-colors"
          >
            Vider le portefeuille (Tester l'état vide)
          </button>
          <button
            onClick={loadSampleTicket}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Charger un billet test
          </button>
        </div>
      </div>

      {/* Kanzey Ecosystem Notice */}
      <div className="p-5 rounded-2xl bg-[#0B0F17] border border-slate-800/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Fodium par Kanzey.co</span>
        </div>
        <p className="leading-relaxed">
          Plateforme de billetterie digitale et d’expérience événementielle développée par Kanzey.co.
          Fodium Public est le premier jalon de notre vision pour transformer les sorties culturelles et professionnelles en Afrique de l’Ouest.
        </p>
      </div>
    </div>
  );
};
