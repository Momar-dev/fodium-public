import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Sparkles, Compass } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { tickets } = useBooking();

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Événements', path: '/events' },
    { label: 'Transport', path: '/transport', badge: 'Bientôt' },
    { label: 'Mes billets', path: '/tickets', count: tickets.length },
    { label: 'Profil', path: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-white flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg group mr-1 md:mr-2 lg:mr-0"
        >
          <span className="font-display text-xl sm:text-2xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
            Fodium
          </span>
        </Link>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-3.5 md:gap-4 lg:gap-6 xl:gap-7 text-xs lg:text-sm font-medium shrink-0">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1 transition-colors hover:text-white flex items-center gap-1 lg:gap-1.5 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400'
                }`}
              >
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] lg:text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="text-[10px] lg:text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Link
            to="/events"
            className="hidden sm:inline-flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 lg:px-4 lg:py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all shadow-sm shadow-orange-500/20 active:scale-95 shrink-0"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Découvrir</span>
          </Link>
          <Link
            to="/tickets"
            aria-label="Accéder à mes billets"
            className="inline-flex md:hidden relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
          >
            <Ticket className="w-5 h-5" />
            {tickets.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
