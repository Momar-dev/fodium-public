import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  Bell,
  CheckCircle2,
  Users,
  Leaf,
  Navigation,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useBooking } from '../context/BookingContext';

export const Transport: React.FC = () => {
  const { showToast } = useBooking();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setSubscribed(true);
      showToast('Vous êtes inscrit sur la liste prioritaire Fodium Transport !');
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Points de départ dans votre quartier',
      description:
        'Embarquez à Almadies, Plateau, Mermoz ou Rufisque à des arrêts sécurisés et bien éclairés.',
    },
    {
      icon: Navigation,
      title: 'Trajets directs & prioritaires',
      description:
        'Évitez les embouteillages et les kilomètres à pied. Dépose réservée au pied de l’entrée de l’événement.',
    },
    {
      icon: Clock,
      title: 'Retour garanti après le rappel',
      description:
        'Finissez votre fête sereinement. Les navettes retour partent 30 minutes après le dernier accord de musique.',
    },
    {
      icon: Leaf,
      title: 'Mobilité collective & écoresponsable',
      description:
        'Une navette Fodium remplace jusqu’à 30 voitures individuelles sur la corniche dakaroise.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16 pb-24">
      {/* Hero Teaser */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
          <Bus className="w-4 h-4" />
          <span>Fodium Transport · Bientôt Disponible</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Les trajets événementiels{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500">
            arrivent bientôt.
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Fini le casse-tête du stationnement saturé, les tarifs de taxi abusifs à la sortie et la fatigue sur la route du retour. Fodium réinvente la mobilité pour tous vos grands rassemblements.
        </p>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto pt-4">
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center bg-[#121824] border border-slate-800 rounded-2xl p-1.5 focus-within:border-amber-500 transition-colors shadow-xl">
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Numéro WhatsApp ou Email..."
                  required
                  className="w-full px-3 py-2 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Être notifié</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Soyez les premiers informés de l’ouverture du réseau de navettes.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Vous êtes inscrit sur la liste prioritaire de lancement !</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Visual Showcase: Navettes sur la Corniche de Dakar */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#121824]">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src="/src/assets/images/dakar_corniche_real.jpg"
            alt="Corniche de Dakar et liaisons de transport Fodium"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500 text-white shadow-md inline-block mb-2">
                Flotte Confort & Climatisation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Trajets directs sur la Corniche et les grands axes dakarois
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                Navettes climatisées, wifi à bord, chauffeurs professionnels et liaisons synchronisées avec la fin de vos événements.
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs text-amber-300 font-semibold shrink-0 flex items-center gap-2">
              <Bus className="w-4 h-4 text-amber-400" />
              <span>Dakar · Diamniadio · Saly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#121824] border border-slate-800 hover:border-amber-500/40 transition-colors flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <IconComp className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Preview Concept */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121824] to-[#0A0D14] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Les premières lignes pilotes à Dakar
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Des liaisons stratégiques pensées pour les grands pôles de divertissement.
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            <span>Voir les événements avec navette</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Ligne 01</span>
            <div className="text-sm font-bold text-white">Almadies ⇄ Monument Renaissance</div>
            <div className="text-xs text-slate-400">Départ Sea Plaza & Mamelles</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Ligne 02</span>
            <div className="text-sm font-bold text-white">Plateau ⇄ CICAD Diamniadio</div>
            <div className="text-xs text-slate-400">Gare TER & Place de l’Indépendance</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Ligne 03</span>
            <div className="text-sm font-bold text-white">Mermoz / Point E ⇄ Corniche Ouest</div>
            <div className="text-xs text-slate-400">Piscine Olympique & Rond-point Mermoz</div>
          </div>
        </div>
      </div>
    </div>
  );
};
