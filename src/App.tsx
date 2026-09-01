import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import MeetPrism from '@/components/MeetPrism';
import Problem from '@/components/Problem';
import FourWs from '@/components/FourWs';
import HowPrismWorks from '@/components/HowPrismWorks';
import SystemArchitecture from '@/components/SystemArchitecture';
import Membership from '@/components/Membership';
import ProductCatalogue from '@/components/ProductCatalogue';
import ChatInterface from '@/components/ChatInterface';
import Impact from '@/components/Impact';
import WhyPrism from '@/components/WhyPrism';
import Development from '@/components/Development';
import FinalSection from '@/components/FinalSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navigation />
      <main>
        <Hero />
        <MeetPrism />
        <Problem />
        <FourWs />
        <HowPrismWorks />
        <SystemArchitecture />
        <Membership />
        <ProductCatalogue />
        <ChatInterface />
        <Impact />
        <WhyPrism />
        <Development />
        <FinalSection />
      </main>
      <Footer />
    </div>
  );
}
