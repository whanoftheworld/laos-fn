import { Route, Routes } from 'react-router-dom';

import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { AgeGateModal } from '@/components/legal/AgeGateModal';
import { CookieBanner } from '@/components/legal/CookieBanner';

import { Home } from '@/pages/Home';
import { Live } from '@/pages/Live';
import { Results } from '@/pages/Results';
import { News } from '@/pages/News';
import { NewsDetail } from '@/pages/NewsDetail';
import { Check } from '@/pages/Check';
import { Stats } from '@/pages/Stats';
import { Schedule } from '@/pages/Schedule';
import { About } from '@/pages/About';
import { Legal } from '@/pages/Legal';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 pb-24 lg:pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/live/:drawType/:date" element={<Live />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:drawType" element={<Results />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/check" element={<Check />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<About />} />
          <Route path="/legal/:topic" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
      <AgeGateModal />
      <CookieBanner />
    </div>
  );
}
