import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Services from './components/Services';
import { DetailedFooter, SimpleFooter } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { HandbookModal } from './components/HandbookModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [handbookTab, setHandbookTab] = useState<'foundations' | 'deepdives'>('foundations');
  const [handbookQId, setHandbookQId] = useState<number | undefined>(undefined);

  const handleOpenHandbook = (tab: 'foundations' | 'deepdives' = 'foundations', qId?: number) => {
    setHandbookTab(tab);
    setHandbookQId(qId);
    setIsHandbookOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <Projects onOpenHandbook={() => handleOpenHandbook('foundations')} />;
      case 'Gallery':
        return <Gallery />;
      case 'Timeline':
        return <Timeline />;
      case 'Services':
        return <Services />;
      case 'Skills':
        return <Skills />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      case 'Home':
      default:
        return <Hero onOpenHandbook={() => handleOpenHandbook('foundations')} />;
    }
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHandbook={() => handleOpenHandbook('foundations')}
      />

      <main className="main-content">
        {renderContent()}
      </main>

      {activeTab === 'Home' ? <DetailedFooter /> : <SimpleFooter />}
      
      <ScrollToTop />

      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
        initialTab={handbookTab}
        initialQuestionId={handbookQId}
      />
    </div>
  );
}