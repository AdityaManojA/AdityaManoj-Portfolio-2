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

export default function App() {
  const [activeTab, setActiveTab] = useState('Home'); 

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <Projects />;
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
        return <Hero />;
    }
  };

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {renderContent()}
      </main>

      {activeTab === 'Home' ? <DetailedFooter /> : <SimpleFooter />}
      
      <ScrollToTop />
    </div>
  );
}