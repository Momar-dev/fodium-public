import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Bus, Filter, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_EVENTS } from '../data/events';
import { EventCard } from '../components/events/EventCard';
import { EventCategory } from '../types';

export const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [transportOnly, setTransportOnly] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'musique', label: 'Musique' },
    { id: 'tech', label: 'Tech & Business' },
    { id: 'gastronomie', label: 'Gastronomie' },
    { id: 'mode', label: 'Mode & Design' },
  ];

  const cities = ['all', 'Dakar', 'Diamniadio'];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((evt) => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        evt.title.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query) ||
        evt.location.toLowerCase().includes(query);

      // Category match
      const matchesCategory =
        selectedCategory === 'all' || evt.category === selectedCategory;

      // Transport match
      const matchesTransport = !transportOnly || evt.transportAvailable;

      // City match
      const matchesCity = selectedCity === 'all' || evt.city === selectedCity;

      return matchesSearch && matchesCategory && matchesTransport && matchesCity;
    });
  }, [searchQuery, selectedCategory, transportOnly, selectedCity]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setTransportOnly(false);
    setSelectedCity('all');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    transportOnly ||
    selectedCity !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agenda des Sorties Officielles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explorez les événements
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Sélectionnez votre événement et profitez de l’option pass navette intégrée pour une expérience sans tracas.
        </p>
      </div>

      {/* Control Bar: Search + Category Segments + Transport Toggle */}
      <div className="space-y-4 bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800">
        {/* Top line: Search and City */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot-clé, artiste ou lieu..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="all">Toutes les villes</option>
              <option value="Dakar">Dakar</option>
              <option value="Diamniadio">Diamniadio</option>
            </select>
          </div>
        </div>

        {/* Bottom line: Interactive Category Tabs + Transport Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          {/* Functional Button Tabs for Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-orange-500 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Transport Filter Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTransportOnly(!transportOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                transportOnly
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <Bus className="w-3.5 h-3.5 text-amber-400" />
              <span>Avec Navette uniquement</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Effacer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Active Tags */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          {filteredEvents.length} {filteredEvents.length > 1 ? 'événements trouvés' : 'événement trouvé'}
        </span>
      </div>

      {/* Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-2xl p-12 text-center bg-[#121824] border border-slate-800 max-w-md mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">Aucun événement correspondant</h3>
          <p className="text-xs text-slate-400 mt-1">
            Essayez de modifier vos critères de recherche ou de réinitialiser vos filtres.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
