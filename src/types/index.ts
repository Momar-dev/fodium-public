export type EventCategory = 'musique' | 'tech' | 'gastronomie' | 'mode' | 'culture';

export interface TransportOption {
  id: string;
  pickupPoint: string;
  departureTime: string;
  returnTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  landmarks: string;
}

export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  remaining: number;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  city: string;
  venueDetails: string;
  image: string;
  description: string;
  fullDescription: string[];
  category: EventCategory;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  availableSeats: number;
  featured?: boolean;
  transportAvailable: boolean;
  ticketTiers: TicketTier[];
  transportOptions: TransportOption[];
  organizer: {
    name: string;
    verified: boolean;
  };
}

export type PaymentMethodType = 'wave' | 'orange_money' | 'card';

export interface BookingSelection {
  event: EventItem;
  ticketTier: TicketTier;
  quantity: number;
  includeTransport: boolean;
  transportOption?: TransportOption;
}

export interface UserTicket {
  id: string;
  bookingRef: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventDateLabel: string;
  eventTime: string;
  eventLocation: string;
  eventCity: string;
  eventImage: string;
  ticketTierName: string;
  quantity: number;
  includeTransport: boolean;
  transportPickup?: string;
  transportDeparture?: string;
  transportPrice: number;
  ticketPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethodType;
  purchasedAt: string;
  status: 'valid' | 'used' | 'cancelled';
  qrCodeMock: string;
}
