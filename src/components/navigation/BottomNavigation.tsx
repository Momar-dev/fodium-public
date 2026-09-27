import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Bus, Ticket, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useBooking } from '../../context/BookingContext';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { tickets } = useBooking();

  const navItems = [
    { label: 'Accueil', path: '/', icon: Home },
    { label: 'Événements', path: '/events', icon: Compass },
    { label: 'Transport', path: '/transport', icon: Bus, badge: 'Bientôt' },
    { label: 'Mes billets', path: '/tickets', icon: Ticket, count: tickets.length },
    { label: 'Profil', path: '/profile', icon: User },
  ];

  return (
    <nav
      aria-label="Navigation principale mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1420]/95 backdrop-blur-xl border-t border-slate-800/90 pb-safe"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                isActive ? 'text-orange-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.25]' : 'stroke-[1.75]'
                  }`}
                />

                {item.badge && (
                  <span className="absolute -top-1.5 -right-4 bg-orange-500 text-white text-[9px] font-bold px-1 py-0.2 rounded-full leading-tight shadow-sm scale-90">
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && item.count > 0 && !item.badge && (
                  <span className="absolute -top-1 -right-2.5 bg-orange-500 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {item.count}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 transition-all ${
                  isActive ? 'font-semibold text-white' : 'font-normal text-slate-400'
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-dot"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
