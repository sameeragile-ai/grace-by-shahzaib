import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ScrollToTop } from './components/ScrollToTop';
import { useLenis } from './hooks/useLenis';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from './data/content';

const AppContent: React.FC = () => {
  useLenis();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF8F4] text-[#1C1420] selection:bg-[#E8A3B5]/30">
      {/* Film-grain texture overlay */}
      <div className="grain-overlay" />

      {/* Intro Preloader */}
      <Preloader />

      {/* Custom Luxury Cursor */}
      <CustomCursor />

      {/* Scroll to Top on Route Change */}
      <ScrollToTop />

      {/* Sticky Smart Frosted Navbar */}
      <Navbar />

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modals & Slide-out Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />

      {/* Persistent Floating WhatsApp Concierge Button */}
      <aside aria-label="Customer support" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${SITE_CONTENT.brand.whatsappNumber}?text=${encodeURIComponent(
            'Salam Grace by Shahzaib! I would like to inquire about your collections.'
          )}`}
          target="_blank"
          rel="noreferrer"
          data-magnetic
          aria-label="Direct WhatsApp Consultation"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1C1420] text-white shadow-xl hover:bg-emerald-700 transition-all duration-300"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-emerald-400 stroke-[1.5]" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
            WhatsApp Help
          </span>
        </a>
      </aside>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
