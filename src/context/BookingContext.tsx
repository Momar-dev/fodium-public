import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { EventItem, TicketTier, TransportOption, UserTicket, PaymentMethodType } from '../types';
import { MOCK_EVENTS, MOCK_USER_TICKETS } from '../data/events';

interface BookingDraft {
  event: EventItem;
  ticketTier: TicketTier;
  quantity: number;
  includeTransport: boolean;
  transportOption?: TransportOption;
}

interface BookingContextType {
  events: EventItem[];
  bookingDraft: BookingDraft | null;
  startBooking: (
    event: EventItem,
    tier?: TicketTier,
    includeTransport?: boolean,
    transportOption?: TransportOption,
    quantity?: number
  ) => void;
  setTicketTier: (tier: TicketTier) => void;
  setQuantity: (qty: number) => void;
  setIncludeTransport: (include: boolean) => void;
  setTransportOption: (option: TransportOption) => void;
  derivedTotal: number;
  tickets: UserTicket[];
  completePurchase: (paymentMethod: PaymentMethodType) => UserTicket;
  formatPrice: (amount: number) => string;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearTickets: () => void;
  loadSampleTicket: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const LOCAL_STORAGE_TICKETS_KEY = 'fodium_user_tickets_v1';

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(() => {
    const defaultEvent = MOCK_EVENTS[0];
    return {
      event: defaultEvent,
      ticketTier: defaultEvent.ticketTiers[0],
      quantity: 1,
      includeTransport: false,
      transportOption: defaultEvent.transportOptions[0],
    };
  });

  const [tickets, setTickets] = useState<UserTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TICKETS_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Clean empty state before purchase as specified by product specs
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TICKETS_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.warn('Could not save tickets to localStorage', e);
    }
  }, [tickets]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const clearTickets = () => {
    setTickets([]);
    localStorage.removeItem(LOCAL_STORAGE_TICKETS_KEY);
    showToast('Portefeuille de billets réinitialisé.');
  };

  const loadSampleTicket = () => {
    setTickets(MOCK_USER_TICKETS);
    showToast('Billet de démonstration chargé.');
  };

  const startBooking = (
    event: EventItem,
    tier?: TicketTier,
    includeTransport = false,
    transportOption?: TransportOption,
    quantity = 1
  ) => {
    const selectedTier = tier || event.ticketTiers[0];
    const chosenTransport =
      transportOption || (event.transportOptions.length > 0 ? event.transportOptions[0] : undefined);
    const safeQty = Math.max(1, Math.min(10, quantity));

    setBookingDraft({
      event,
      ticketTier: selectedTier,
      quantity: safeQty,
      includeTransport: includeTransport && event.transportAvailable,
      transportOption: chosenTransport,
    });
  };

  const setTicketTier = (tier: TicketTier) => {
    setBookingDraft((prev) => (prev ? { ...prev, ticketTier: tier } : null));
  };

  const setQuantity = (qty: number) => {
    const safeQty = Math.max(1, Math.min(10, qty));
    setBookingDraft((prev) => (prev ? { ...prev, quantity: safeQty } : null));
  };

  const setIncludeTransport = (include: boolean) => {
    setBookingDraft((prev) => {
      if (!prev) return null;
      const defaultOption = prev.transportOption || prev.event.transportOptions[0];
      return {
        ...prev,
        includeTransport: include,
        transportOption: include ? defaultOption : prev.transportOption,
      };
    });
  };

  const setTransportOption = (option: TransportOption) => {
    setBookingDraft((prev) => (prev ? { ...prev, transportOption: option } : null));
  };

  // Total derived dynamically!
  const derivedTotal = useMemo(() => {
    if (!bookingDraft) return 0;
    const ticketSubtotal = bookingDraft.ticketTier.price * bookingDraft.quantity;
    const transportSubtotal =
      bookingDraft.includeTransport && bookingDraft.transportOption
        ? bookingDraft.transportOption.price * bookingDraft.quantity
        : 0;
    return ticketSubtotal + transportSubtotal;
  }, [bookingDraft]);

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const completePurchase = (paymentMethod: PaymentMethodType): UserTicket => {
    if (!bookingDraft) {
      throw new Error('No active booking');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRef = `FOD-${randomSuffix}-${bookingDraft.event.city.substring(0, 3).toUpperCase()}`;

    const newTicket: UserTicket = {
      id: `tkt-${Date.now()}-${randomSuffix}`,
      bookingRef: newRef,
      eventId: bookingDraft.event.id,
      eventTitle: bookingDraft.event.title,
      eventDate: bookingDraft.event.date,
      eventDateLabel: bookingDraft.event.dateLabel,
      eventTime: bookingDraft.event.time,
      eventLocation: bookingDraft.event.location,
      eventCity: bookingDraft.event.city,
      eventImage: bookingDraft.event.image,
      ticketTierName: bookingDraft.ticketTier.name,
      quantity: bookingDraft.quantity,
      includeTransport: bookingDraft.includeTransport,
      transportPickup: bookingDraft.includeTransport ? bookingDraft.transportOption?.pickupPoint : undefined,
      transportDeparture: bookingDraft.includeTransport ? bookingDraft.transportOption?.departureTime : undefined,
      transportPrice: bookingDraft.includeTransport ? (bookingDraft.transportOption?.price || 0) : 0,
      ticketPrice: bookingDraft.ticketTier.price,
      totalPrice: derivedTotal,
      paymentMethod,
      purchasedAt: new Date().toISOString(),
      status: 'valid',
      qrCodeMock: `${newRef}-SECURED-KANZEY-PLATFORM`,
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  return (
    <BookingContext.Provider
      value={{
        events,
        bookingDraft,
        startBooking,
        setTicketTier,
        setQuantity,
        setIncludeTransport,
        setTransportOption,
        derivedTotal,
        tickets,
        completePurchase,
        formatPrice,
        toastMessage,
        showToast,
        clearTickets,
        loadSampleTicket,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
