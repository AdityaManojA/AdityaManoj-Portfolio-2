import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import { DetailedFooter, SimpleFooter } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home'); 

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <Projects />;
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