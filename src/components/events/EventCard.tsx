import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Bus, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { EventItem } from '../../types';

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleOpen = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleOpen}
      className={`group cursor-pointer flex flex-col overflow-hidden rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40 transition-all ${
        featured ? 'lg:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Media Slot with Zero-Broken-Image Policy */}
      <div
        className={`relative overflow-hidden bg-slate-900 shrink-0 ${
          featured ? 'h-64 md:h-auto md:w-1/2' : 'h-52 w-full'
        }`}
      >
        {!imageError ? (
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-center">
            <span className="text-2xl mb-2 font-display text-orange-400">Fodium</span>
            <p className="text-xs text-slate-400 font-medium">{event.title}</p>
          </div>
        )}

        {/* Scrim overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/20" />

        {/* Transport availability indicator - quiet icon indicator */}
        {event.transportAvailable && (
          <div className="absolute top-3 left-3 bg-[#0B0F17]/85 backdrop-blur-md border border-slate-700/60 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs text-orange-300 font-medium">
            <Bus className="w-3.5 h-3.5 text-orange-400" />
            <span>Option Navette</span>
          </div>
        )}

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0B0F17]/80 backdrop-blur-md flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-orange-500 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content Slot */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>{event.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{event.city}</span>
          </div>

          <h3 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">À partir de</span>
            <span className="text-base font-bold text-white tabular-nums tracking-tight font-display">
              {event.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[130px]">{event.dateLabel.split(' ')[1]} {event.dateLabel.split(' ')[2]}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
