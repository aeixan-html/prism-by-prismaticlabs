import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import MobileCta from '@/components/MobileCta';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen bg-bg">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <MobileCta />
      </div>
    </ErrorBoundary>
  );
}
