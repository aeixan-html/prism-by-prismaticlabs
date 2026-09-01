import Seo from '@/components/Seo';
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

export default function HomePage() {
  return (
    <>
      <Seo
        title="PRISM by PRISMATIC LABS | AI Business Companion"
        description="PRISM is an AI-powered business companion by PRISMATIC LABS for retail, combining AI, computer vision, voice, touch, NFC, and business intelligence."
        canonicalPath="/"
      />
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
    </>
  );
}
