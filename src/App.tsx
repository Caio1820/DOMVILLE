import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroActionCards } from './components/HeroActionCards';
import { MenuSection } from './components/MenuSection';
import { EventsSection } from './components/EventsSection';
import { EngagementLinks } from './components/EngagementLinks';
import { FooterDifferentials } from './components/FooterDifferentials';
import { ReservationModal } from './components/ReservationModal';
import { FloatingActionDock } from './components/FloatingActionDock';

export default function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedEventDay, setSelectedEventDay] = useState<string>('Sábado');

  const handleOpenReservation = (day?: string) => {
    if (day) {
      setSelectedEventDay(day);
    }
    setIsReservationModalOpen(true);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToEvents = () => {
    const el = document.getElementById('programacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col items-center selection:bg-amber-500/30 selection:text-amber-200">
      {/* Subtle ambient lighting effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-96 bg-gradient-to-b from-amber-600/10 via-rose-600/5 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-80 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none -z-10 blur-2xl" />

      {/* Main Container */}
      <main className="w-full max-w-md sm:max-w-lg flex flex-col items-center">
        {/* Header with Official Logo & Social shortcuts */}
        <Header
          onOpenReservation={() => handleOpenReservation()}
          onOpenMenu={handleScrollToMenu}
        />

        {/* Primary Call to Action Hero Cards */}
        <HeroActionCards
          onOpenReservationModal={() => handleOpenReservation()}
          onScrollToMenu={handleScrollToMenu}
          onScrollToEvents={handleScrollToEvents}
        />

        {/* Weekly Line-up Schedule */}
        <EventsSection onSelectEvent={(day) => handleOpenReservation(day)} />

        {/* Modernized Interactive Digital Menu (Flagship feature) */}
        <MenuSection />

        {/* Secondary Engagement: Instagram, Google Maps, Birthday VIP */}
        <EngagementLinks />

        {/* Differentials & Establishment Details */}
        <FooterDifferentials />
      </main>

      {/* Sticky Bottom Thumb-Friendly Dock */}
      <FloatingActionDock
        onOpenReservation={() => handleOpenReservation()}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Interactive Reservation Customizer Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        preselectedDay={selectedEventDay}
      />
    </div>
  );
}
