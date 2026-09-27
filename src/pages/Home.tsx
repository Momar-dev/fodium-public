import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Bus, ArrowRight, ShieldCheck, Zap, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_EVENTS } from '../data/events';
import { EventCard } from '../components/events/EventCard';
import { useBooking } from '../context/BookingContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { startBooking } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const featuredEvent = MOCK_EVENTS[0];
  const upcomingEvents = MOCK_EVENTS.slice(1);

  // Suggestions for unified search
  const suggestions = [
    { type: 'event', label: 'Dakar Afro Fusion Fest', meta: 'Concert · Mamelles', link: '/events/dakar-afro-fusion-2026' },
    { type: 'route', label: 'Navette Almadies → Renaissance', meta: 'Trajet événementiel', link: '/events/dakar-afro-fusion-2026' },
    { type: 'event', label: 'Sommet Africain de la Tech', meta: 'Conférence · CICAD Diamniadio', link: '/events/urban-tech-africa-summit' },
    { type: 'route', label: 'Navette Plateau → CICAD Diamniadio', meta: 'Trajet express', link: '/events/urban-tech-africa-summit' },
    { type: 'event', label: 'Dakar Taste & Gastronomy Nights', meta: 'Gastronomie · Corniche Ouest', link: '/events/saveurs-fusion-dakar' },
  ].filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meta.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/events');
    }
  };

  return (
    <div className="space-y-12 md:space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-4 md:pt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-orange-400 mb-5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Billetterie Digitale Sécurisée par Kanzey.co</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-[1.1] text-balance">
            Découvrez. Choisissez.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Vivez l’événement sans stress.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Vos pass officiels sécurisés et vos navettes événementielles sur une seule plateforme fluide, pensée pour Dakar et l’Afrique de l’Ouest.
          </p>

          {/* Unified Search Bar */}
          <div className="relative mt-8 max-w-2xl mx-auto text-left">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div
                className={`relative flex items-center bg-[#131926] border rounded-2xl transition-all duration-200 shadow-xl shadow-black/30 ${
                  searchFocused
                    ? 'border-orange-500 ring-2 ring-orange-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                  placeholder="Rechercher un concert, festival, salon ou trajet navette..."
                  className="w-full py-4 pr-4 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors shrink-0"
                >
                  Trouver
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#121824] border border-slate-800 rounded-2xl shadow-2xl z-30 divide-y divide-slate-800/60"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                  Recherches suggérées (Événements & Navettes)
                </div>
                {suggestions.slice(0, 4).map((s, idx) => (
                  <div
                    key={idx}
                    onMouseDown={() => navigate(s.link)}
                    className="p-3 hover:bg-slate-800/60 rounded-xl cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {s.type === 'route' ? (
                        <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
                          <Bus className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                          <Compass className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-slate-100 group-hover:text-orange-400 transition-colors">
                          {s.label}
                        </div>
                        <div className="text-xs text-slate-400">{s.meta}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Two Distinct Visual Shortcuts: Événements & Transport */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto mt-8">
            <button
              onClick={() => navigate('/events')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#131A26] to-[#0F141F] border border-slate-800 hover:border-orange-500/60 text-left transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/20"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors">
                Événements
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Explorer tous les concerts & festivals
              </div>
            </button>

            <button
              onClick={() => navigate('/transport')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#131A26] to-[#0F141F] border border-slate-800 hover:border-amber-500/60 text-left transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/20 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                  <Bus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Bientôt
                </span>
              </div>
              <div className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                Transport
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Navettes directes vers vos sorties
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Spotlight Event: Dakar Afro Fusion Fest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-400 font-semibold">À la une</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">L’expérience du moment</h2>
          </div>
          <button
            onClick={() => navigate(`/events/${featuredEvent.id}`)}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
          >
            <span>Détails & Billets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-[#121824] border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-slate-900">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121824] via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Événement Majeur
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>{featuredEvent.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredEvent.city}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredEvent.title}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>Option Billet + Navette disponible (Almadies, Plateau, Rufisque)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Billet dès</span>
                  <span className="text-xl font-bold text-white font-display tabular-nums">
                    {featuredEvent.priceFormatted}
                  </span>
                </div>

                <button
                  onClick={() => {
                    startBooking(featuredEvent);
                    navigate(`/events/${featuredEvent.id}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Réserver ma place</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-400 font-semibold">Catalogue</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Prochaines expériences</h2>
          </div>
          <button
            onClick={() => navigate('/events')}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
          >
            <span>Voir tout ({MOCK_EVENTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* The Innovation: "Billet + Navette" explanatory section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#131A26] via-[#101520] to-[#0A0D14] border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">
              L’innovation Fodium
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-1">
              Pourquoi l’option Navette change tout
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Aller à un grand événement ne devrait jamais se solder par 1 heure de bouchons et un parking introuvable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sans Fodium */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
              <div className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>La sortie traditionnelle</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-slate-600">✕</span>
                  <span>Embouteillages monstres à l’approche du site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600">✕</span>
                  <span>Tarifs de stationnement imprévisibles et anarchiques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600">✕</span>
                  <span>Difficulté extrême à trouver un taxi à 3h du matin</span>
                </li>
              </ul>
            </div>

            {/* Avec Fodium Navette */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/30 text-slate-200">
              <div className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Avec le pass Fodium Billet + Navette</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Point de départ sécurisé proche de chez vous (Almadies, Plateau...)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Dépose directe devant l’entrée VIP sans marcher des kilomètres</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Navette retour garantie synchronisée avec la fin du spectacle</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Billets infalsifiables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Paiements instantanés sécurisés</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/events')}
              className="text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors"
            >
              Découvrir les événements équipés
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
