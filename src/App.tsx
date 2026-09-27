/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Transport } from './pages/Transport';
import { Tickets } from './pages/Tickets';
import { Profile } from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
